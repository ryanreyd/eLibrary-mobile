import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    Pressable,
    Image, 
    TouchableOpacity, 
    ToastAndroid,
    ScrollView
  } from 'react-native'
import React, { useEffect, useState, useContext} from 'react'
import { BookContext } from '../../navigation/BooksProvider' //provides book data from firebase
import Pdf from 'react-native-pdf'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Progress from 'react-native-progress';
import ListFooter from '../../components/ListFooter/ListFooter'
import ListEmpty from '../../components/ListEmpty/ListEmpty'
import {useIsFocused} from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util' //library to handle file system. Use in downloading pdf to directory folder
import DownloadTask from '../../components/DownloadTask/DownloadTask'
import clipboardIcon from '../../../assets/images/clipboard.png'

const { height, width } = Dimensions.get('window');

const DownloadScreen = ({navigation}) => {
/*   const [downloadFile, seDownloadFile] = useState([])
  const downloadDirectory = ReactNativeBlobUtil.fs.dirs.DownloadDir //located at //storage/emulated/0/Android/data/com.elibrary/files/Download/ */
  const {
    downloadBook,
    pdfFiles,
    scanDownloadFolder,
    downloadBookTittle,
    taskList
    } = useContext(BookContext);

  const isFocused = useIsFocused();
  

  useEffect(() => {
    const subscribe = navigation.addListener('blur', () => {
      scanDownloadFolder()
    });
  }, [navigation]);

  // Convert bytes to kilobytes
  const bytesToKB = (bytes) => {
    return bytes / 1024;
  }
  // Convert bytes to megabytes
  const bytesToMB = (bytes) => {
    return bytesToKB(bytes) / 1024;
  }
  //conditional return value
  const handleConvert = (size) =>{
    const sizeF = parseFloat(size)
    sizeF
    if(sizeF/1024 > 1024){
      return bytesToMB(sizeF).toFixed(2)+' mb';
    }else{
      return bytesToKB(sizeF).toFixed(2)+' kb';
    }
  }

  const NoDownloadTask = () =>{
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', opacity: .5, padding: 10}}>
        <Image source={clipboardIcon}  style={{height: 70, width:70, marginBottom: 10,}} />
        <Text>No download tasks</Text>
      </View>
    )
  }

  const Thumbnail = ({book}) =>{
    return(
      <Pdf
        trustAllCerts={false}
        source={{ uri: `${book.path}`, cache:true }} //render pdf thumbnail from download folder
        singlePage={true} 
        scale={1.2}
        onLoadComplete={() => {
   
        }}
        onError={(error) => {
            console.log(error);
        }}
        style={{flex:1, width: '100%', height: '100%',backgroundColor:'white'}}
     />
    ) 
  }

  const onReadNowPress = (item) => {
    let pdfLink = item.path
    navigation.navigate('PDFReader', {pdfLink}); //open the link to pdf reader screen
  } 

  const handleDelete = (item) =>{
    ReactNativeBlobUtil.fs.unlink(item.path) //delete download
    .then(() => { 
        scanDownloadFolder()
        ToastAndroid.showWithGravity(
        `"${item.filename}" is deleted`, // pop up a message on top
         ToastAndroid.SHORT,
         ToastAndroid.TOP)
     })
    .catch((err) => { console.log(err)})
  }

  const DownloadList = ({book}) =>{
    return(
      <Pressable 
       onPress={onReadNowPress.bind(this, book)}
        android_ripple={{ color: '#333',radius: 150, borderless: false, foreground: true }}
        style={styles.bookContainer}
      >
        <View style={styles.cover}>
          <Thumbnail book={book}/> 
        </View> 
        <View style={styles.content}>
          <View style={styles.details}> 
            <Text numberOfLines={1} style={styles.filename}>
              {book.filename.slice(0, -4)}
            </Text>
            <View style={styles.sizeCont}>
              <Text style={styles.size}>
                {handleConvert(book.size)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleDelete.bind(this, book)} style={styles.icon}>
            <Icon
              name='delete'
              size={22}
              color='gray'
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    )
  }
  const footer = () => {
    return(
      <View style={styles.footer}>
        <Text>
          Opps you've reach the bottom of the list!
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Download Management</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 5,}}>
        <View style={styles.inProgress}>
          <Text style={{fontSize: 12}}>IN PROGRESS ({taskList.length})</Text>
          <FlatList
            scrollEnabled={false}
            data={taskList} // get already dowloaded pdf
            ListEmptyComponent={NoDownloadTask}
            renderItem={({item})=>(
              <DownloadTask task={item}/>
            )}
          />
        </View>
        
        <View style={styles.downloaded}>
          <Text style={{color: 'black', fontSize: 12}}>Finished downloads ({pdfFiles.length})</Text>
          <FlatList
            scrollEnabled={false}
            data={pdfFiles} // get already dowloaded pdf
            numColumns={3}emptyList
            ListEmptyComponent={ListEmpty}
            ListFooterComponent={pdfFiles.length > 0 ? ListFooter : <></>}
            renderItem={({item})=>(
              <DownloadList book={item}/>
            )}
          />
        </View>
      </ScrollView>
      
    </View>
  
  )
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: 'white'
  },
  inProgress:{
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    marginBottom: 5,
  },
  downloaded:{
    padding: 5,
    backgroundColor: 'white'
  },
  bookContainer:{
    flex: 1,
   // flexDirection: 'row',
    margin: 2,
    elevation: 2,
    height: 180,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    maxWidth: width * .315,
},
cover:{
    alignItems: 'center',
    flex: 8,
    width: "100%",
    backgroundColor: 'white',
    justifyContent: 'center',
}, 
content:{
    flex: 2, 
    flexDirection: 'row',
    padding: 5,
},
filename:{
  fontSize: 10,
  fontWeight: '500',
  color: '#394B44',
},
size:{
  fontSize: 9,
  fontWeight: '200',
  color: 'white',
},
sizeCont:{
  maxWidth: 55,
  display: 'flex',
  alignItems: 'center',
  justifyContent:'center',
  backgroundColor: '#8AA07F',
  borderRadius: 3,
  paddingVertical: 2,
  marginTop: 2,
},
details:{
  flex: 6,
  justifyContent: 'space-between',
},
icon:{
  flex:2,
  height: '100%',
  flexDirection:'column-reverse',
  marginTop: 2,
  alignItems: 'flex-end',
},
emptyState:{
 
},

header:{
  paddingHorizontal: 30,
  paddingVertical: 5,
  display: 'flex',
  alignItems:'center',
  backgroundColor: '#14C38E'
},
headerText:{
  fontSize: 16,
  fontWeight: 'bold',
  paddingVertical: 10,
  color: 'white'
}
})

export default DownloadScreen