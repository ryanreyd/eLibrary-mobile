import React, {useState} from 'react';
import { 
    View, 
    ScrollView,
    StyleSheet,
    ToastAndroid,
    Text} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import Dropdown from '../../components/Dropdown/Dropdown';

const SignUpPage1 = ({navigation}) => {

    //list of colleges
    const college_data = [
        {key:'College of Technology',value:'College of Technology'},
        {key:'College of Business',value:'College of Business'},
        {key:'College of Nursing',value:'College of Nursing'},
        {key:'College of Law',value:'College of Law'},
        {key:'College of Education',value:'College of Education'},
        {key:'College of Administration',value:'College of Administration'},
        {key:'College of Arts and Sciences',value:'College of Arts and Sciences'},
    ];

    //list of course in a college
    const course_data= {
        'College of Technology':[
            {key:'BSIT',value:'BSIT'},
            {key:'BSEMC',value:'BSEMC'},
            {key:'BS Automotive Technology',value:'BS Automotive Technology'},
            {key:'BS Electronic Technology',value:'BS Electronic Technology'},
            {key:'BS Food Technology',value:'BS Food Technology'},
        ],
        'College of Business':[
            {key:'BS Hospitality Management',value:'BS Hospitality Management'},
            {key:'BS Business Administration',value:'BS Business Administration'},
            {key:'BS Accountancy',value:'BS Accountancy'},
        ],
        'College of Nursing':[
            {key:'BS Nursing',value:'BS Nursing'}
        ],
        'College of Law':[
            {key:'BS Law',value:'BS Law'},
        ],
        'College of Education':[
            {key:'BS Physical Education',value:'BS Physical Education'},
            {key:'BS Secondary Education',value:'BS Secondary Education'},
            {key:'BS Elementary Education',value:'BS Elementary Education'},
            {key:'BS Childhood Education',value:'BS Childhood Education'},
        ],
        'College of Administration':[
            {key:'Bachelor of Public Administration', value:'Bachelor of Public Administration major in Public Governance'}
        ],
        'College of Arts and Sciences':[
            {key:'BS Environmental Science',value:'BS Environmental Science'},
            {key:'BS English Language',value:'BS English Language'},
            {key:'BS Biology major in Biotechnology',value:'BS Biology major in Biotechnology'},
            {key:'BS Economics',value:'BS Economics'},
            {key:'BS Sociology',value:'BS Sociology'},
            {key:'BS Philosopy',value:'BS Philosopy'},
            {key:'BS Social Science',value:'BS Social Science'},
            {key:'BS Mathematics',value:'BS Mathematics'},
            {key:'BS Communuty Development',value:'BS Communuty Development'},
            {key:'BS Development Communication',value:'BS Development Communication'},
        ],
    };
    const [college, setCollege] = useState("College of Technology");
    const [course, setCourse] = useState("");
    const {control, handleSubmit,watch} = useForm()
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const onNextPressed =() =>{
         const userData = {
            firstname:watch('firstname'),
            middlename: watch('middlename'),
            lastname: watch('lastname'),
            college: college,
            course: course,
            createdDate: formattedDate
         };
         navigation.navigate('SignUpPage2', {userData}); //pass all of the data from form to next the screen 
   };
   
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <View style={styles.formNameCont}>
                  <Text style={styles.formName}>Create an account 1 of 2</Text>
                </View>
                <CustomInput
                    name="firstname"
                    control={control}
                    placeholder="Enter your first name"
                    icon1="account-remove" //icon when no input
                    icon2="account-check" //icon there is input
                    rules={{required:'This field is required'}}
                />
                <CustomInput
                     name="middlename"
                     control={control}
                     placeholder="Enter your middle name"
                     icon1="account-remove"
                     icon2="account-check"
                     rules={{required:'This field is required'}}
                />
                <CustomInput
                    name="lastname"
                    control={control}
                    placeholder="Enter your last name"
                    icon1="account-remove"
                    icon2="account-check"
                    rules={{required:'This field is required'}}
                />
                <Dropdown
                    name="college"
                    control={control}
                    data={college_data} //reference colleges list
                    save="key"
                    onSelect={() => (console.log(college))}
                    setSelected={setCollege}
                    defaultOption={college_data[0]} // default value first index
                    placeholder = "select college"
                    searchPlaceholder = "search college"
                    rules={{required:'This field is required'}}
                />
                <Dropdown
                    name="course"
                    control={control}
                    save="key"
                    data={course_data[college]}
                    setSelected={setCourse}
                    defaultOption={course_data[college][0]} // default value first index
                    placeholder = "select course"
                    searchPlaceholder = "search course"
                    rules={{required:'This field is required'}}
                />
                <View style={styles.buttons}>
                    <View style={styles.next}>
                        <CustomButton
                            text="Next"
                            onPress={handleSubmit(onNextPressed)} 
                            type='UNIQUE'     //button type UNIQUE
                            contParent_type='end'
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root:{
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    formNameCont:{
        width: '100%',
        alignItems: "flex-start",
        marginTop: 50,
        marginBottom: 20,
    },
    formName:{
        color:'#0CC978',
        fontSize: 25,
    },
    buttons:{
        width: '100%',
        paddingBottom: 30,
    },
    next:{
        maxHeight: 45,
    },

});

export default SignUpPage1;