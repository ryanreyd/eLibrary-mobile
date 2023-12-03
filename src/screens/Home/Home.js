import { View, Text, StyleSheet, FlatList, StatusBar,ToastAndroid,Image, Dimensions} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../../navigation/BooksProvider' //provides book data from firebase
import Card from '../../components/Card/Card'; //card ui component to display book and its details
import Search from '../../components/Search/Search'; //search ui component
import ListFooter from '../../components/ListFooter/ListFooter';
import NoInternetConnection from '../../components/NoInternetConnection/NoInternetConnection';
import Loader from '../../components/Loader/Loader';


const Home = ({navigation}) => {

    const {bookData, downloadBook, isConnected} = useContext(BookContext);  // stores all books data in .json(object) format from database
    const [searchValue, setSearchValue]= useState('') //stores search input
    const bookArray =[] // stores converted books data to array from .json
    const [searchResult, setSearchResult] = useState([]) //stores books to display either from search result or all the books

    const { height, width } = Dimensions.get('window');

    const handleSearchValueChange = (value) =>{
      setSearchValue(value)
    } 

    useEffect(()=>{
      bookData.forEach(book => { 
        bookArray.push(book)  //convert object or json to array
      })
      const pattern = new RegExp(`^.*${searchValue}.*$`, 'i'); //search logic
        const match = bookArray.filter(match=>{ //returns the new filtered array of books or search result
        return (
          pattern.test(match.title.toLowerCase()) ||
          pattern.test(match.author.toLowerCase()) ||
          pattern.test(match.date_publish.toLowerCase())
        )
      })
      setSearchResult(match) // set list to display search result
    },[searchValue, Search])

    const onReadNowPress = (item) => {
      let pdfLink = item.filelink
      navigation.navigate('PDFReader', {pdfLink}); //open the link to pdf reader screen
    } 

    const onDonwloadPressed = (item) =>{
      downloadBook(item)      
    }
    const LoadingBooks = () =>{
        return(
            <View style={{height: height * 0.7, alignItems: 'center', justifyContent: 'center'}}>
              <Loader message={'Loading Books'} />
            </View>
        )
    }
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor='#14C38E' barStyle={'light-content'}/>
      <Search value={searchValue} onChange={handleSearchValueChange} />
      <Text
        style={[
          styles.result,
          {fontSize: searchValue.length > 0 ? 12 : 0,
            paddingVertical: searchValue.length > 0 ? 3 : 0}
        ]}
      >
        found {searchResult.length} result(s)
      </Text>
      {isConnected ? <></> : <NoInternetConnection showModal={true}/>}
      <FlatList
        data={searchResult.length > 0 ? searchResult : bookData} //data to renders
        contentContainerStyle={{padding: 10}}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        ListFooterComponent={ListFooter} 
        ListEmptyComponent={LoadingBooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item})=>( //renders book data in a form of card
          <Card
            readNowPressed={onReadNowPress} //function call
            downloadPressed={onDonwloadPressed} //function call
            book={item} // pass data to display on screen
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root:{
    alignItems: 'center',
    backgroundColor: 'white'
  },
  flatList:{
      width: "100%",
      height: '100%',
  },
  wrapper:{
    borderColor: "white"
  },
  result:{
    color: '#14C38E'
  }
})


export default Home