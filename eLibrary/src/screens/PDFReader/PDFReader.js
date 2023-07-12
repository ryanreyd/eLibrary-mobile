import { View, Text , StyleSheet, Dimensions, TouchableOpacity, StatusBar, ToastAndroid} from 'react-native'
import React, { useState , useRef} from 'react'
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

//this is the main pdf reader
// can read from downloade books
// and read directly without download
// scroll horizontal or vertical
const PDFReader = ({navigation,route}) => {
    const [page, setPage] =useState('loading pages...');
    const [pages, setPages] =useState();
    const [horizontalScroll, setHorizontalScroll] = useState(false)
    const [horizontalScrollOn, setHorizontalScrollOn] = useState(false)
    const [hide, setHide] = useState(false)
    const viewRef = useRef(null)
    const pdfView = useRef(1)
   
    const PageIndicator = () =>{ //display pages
        return (
            <TouchableOpacity style={[styles.pageNumberContainer, { opacity: hide ? 0 : 1}]}>
                <Icon
                    name="dots-grid"
                    size={14}
                    color='#041C12'
                />
                <Text style={styles.pageNumber}>{page}{pages}</Text> 
            </TouchableOpacity>  
        )
    }
    const handleGoBack =()=>{ // goback or exit reader 
        navigation.goBack()
    }
    const BackButton = () =>{ // back button component
        return (
            <TouchableOpacity 
            onPress={handleGoBack}
            style={[styles.back, { opacity: hide ? 0 : 1}]}>
                <View style={styles.iconBack}>
                    <Icon
                        name="keyboard-backspace"
                        size={14}
                        color='white'
                    />
                </View>
                <Text style={styles.backText}>Exit</Text>
            </TouchableOpacity>  
        )
    }
    //set horizontal scroll
    const handleHorizontal = () =>{
        setHorizontalScroll(true)//horizontal scroll
        setHorizontalScrollOn(true) // toggle horizntal switch
        ToastAndroid.show('Scroll Mode : Horizontal', ToastAndroid.SHORT)
    }
    // ser vertical scroll
    const handleVertical = () =>{
        setHorizontalScroll(false) //vertical scroll
        setHorizontalScrollOn(false) // toggle vertical switch
        ToastAndroid.show('Scroll Mode : Vertical', ToastAndroid.SHORT)
    }

    const handleHide = () =>{ 
        if(!hide){
            setHide(true) //hide buttons
            
        }else{
            setHide(false)
            
        }
        
    }
    //floating horizontal button component
    const ScrollModeHorizontal = () =>{
        return (
            <TouchableOpacity onPress={handleHorizontal}>
                <View style={[styles.horizontalIcon,{opacity: horizontalScrollOn ? 1 : 0 }]}>
                    <View>
                        <Icon
                            name="format-horizontal-align-center"
                            size={14}
                            color='white'
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
     //floating vertical button component
    const ScrollModeVertical = () =>{
        return (
            <TouchableOpacity onPress={handleVertical}>
                <View style={[styles.verticalIcon,{opacity: horizontalScrollOn ? 0 : 1 }]}>
                    <View>
                        <Icon
                            name="format-vertical-align-center"
                            size={14}
                            color='white'
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

  return (
    // animate pdf reader 'fadInUpBig' in when open 
    <Animatable.View animation={"fadeInUpBig"} duration={2500} style={styles.pdfContainer}>
        <StatusBar backgroundColor='white' barStyle={'dark-content'}/>
        <Pdf
            ref={pdfView}
            onPageSingleTap={handleHide} // hide and show button
            trustAllCerts={false}
            horizontal={horizontalScroll}
            spacing={5}
            enablePaging={horizontalScroll}
            source={{uri:route.params.pdfLink, cache:false}}
            onPageChanged={(page, numberOfPages)=>{
                setPage(page+' of '); //get pages state
                setPages(numberOfPages)
            }}
            scale={1}
            style={styles.pdfWindow}
            renderActivityIndicator = {(progress) =>{ //display progress bar
                return (<Progress.Bar progress={progress} width={150} height={10} borderRadius={10} color='#227C70'/>)
            }}
            onLoadProgress={()=>{

            }}
            onError={(error) => {
                console.log(error);
            }}
        />
        <BackButton/>
        <PageIndicator/> 
            <View style={[styles.toggle,{ opacity: hide ? 0 : 1}]}>
                <ScrollModeHorizontal/>
                <ScrollModeVertical/>
            </View>
    </Animatable.View>
  )
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    pdfContainer:{
        flex: 1,
    },
    pdfWindow:{
        flex:1,
        width: width * 1, 
        height: height * 1,
        height: '100%', 
        backgroundColor:'#F0F0F0',  
    },
    pageNumberContainer:{
        position: 'absolute',
        zIndex: 10,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        right: 5,
        backgroundColor: '#E3FCBF',
        elevation: 2,
        shadowOffset: {height: 0, width: 0},
        borderRadius: 50,
        flexDirection: 'row'
    },
    pageNumber:{
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 3
    },
    horizontalIcon:{
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#227C70',
        borderRadius: 50,
        elevation: 2,
    },
    verticalIcon:{
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#227C70',
        borderRadius: 50,
        elevation: 2,
        shadowOffset: {height: 0, width: 0},
    },
    toggle:{
        backgroundColor: '#E3FCBF',
        position: 'absolute',
        zIndex: 10,
        bottom: 120,
        right: 5,
        borderRadius: 50,
        elevation: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    back:{
        position: 'absolute',
        zIndex: 10,
        padding: 10, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        left: 5,
        backgroundColor: '#227C70',
        elevation: 10,
        shadowColor: '#227C70',
        borderRadius: 50,
        flexDirection: 'row',
        width: 75,
    },
    backText:{
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 3,
        color: 'white',
        flex:4,
        textAlign: 'center'
    },
    iconBack:{
        flex: 1,
    }
})

export default PDFReader;