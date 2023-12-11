import React, { useState, useEffect } from 'react';
import { View,Button,FlatList, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity, ImageBackground } from 'react-native'
import { Formik, Field, Form, ErrorMessage,useFormikContext  } from 'formik';
import {Picker} from '@react-native-picker/picker';
import * as Yup from 'yup'
import axios from 'axios'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
// import { getPatient } from '../../Redux/Slices/PatientSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
// import DropdownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import jwtDecode from "jwt-decode";
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from 'react-native-paper';
import { IP } from  '../../src/screens/Theme.js'
import io from 'socket.io-client';
import {getBookingNurse} from '../../Redux/Slices/PatientSlice';

const Shift = ({props,route, navigation }) => {
  const API_URL = `http://${IP}:3500`;
  const Socket = io(API_URL);
  // const loc = useLocation();
  const dispatch = useDispatch();
    const { data } = route.params;

    console.log(data._id , "erefererterter");
 

    const [days, setDays] = useState({ 
        Saturday: false,
        Sunday: false, 
        Monday: false,  
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false
      });
      // const selectDay = (day) => {
      //   setDays((prevDays) => ({
      //     ...prevDays,
      //     [day]: !prevDays[day], 
      //   }));
      // };

     
      const [open, setOpen] = useState(false);
    //   const [value, setValue] = useState(null);

    const [selectedPaper, setSelectedPaper] = useState('');
    
    // const { setFieldValue } = useFormikContext();
    const [selectedValue, setSelectedValue] = useState('');
    


      const [appointment, setappointment] = useState([
          {label: 'السبت من 4 الى 5', value: 'السبت من 4 الى 5'},
        {label: 'الاحد من 4 الى 5', value: 'الاحد من 4 الى 5'},
        {label: 'الاتنين من 4 الى 5', value: 'الاتنين من 4 الى 5'},

      ]);
      
     
    const [token, setToken] = useState('');
    
      
    const [selectedServices, setSelectedServices] = useState(props?.values?.type_of_services || []);

    const handleServiceSelection = (service, isChecked) => {
      if (isChecked) {
        setSelectedServices([...selectedServices, service]);
      } else {
        setSelectedServices(selectedServices.filter(s => s !== service));
      }
    };
   
    useEffect(() => {
        AsyncStorage.getItem('token').then(async (tokenn) => {
            try {
            console.log('Token:', tokenn);
            const parsedToken = JSON.parse(tokenn);
            console.log('Parsed token:', parsedToken);
            setToken(parsedToken);
          } catch (error) {
            console.error('Error parsing token:', error);
          }
        });
      }, []);
    //   new 
  
    
    const handleSubmit = async (values) => {
      console.log(values);
      console.log("nurse id", data._id);
    
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const token = JSON.parse(tokenString);
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;
        console.log("patient id", patientId);
        nurseId = data._id;
    
        const res = await axios.post(
          `http://${IP}:3500/book/bookNurse/${nurseId}?patientId=${patientId}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
    
        dispatch(getBookingNurse());
        console.log('hany test', res.data);
          Socket.emit('sendNotificationBookNurse',{
                        patientName: res.data.data.userName,
                        NurseId: res.data.data.NurseId,
                        status: res.data.data.status,
                        times:res.data.data.period.times,
                        bookId: res.data.data._id
          })
        // Show an alert to the user
        const alertPromise = new Promise((resolve, reject) => {
          Alert.alert(
            'نحن نقوم بخدمتك في اسرع وقت ',
            'شكرا لطلبك  خدمتك قيد التقدم الان',
            [{ text: 'OK', onPress: () => resolve(
            //  navigation.goBack(),
            //  navigation.goBack()

            ) }],
            { cancelable: false }
          );
        });
    
        // Wait for the user to press "OK" on the alert
        await alertPromise;
    
        // Navigate to the "Home" screen
        navigation.goBack(),
        navigation.goBack()
        // navigation.navigate('Home');
      } catch (error) {
        console.error(error);
      }
    };
  
const schema = Yup.object().shape({
    userName: Yup.string().min(3, 'الإسم لا يقل عن 3 أحرف'),
    email: Yup.string().min(10, 'يجب أن يزيد عن 10 أحرف'),
    userAge: Yup.number()
        .positive('يجب أن يكون العمر أكبر من الصفر')
        .integer('يجب أن يكون العمر عددًا صحيحًا')
          .min(18, 'يجب أن يكون العمر 18 عامًا أو أكبر'),
          userMobile: Yup.string().min(10, 'يجب أن تكون أكثر من 10 أرقام'),
          userAddress: Yup.string().min(3, 'يجب أن تدخل عنوانا مناسباً'),
        userCity: Yup.string(),
        type: Yup.string(),
        patientStatus: Yup.string(),
        period:Yup.object({
            day:Yup.string(),
        shift:Yup.string(),
      }) ,
      type_of_services:Yup.array()
       
      });
    //   const handleChange = (value) => {
    //     setUserCity(value);
    //   };
    
    const selectDay = (day) => {
      props.setFieldValue('period.day', day);
      setDays((prevDays) => ({
        ...Object.keys(prevDays).reduce(
          (acc, curr) => ({ ...acc, [curr]: curr === day }),
          {}
        ),
      }));
    };
    
      return (
          
          <ScrollView>
        <View style={styles.container}>
            <Formik
                validationSchema={schema}
                initialValues={{
                    userName: "",
                    email: "",
                    userAge: "",
                    userMobile: "",
                    userAddress: "",
                    userCity: "",
                    type: "", 
                    type_of_services:[],
                    patientStatus:"",
                    period:{
                        day:'',
                        shift:''
                    }
                }}
                onSubmit={handleSubmit}
                >

                {(props) => (
                    <View style={styles.container}>
                      <ImageBackground source={require('../images/Doctors.gif')} style={styles.image}>
                         
                      </ImageBackground>
                    <Animatable.View animation="fadeInUpBig" style={styles.footer}>

                        <Text style={{ color: '#05375a', fontSize: 18, fontWeight: '600' }}>الإسم</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="إسم المريض"
                                placeholderTextColor="#666666"
                                value={props.values.userName}
                                onChangeText={props.handleChange('userName')}
                                style={styles.input}
                                onBlur={props.handleBlur('userName')}
                            />
                            <FontAwesome name="user-circle" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.userName && props.touched.userName ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.userName}</Text>
                            </Animatable.View>
                            : null
                        }
                        <Text style={[styles.text_footer]}>الإيميل</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل الإيميل الخاص"
                                placeholderTextColor="#666666"
                                value={props.values.email}
                                onChangeText={props.handleChange('email')}
                                style={styles.input}
                                onBlur={props.handleBlur('email')}
                            />
                            <FontAwesome name="envelope" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.email && props.touched.email ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.email}</Text>
                            </Animatable.View>
                            : null
                        }

                        <Text style={[styles.text_footer]}>العمر</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل العمر"
                                placeholderTextColor="#666666"
                                value={props.values.userAge}
                                onChangeText={props.handleChange('userAge')}
                                style={styles.input}
                                onBlur={props.handleBlur('userAge')}
                            />
                            <FontAwesome name="child" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.userAge && props.touched.userAge ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.userAge}</Text>
                            </Animatable.View>
                            : null
                        }

                        <Text style={[styles.text_footer]}>الهاتف</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل رقم الهاتف"
                                placeholderTextColor="#666666"
                                value={props.values.userMobile}
                                onChangeText={props.handleChange('userMobile')}
                                style={styles.input}
                                onBlur={props.handleBlur('userMobile')}
                            />
                            <FontAwesome name="phone" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.userMobile && props.touched.userMobile ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.userMobile}</Text>
                            </Animatable.View>
                            : null
                        }

                        <Text style={[styles.text_footer]}>العنوان</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل العنوان بالتفصيل"
                                placeholderTextColor="#666666"
                                value={props.values.userAddress}
                                onChangeText={props.handleChange('userAddress')}
                                style={styles.input}
                                onBlur={props.handleBlur('userAddress')}
                                />
                            <FontAwesome name="address-card" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.userAddress && props.touched.userAddress ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.userAddress}</Text>
                            </Animatable.View>
                            : null
                        }

                        <Text style={[styles.text_footer]}>حالة المريض</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل حالة المريض"
                                placeholderTextColor="#666666"
                                value={props.values.patientStatus}
                                onChangeText={props.handleChange('patientStatus')}
                                style={styles.input}
                                onBlur={props.handleBlur('patientStatus')}
                            />
              <FontAwesome name="user"style={{ color: '#05375a' }} size={20} solid />

                            {/* <FontAwesome name="male" style={{ color: '#05375a' }} size={20} /> */}
                        </View>
                        {props.errors.patientStatus && props.touched.patientStatus ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.patientStatus}</Text>
                            </Animatable.View>
                            : null
                        }


<View>
<Text style={[styles.text_footer]}> النوع :</Text>
  <RadioButton.Group
    onValueChange={props.handleChange('type')}
    value={props.values.type}>
   <View 
     style={{backgroundColor:"white" , justifyContent:'space-around'  ,flexDirection: 'row'  }}>
   <View>
      <Text style={styles.radioButtonLabel}>ذكر</Text>
      <RadioButton value="male" color="darkblue" />
    </View>
    <View  >
      <Text style={styles.radioButtonLabel}>أنثى</Text>
      <RadioButton value="female" color="darkblue"  />
    </View>
   </View>
  </RadioButton.Group>
</View>

<View style={styles.area}>

<Text style={[styles.text_footer]}> المنطقة:</Text>
  <RadioButton.Group
    onValueChange={props.handleChange('userCity')}
    value={props.values.userCity}>
   <View 
     style={{backgroundColor:"white" , justifyContent:'space-around'  ,flexDirection: 'row'  }}>
   <View>
      <Text style={styles.radioButtonLabel}>السيل</Text>
      <RadioButton value="seel" color="darkblue" />
    </View>
    <View  >
      <Text style={styles.radioButtonLabel}>التامين</Text>
      <RadioButton value="taamin" color="darkblue"  />
    </View>
    <View  >
      <Text style={styles.radioButtonLabel}>الكورنيش</Text>
      <RadioButton value="kornish" color="darkblue"  />
    </View>
   </View>
  </RadioButton.Group>

    </View>


    <View>
      <Text style={[styles.text_footer]}> نوع الخدمة :</Text>
      <View>
        <CheckBox
          title="حقن"
          checked={props.values.type_of_services.includes('حقن')}
          onPress={() => {
            if (props.values.type_of_services.includes('حقن')) {
              props.setFieldValue('type_of_services', props.values.type_of_services.filter((service) => service !== 'حقن'));
            } else {
              props.setFieldValue('type_of_services', [...props.values.type_of_services, 'حقن']);
            }
          }}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
        />
        <CheckBox
          title="رعاية بعد عملية"
          checked={props.values.type_of_services.includes('رعاية بعد عملية')}
          onPress={() => {
            if (props.values.type_of_services.includes('رعاية بعد عملية')) {
              props.setFieldValue('type_of_services', props.values.type_of_services.filter((service) => service !== 'رعاية بعد عملية'));
            } else {
              props.setFieldValue('type_of_services', [...props.values.type_of_services, 'رعاية بعد عملية']);
            }
          }}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
        />
        <CheckBox
          title="جلسة بخار اكسجين"
          checked={props.values.type_of_services.includes('جلسة بخار اكسجين')}
          onPress={() => {
            if (props.values.type_of_services.includes('جلسة بخار اكسجين')) {
              props.setFieldValue('type_of_services', props.values.type_of_services.filter((service) => service !== 'جلسة بخار اكسجين'));
            } else {
              props.setFieldValue('type_of_services', [...props.values.type_of_services, 'جلسة بخار اكسجين']);
            }
          }}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
        />
        <CheckBox
          title="رعاية كبار سن"
          checked={props.values.type_of_services.includes('رعاية كبار سن')}
          onPress={() => {
            if (props.values.type_of_services.includes('رعاية كبار سن"')) {
              props.setFieldValue('type_of_services', props.values.type_of_services.filter((service) => service !== 'رعاية كبار سن'));
            } else {
              props.setFieldValue('type_of_services', [...props.values.type_of_services, 'رعاية كبار سن']);
            }
          }}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
        />
        {/* ... */}
      </View>
    </View>

    <View style={styles.container}>
      <Text style={styles.chooseday}>اختر اليوم   :</Text>
      <FlatList
        style={styles.appointments}
        data={Object.keys(days)}
        renderItem={({ item }) => (
          <CheckBox
            title={item}
            checked={props.values.period.day === item.toLowerCase()}
            onPress={() => {
              props.setFieldValue('period.day', item.toLowerCase());
              setDays((prevDays) => ({
                ...Object.keys(prevDays).reduce(
                  (acc, curr) => ({ ...acc, [curr]: curr === item.toLowerCase() }),
                  {}
                ),
              }));
            }}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>


<View>
<Text style={[styles.text_footer]}> الشيفت</Text>
  <RadioButton.Group
    onValueChange={props.handleChange('period.shift')}
    value={props.values.period.shift}>
   <View 
     style={{backgroundColor:"white" , justifyContent:'space-around'  ,flexDirection: 'row'  }}>
   <View>
      <Text style={styles.radioButtonLabel}>صباحى</Text>
      <RadioButton value="morning" color="darkblue" />
    </View>
    <View  >
      <Text style={styles.radioButtonLabel}>مسائى</Text>
      <RadioButton value="evening" color="darkblue"  />
    </View>
   </View>
  </RadioButton.Group>
</View>        

            <View>
                    <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                            <Text style={styles.textButton}>إرسال</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                    </View>
                )}
            </Formik>
        </View>
</ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#041858',
        borderRadius:10
    },
    drop:
    {
        flex: 1,
        marginBottom:50
    },
    chooseday:{
        color:"white",
        margin:10,
        fontSize: 18,
        fontWeight: '600',
    },
    area:{
        flex:2,
       zIndex:2
    },
    appointments:{
        flex:2,
        zIndex:2 
    },
    image: {
        flex: 2,
        resizeMode: 'cover',
        // justifyContent: 'center',
        alignSelf:"center",
        width:350,
        height:200
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#041858',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 35,
    },
    action: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    input: {
        flex: 1,
        marginTop: -5,
        paddingLeft: 10,
        color: '#05375a',
        fontSize: 15,
        textAlign: "right",
    },
    button: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#041858",
        borderWidth: 1,
        marginTop: 50,
        alignSelf: "center"
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 12,
    },
    dropdown:{
        // borderColor:'#041858',
        borderWidth:1.5,
        marginTop:10,
        
    }
})

export default Shift