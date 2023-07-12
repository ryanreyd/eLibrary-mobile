import { View, Text, ScrollView, StyleSheet, FlatList,} from 'react-native'
import React, { useContext, useEffect, useState,  useRef  } from 'react'
import { BookContext } from '../../navigation/BooksProvider'
import Card from '../../components/Card/Card';
import SelectCategory from '../../components/SelectCategory/SelectCategory';
import ListFooter from '../../components/ListFooter/ListFooter';
import NoInternetConnection from '../../components/NoInternetConnection/NoInternetConnection';

const LocationScreen = ({navigation}) => {
  const location = [
      {name:'Main library', emoji:'📓'},
      {name:'Law library', emoji:'⚖️'},
      {name:'Graduate library', emoji:'🎓'},
      {name:'Elemantary library', emoji:'🏀'},
    /*   'Law Library',
      'Graduate Library',
      'Elemantary SL Library', */
    ]

    const {bookData, downloadBook, getBooks, isConnected} = useContext(BookContext); // access book data from context
    const selectedLibrary = []
    const [libraryLocation, setlibraryLocation] = useState([])
    const [selectedList, setSelectedList] = useState('3')
    const [focusedButton, setFocusedButton] = useState('Main library')

    const onSelectLocationPress = (selected) =>{
      switch (selected) {         //switch selected category to browse books
          case 'Elemantary library':
              setSelectedList('1')
              setFocusedButton('Elemantary library')
              break;
          case 'Law library':
              setSelectedList('2')
              setFocusedButton('Law library')
              break;
          case 'Main library':
              setSelectedList('3')
              setFocusedButton('Main library')
              break;
          case  'Graduate library':
              setSelectedList('4')
              setFocusedButton('Graduate library')
              break;
      
          default:
              setSelectedList('3')
              setFocusedButton('Main library')
              break;
      }
    }     
    useEffect(() =>{
      getBooks();
      bookData.forEach(item => { //fiter book data
        if(item.location_id === selectedList){ // to only display books from 'location'
          selectedLibrary.push(item)
          setlibraryLocation(selectedLibrary);
        }
      });

    }, [selectedList,Card,SelectCategory]) // this will run if there is a changes on 
                                            //selectedList, Card, SelectCategory
  const onReadNowPress = (item) => {
      let pdfLink = item.filelink
      navigation.navigate('PDFReader', {pdfLink}); // when read is press it open the pdf reader with url
  } 
  const onDonwloadPressed = (item) =>{
    downloadBook(item)      // download this book
  }
 
  return (
    <View style={styles.wrapper}> 
       {isConnected ? <></> : <NoInternetConnection showModal={true}/>}
        <SelectCategory 
          buttonPressed={onSelectLocationPress}
          buttonsArray={location}  //pass this location choices and display as button with emoji
          focused={focusedButton} // check if button is focus
        />
        <View style={styles.root}>
          <FlatList
            data={libraryLocation} // display on books that is in location
            contentContainerStyle={{padding: 10}}
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            ListFooterComponent={ListFooter}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item})=>( 
              <Card                 //render books and book details, thumbnails, title, author, etc
                readNowPressed={onReadNowPress}
                downloadPressed={onDonwloadPressed} //bind item to button
                book={item}
              />
            )}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'white'
  },
  flatList:{
      width: "100%",
      height: '100%' 
  },
  wrapper:{
    borderColor: "white"
  }
})


export default LocationScreen