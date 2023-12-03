import { View, Text , StyleSheet, ToastAndroid, Dimensions, Image} from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { BookContext } from '../../navigation/BooksProvider';
import ReactNativeBlobUtil from 'react-native-blob-util' 
import * as Progress from 'react-native-progress';
import downloadAnimatedIcon from '../../../assets/images/download.gif'

const { height, width } = Dimensions.get('window');

const DownloadTask = ({task}) => {

    const [downloadProgress, setDownloadProgress] = useState(0)
    const [totalBytes, setTotalBytes] = useState(0)
    const [receivedBytes, setReceivedBytes] = useState(0)
    const {downloadDirectory, scanDownloadFolder, taskList, setTaskList} = useContext(BookContext);
    const [complete, setComplete] = useState([])
    const downLoadConfig = ReactNativeBlobUtil.config({
        fileCache: true,
        path: downloadDirectory +`/${task.title}.pdf`, //set download directory and book title.pdf as a filename
    })

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

    const Downloading = ({progress}) =>{ // progress bar component
        return(
          <Progress.Bar progress={progress} width={width *.79} height={1} borderRadius={0} color='#227C70'/>
        )
    }

    useEffect(() => {
        downLoadConfig
        .fetch('GET', task.filelink) // start http request from book url
        .progress((received, total) => { // return a progress data but in string
            setReceivedBytes(handleConvert(received))
            setTotalBytes(handleConvert(total))
            let progress = parseFloat((received/total))
            setDownloadProgress(progress) // get progress data and conver to float or                                                    // number data type value is from 0 to 1, e.g, 0.2, 0.34, 0.9 ...
        })
        .then((res) => {
          ToastAndroid.showWithGravity( 
            `"${task.title}" download Complete`, // pop up a message if http request is completed
            ToastAndroid.LONG,
            ToastAndroid.TOP)
            setDownloadProgress(1)
            setComplete([...complete, task.title])
            setTaskList((prevTaskList) => prevTaskList.filter((element) => element.title !== task.title))
            scanDownloadFolder()
        })
        .catch((errorMessage, statusCode) => {
          ToastAndroid.showWithGravity(
            `Network Failed`, // pop up a message on top
             ToastAndroid.SHORT,
             ToastAndroid.TOP)
        })
        if (taskList.length === 0) {
            setComplete([]);
          }
    },[])

  return (
    <View style={styles.container}>
        <View style={styles.icon}>
            <Image source={downloadAnimatedIcon} style={{height: 55, width: 55}}/>
        </View>
        <View style={styles.info}>
            <Text style={styles.title}>{task.title}</Text>
            <View style={styles.progress}> 
                <View><Text style={styles.bytes}>{receivedBytes}/{totalBytes}</Text></View>
                <View><Text style={styles.percent}>{(downloadProgress*100).toFixed(1)}%</Text></View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Downloading progress={downloadProgress} />
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 3,
        elevation: 2,
        borderRadius: 4,
        overflow: 'hidden'
    },
    icon:{
        flex: 1,
    },
    info:{
        paddingHorizontal: 5,
        paddingVertical: 5,
        flex: 6,
        justifyContent: 'center',
    },
    progress:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
    },
    title:{
        fontSize: 12,
        color: 'black',
        fontWeight: 700,
        marginBottom: 5,
    },
    bytes:{
        fontSize: 10,
        fontStyle: 'italic'
    },
    percent:{
        fontSize: 10,
        fontStyle: 'italic'
    }
})

export default DownloadTask