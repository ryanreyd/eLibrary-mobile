import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DownloadButton from '../DownloadButton/DownloadButton'
import CustomButton from '../CustomButton/CustomButton'
import Pdf from 'react-native-pdf'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

//renders book details e.g. thumbnail, title, author and etc.
//also accepts onPress button event and display button
const Card = ({book, readNowPressed, downloadPressed}) => {
    const headers = {
        Range: 'bytes=0-99999',
        'Content-Length': '1048576'
    };
  return (
    <Animatable.View 
        style={styles.bookContainer}
        animation="bounceInLeft"
        duration={600} delay={book.id *100}>
    <View style={styles.cover}>
        <Pdf
            trustAllCerts={false}
            headers={headers}
            source={{ uri: `${book.filelink}#page=1`, cache:true }}
            singlePage={true} 
            page={0}
            cacheFileName={book.title}
            renderActivityIndicator = {(progress) =>{
               return (<Progress.Bar progress={progress} width={70} color='#00DE95'/>)
            }}
            scale={1.1}
            onError={(error) => {
                console.log(error);
            }}
            style={{
                flex:1,
                width: '100%',
                height: '100%',
                backgroundColor:'white',
                borderRadius: 5, 
                elevation:1
            }}
         />
    </View> 
    <View style={styles.content}>
        <View style={styles.bookDetail}>
            <Text numberOfLines={2} style={styles.title}>
                {book.title}
            </Text>
            <Text numberOfLines={1}  style={styles.author}>
                {book.author}
            </Text>
            <Text style={styles.year}>
                {book.date_publish?.slice(0, 4)}
            </Text>
            <Text style={styles.year}>
                {book.page_num} pages
            </Text>
            <View style={[
                    styles.statusContainer,
                    {backgroundColor: book.permission_id === '1' ? '#12935B' : '#C2D1CF'}
                ]}>
                <Text style={styles.bookStatus}> Downloadable </Text>
            </View>
        </View>
        <View style={styles.buttons}>
            <View style={styles.readNow}>
                <CustomButton
                    text="Read now" onPress={readNowPressed.bind(this, book)}
                    type='SECONDARY'
                />
            </View>
            <View style={styles.download}>
                <DownloadButton
                    disabled={book.permission_id === '2' ? true : false} 
                    onPress={downloadPressed.bind(this, book)}
                 />
            </View>
        </View>
    </View>
</Animatable.View>
  )
}

const styles = StyleSheet.create({
    bookContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        elevation: 2,
        shadowOffset: {width: 0, height: 0},
        shadowColor: '282D25',
        backgroundColor: 'white',
        height: 147,
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#FAF8F1',
    },
    cover:{
        flex: 1,
        height: "100%",
        justifyContent: 'center',
        padding:5,
    }, 
    content:{
        flex: 2, 
        paddingHorizontal: 5,
        flexDirection: 'column', 
    },
    bookDetail:{
        flex :6,
    },
    title:{
        fontSize: 14,
        fontWeight: 900,
    },
    author:{
        fontSize: 12,
        fontStyle: 'italic',
    },
    year:{
        fontSize: 10,
    },
    buttons:{
        flex: 2,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between'
    },
    readNow:{
        flex: 3,
    },
    download:{
        flex : 1,
        marginLeft: 5,
    },
    bookStatus:{
        fontSize: 10,
        color: 'white'
    },
    statusContainer:{
        minwidth: 80,
        maxWidth: 82,
        height: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginVertical: 5,
    }
})

export default Card