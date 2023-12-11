import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity, ImageBackground } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
// import { getPatient } from '../../Redux/Slices/PatientSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import DropdownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import { color } from 'react-native-elements/dist/helpers';
import jwtDecode from "jwt-decode";
import { IP } from  '../../src/screens/Theme'


const AskNurse = ({route , navigation}) => {
    const { data } = route.params;
    const [nurse, setNurse] = useState(null);
    const [available, setAvailable] = useState([]);
    const [indexx, setIndexx] = useState(0);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      { label: 'السيل', value: 'السيل' },
      { label: 'التامين', value: 'التامين' },
      { label: 'كورنيش', value: 'كورنيش' },
    ]);
    const [value, setValue] = useState(null);
  
    useEffect(() => {
      axios
        .get(`http://${IP}:3500/nurse/nurseProfile/${data._id}`)
        .then((res) => {
          setNurse(res.data.data);
          setAvailable(res.data.data.available);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    function selectedDay(value) {
      let selected = available.find((item) => item.day === value);
      let index = available.indexOf(selected);
      setIndexx(index);
    }
  
    const someFunction = (item) => {
      setValue(item.value);
      setOpen(true);
    };
  
    const handleSubmit = async (values) => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const patientData = await AsyncStorage.getItem('data');
        const token = JSON.parse(tokenString);
        const data = JSON.parse(patientData);
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;
  
        const response = await axios.post(
          `http://${IP}:3500/book/bookNurse/${data._id}?patientId=${patientId}`,
          values,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log('response.data....', response.data);
        if (response?.status === 200) {
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
        }
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
      userPhoneNumber: Yup.string().min(10, 'يجب أن تكون أكثر من 10 أرقام'),
      userAddress: Yup.string().min(3, 'يجب أن تدخل عنوانا مناسباً'),
      userCity: Yup.string(),
      type: Yup.string(),
      patientStatus: Yup.string(),
      period: Yup.object({
        day: Yup.string(),
        times: Yup.string(),
      }),
      type_of_services: Yup.array(),
    });
    return (
        <ScrollView>
            <View style={styles.container}>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        userName: "",
                        email: "",
                        userAge: "",
                        userPhoneNumber: "",
                        userAddress: "",
                        userCity: "",
                        type: "",
                        type_of_services: "",
                        patientStatus: "",
                        period: {
                            day: '',
                            times: ''
                        }
                    }}
                    onSubmit={handleSubmit}>

                    {(props) => (
                        <View style={styles.container}>
                            {/* <ImageBackground source={require('../images/Doctors.gif')} style={styles.image}>

                            </ImageBackground> */}
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
                                        value={props.values.userPhoneNumber}
                                        onChangeText={props.handleChange('userPhoneNumber')}
                                        style={styles.input}
                                        onBlur={props.handleBlur('userPhoneNumber')}
                                    />
                                    <FontAwesome name="phone-square-alt" style={{ color: '#05375a' }} size={20} />
                                </View>
                                {props.errors.userPhoneNumber && props.touched.userPhoneNumber ?
                                    <Animatable.View animation="fadeInLeft" duration={500}>
                                        <Text style={styles.errorMsg}>{props.errors.userPhoneNumber}</Text>
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
                                    <FontAwesome name="userAddress-card" style={{ color: '#05375a' }} size={20} />
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
                                    <FontAwesome name="user" style={{ color: '#05375a' }} size={20} solid />

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
                                            style={{ backgroundColor: "white", justifyContent: 'space-around', flexDirection: 'row' }}>
                                            <View>
                                                <Text style={styles.radioButtonLabel}>ذكر</Text>
                                                <RadioButton value="male" color="darkblue" />
                                            </View>
                                            <View  >
                                                <Text style={styles.radioButtonLabel}>أنثى</Text>
                                                <RadioButton value="female" color="darkblue" />
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
                                            style={{ backgroundColor: "white", justifyContent: 'space-around', flexDirection: 'row' }}>
                                            <View>
                                                <Text style={styles.radioButtonLabel}>السيل</Text>
                                                <RadioButton value="seel" color="darkblue" />
                                            </View>
                                            <View  >
                                                <Text style={styles.radioButtonLabel}>التامين</Text>
                                                <RadioButton value="taamin" color="darkblue" />
                                            </View>
                                            <View  >
                                                <Text style={styles.radioButtonLabel}>الكورنيش</Text>
                                                <RadioButton value="kornish" color="darkblue" />
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
                                    </View>
                                </View>



                                <View style={styles.area}>
                                    <View style={styles.container}>
                                        <Text style={styles.chooseday}>اختر اليوم</Text>
                                        <Picker
                                            selectedValue={selectedDay(props.values.period.day)}
                                            onValueChange={props.handleChange('period.day')}
                                        >
                                            <Picker.Item label="حدد اليوم" value="option" />
                                            <Picker.Item label="السبت" value="السبت" />
                                            <Picker.Item label="الأحد" value="الأحد" />
                                            <Picker.Item label="الإثنين" value="الإثنين" />
                                            <Picker.Item label="الثلاثاء" value="الثلاثاء" />
                                            <Picker.Item label="الأربعاء" value="الأربعاء" />
                                            <Picker.Item label="الخميس" value="الخميس" />
                                            <Picker.Item label="الجمعه" value="الجمعه" />
                                        </Picker>
                                    </View>


                                    <View style={styles.container}>
                                        <Text style={styles.chooseday}>اختر الموعد</Text>
                                        <Picker
                                            selectedValue={props.values.period.times}
                                            onValueChange={props.handleChange('period.times')}
                                        >
                                            <Picker.Item label="حدد الموعد" value="option" />
                                            {available[indexx] != null ? available[indexx].times.map((item, index) => {
                                                return <Picker.Item value={item} label={item} key={index} />
                                            }
                                            ) : (() => {
                                                return <Picker.Item value='no' label='لايوجد مواعيد متاحه' />
                                            })}
                                        </Picker>
                                    </View>
                                    {props.touched.period && props.errors.period && (
                                        <Text style={styles.error}>{props.errors.period}</Text>
                                    )}
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
        borderRadius: 10,
        marginBottom: 30
    },
    drop:
    {
        flex: 1,
        marginBottom: 50
    },
    chooseday: {
        color: "white",
        margin: 10,
        marginBottom: 15,
        fontWeight: "bold"
    },
    area: {
        flex: 2,
        zIndex: 2
    },
    appointments: {
        flex: 2,
        zIndex: 2
    },

    image: {
        flex: 2,
        resizeMode: 'cover',
        // justifyContent: 'center',
        alignSelf: "center",
        width: 350,
        height: 200
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_footer: {
        color: '#05375a',
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
})

export default AskNurse