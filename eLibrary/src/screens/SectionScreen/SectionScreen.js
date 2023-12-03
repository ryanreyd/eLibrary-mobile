import { View, Text, StyleSheet, FlatList, Modal, Alert} from 'react-native'
import React,{useContext, useState, useEffect} from 'react'
import { BookContext } from '../../navigation/BooksProvider'
import Card from '../../components/Card/Card'
import SelectCategory from '../../components/SelectCategory/SelectCategory'
import ListFooter from '../../components/ListFooter/ListFooter'

// same behavior as location screen
// browse books in Section category
const SectionScreen = ({navigation}) => {
  //set section sub category
  // define button name and emoji
  const section = [
    {name:'Filipiniana',emoji:'📜'},
    {name:'General Circulation',emoji:'♻'},
    {name:'References',emoji:'📖'},
    {name:'Reserve',emoji:'⏰'},
    {name:'Periodaicals',emoji:'🗞️'},
  ]

  
  const {bookData, downloadBook} = useContext(BookContext);
  const selectedLibrary = []
  const [libraryLocation, setlibraryLocation] = useState([])
  const [selectedList, setSelectedList] = useState('1') //default value
  const [focusedButton, setFocusedButton] = useState('Filipiniana')
  const onSelectLocationPress = (selected) =>{
    //  console.log(typeof selected)
      switch (selected) { //choices
          case 'Filipiniana':
              setSelectedList('1')
              setFocusedButton('Filipiniana')
              break;
          case 'General Circulation':
              setSelectedList('2')
              setFocusedButton('General Circulation')
              break;
          case 'References':
              setSelectedList('3')
              setFocusedButton('References')
              break;
          case 'Reserve':
              setSelectedList('4')
              setFocusedButton('Reserve')
              break;
          case 'Periodaicals':
              setSelectedList('5')
              setFocusedButton('Periodaicals')
              break;
          default:
              setSelectedList('1')
              setFocusedButton('Filipiniana')
              break;
      }
    }

    useEffect(() =>{
      bookData.forEach(item => {
        if(item.section_id === selectedList){ //filter only books in location
          selectedLibrary.push(item)
          setlibraryLocation(selectedLibrary);
        }
      });
    }, [selectedList, FlatList])

  const onReadNowPress = (item) => {
    let pdfLink = item.filelink
    navigation.navigate('PDFReader', {pdfLink}); // open pdf reader
  } 
  const onDonwloadPressed = (item) =>{
    downloadBook(item)      
  }
  return (
    <> 
  <SelectCategory buttonPressed={onSelectLocationPress} buttonsArray={section} focused={focusedButton}/>
        <View style={styles.root}>
          <FlatList
              data={libraryLocation}
              contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
              showsVerticalScrollIndicator={false}
              style={styles.flatList}
              ListFooterComponentStyle={{paddingBottom: 20}}
              ListFooterComponent={ListFooter}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item})=>(
                <Card
                    readNowPressed={onReadNowPress}
                    downloadPressed={onDonwloadPressed}
                    book={item}
                />
              )}
          />
      </View>
    </>
  )
}



const styles =StyleSheet.create({
  root:{
      alignItems: 'center',
      paddingHorizontal: 5,
      backgroundColor: 'white',
  },
  flatList:{
      width: "100%",
      height: '100%'
  },
  footer:{
    marginTop: 10,
    paddingBottom: 200,
    alignItems: 'center',
  }
})

export default SectionScreen