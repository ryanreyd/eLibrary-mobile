import { View, Text, ScrollView, StyleSheet, FlatList,} from 'react-native'
import React, { useContext, useEffect, useState,  useRef  } from 'react'
import { BookContext } from '../../navigation/BooksProvider'
import Card from '../../components/Card/Card';
import SelectCategory from '../../components/SelectCategory/SelectCategory';
import ListFooter from '../../components/ListFooter/ListFooter';

const SubjectScreen = ({navigation}) => {
  // define subject sub category and emoji
  const subject = [
    {name:'Science',emoji:'🔬'},
    {name:'Filipino',emoji:'🇵🇭'},
    {name:'Mathematics',emoji:'🤓'},
    {name:'Social Science',emoji:'🎭'},
    {name:'Biology',emoji:'🧬'},
    {name:'Technology',emoji:'🔥'},
    {name:'English Literature',emoji:'✍️'},
    {name:'History',emoji:'⏳'},
    {name:'Education',emoji:'📒'},
    {name:'Sociology',emoji:'🏖️'},
    {name:'Environmental Science',emoji:'🌿'},
  ]

  const {bookData, downloadBook} = useContext(BookContext);
  const selectedLibrary = []
  const [libraryLocation, setlibraryLocation] = useState([])
  const [selectedList, setSelectedList] = useState('3') //default value
  const [focusedButton, setFocusedButton] = useState('Mathematics')
  const onSelectLocationPress = (selected) =>{
    //  console.log(typeof selected)
      switch (selected) {    //the choices
          case 'Science':
              setSelectedList('1')
              setFocusedButton('Science')
              break;
          case 'Filipino':
              setSelectedList('2')
              setFocusedButton('Filipino')
              break;
          case 'Mathematics':
              setSelectedList('3')
              setFocusedButton('Mathematics')
              break;
          case 'Social Science':
              setSelectedList('4')
              setFocusedButton('Social Science')
              break;
          case 'Biology':
              setSelectedList('5')
              setFocusedButton('Biology')
              break;
          case 'Technology':
              setSelectedList('6')
              setFocusedButton('Technology')
              break;
          case 'English Literature':
              setSelectedList('7')
              setFocusedButton('English Literature')
              break;
          case 'History':
              setSelectedList('8')
              setFocusedButton('History')
              break;
          case 'Environmental Science':
              setSelectedList('9')
              setFocusedButton('Environmental Science')
              break;
          case 'Education':
              setSelectedList('10')
              setFocusedButton('Education')
              break;
          case 'Sociology':
              setSelectedList('11')
              setFocusedButton('Sociology')
              break;
  
          default:
              setSelectedList('3')
              setFocusedButton('Mathematics')
              break;
      }
    }

    useEffect(() =>{
      bookData.forEach(item => { // only display books from selected subject
        if(item.subject_id === selectedList){
          selectedLibrary.push(item)
          setlibraryLocation(selectedLibrary);
        }
      });
    }, [selectedList])

  const onReadNowPress = (item) => {
    let pdfLink = item.filelink
    navigation.navigate('PDFReader', {pdfLink}); //read books 
  } 
  const onDonwloadPressed = (item) =>{
    downloadBook(item)      
  }
 
  return (
    <> 
 <SelectCategory buttonPressed={onSelectLocationPress} buttonsArray={subject} focused={focusedButton}/>
        <View style={styles.root}>
          <FlatList
              data={libraryLocation}
              ListFooterComponentStyle={{paddingBottom: 20}}
              contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20}}
              showsVerticalScrollIndicator={false}
              style={styles.flatList}
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

export default SubjectScreen