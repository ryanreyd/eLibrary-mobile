import React, { createContext, useState, useEffect } from 'react';
import  auth,{ firebase } from '@react-native-firebase/auth';
import '@react-native-firebase/database';
import '@react-native-firebase/storage';
import ReactNativeBlobUtil from 'react-native-blob-util' //library to handle file system. Use in downloading pdf to directory folder
import {ToastAndroid} from 'react-native'
import NetInfo from '@react-native-community/netinfo';

export const BookContext = createContext(); 

// A context the define method to get books from firebase database
// all children wrap with <BookProvider> can access this method
// including state variables and data
export const BookProvider = ({ children }) => {
  const db = firebase.database(); //firebase Database
  const bookRef = db.ref('collections'); //database reference
  const [bookData, setBookData] = useState([]); //stores array of books data
  const [pdfFiles, setPdfFiles] =  useState([])
  const [downloadBookTittle, setDownloadBookTittle] = useState('')
  const downloadDirectory = ReactNativeBlobUtil.fs.dirs.DownloadDir //local file storage
  const [isConnected, setIsConnected] = useState(true);
  const [taskList, setTaskList] = useState([])


 // const [bookToDownload, setBookToDownload] = useState([])

  const getBooks = () => {   //get book data from firebase database
    bookRef.once('value', (snapshot) => {
      try {
    /*     const data =  snapshot.val();
        const collectionsArray = Object.values(data); //returns array
        setBookData(collectionsArray); */
        const collectionsArray = []
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key; // Get the key of the child snapshot
          const data = childSnapshot.val(); // Get the data of the child snapshot
  
          // Push an object containing the key and data into the collectionsArray
          if(data.collection_status != '2'){
            collectionsArray.push({ key, ...data });
          }
        });
  
        setBookData(collectionsArray);
      } catch (error) {
        console.log(error);
      }
    });
  };

//scan download directory folder
  const scanDownloadFolder = async () =>{
   await ReactNativeBlobUtil.fs.lstat(downloadDirectory)
    .then((fileInfo) => {
      setPdfFiles(fileInfo)
    }) 
  }
 
  useEffect(() => {
    getBooks();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  //  scanDownloadFolder()
  },[]);

//check already exist download file
const checkAlreadyExistFile = (item) => { 
  return pdfFiles.some((file) => file.filename === item.title+'.pdf')
}
  //download button function
const handleTaskList = (item) =>{
  setTaskList([...taskList, item])
}
const downloadLogRef = db.ref('student_download_collection'); //database reference
const date = new Date();
const options = {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};
const formattedDate = date.toLocaleDateString('en-US', options);

const uploadDownloadLog = (task) =>{
    const newDataRef = downloadLogRef.push();
    newDataRef.set({
        collection_id: task.key,
        created_at: formattedDate,
        key_for_download:task.key,
        student_id: auth().currentUser,
        updated_at: ""
    });
}
const downloadBook =(item) =>{ 
  //download configuration
/*   const downLoadConfig = ReactNativeBlobUtil.config({
    fileCache: true,
    path: downloadDirectory +`/${item.title}.pdf`, //set download directory and book title.pdf as a filename
  }) */
  scanDownloadFolder() // scan 
  checkAlreadyExistFile(item) //comfirm if exist
  const exist = checkAlreadyExistFile(item)
  if( !exist ){       // proceed to download if file don't exist
    setDownloadBookTittle(item.title) //get book title
    
    handleTaskList(item)
  //  uploadDownloadLog(item)
    ToastAndroid.showWithGravity(
      `"${item.title}" is downloading`, // pop up a message on top
       ToastAndroid.SHORT,
       ToastAndroid.TOP)
  }else{
    ToastAndroid.showWithGravity( 
     `This Book already exist`, // pop a message if book alread exist
      ToastAndroid.SHORT,
      ToastAndroid.TOP)
  }  
}

  return (
    <BookContext.Provider 
      value={{
        bookData, // pass book data e.g author, title, filelink and etc.
        downloadBook, // pass download method to trigger by onPress event.
        pdfFiles, // pass already download books
        scanDownloadFolder, // pass this method to scan and refresh the list 
        downloadBookTittle, // this value is use in download to only the downloading 
                           // book has a progress bar
        getBooks,  
        isConnected,            // so it needs to set to 1 when download is complete
        taskList,
        setTaskList,
        downloadDirectory,
      }}>
      {children}
    </BookContext.Provider>
  );
};
