import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { getPatient } from '../../Redux/Slices/PatientSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP } from  '../../src/screens/Theme.js'
const AskDevice = (props) => {
  const [patData, setPatData] = useState({});
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient);

  useEffect(() => {
    AsyncStorage.getItem('data').then((patient) => {
      let data;
      try {
        data = JSON.parse(patient);
        setPatData(data);
        dispatch(getPatient());
      } catch (error) {
        data = null;
      }
    });
  }, [dispatch]);

//   let schema = Yup.object().shape({
//     userName: Yup.string().min(3, 'الإسم لا يقل عن 3 أحرف').required('يجب إدخال الإسم'),
//     email: Yup.string().min(10, 'يجب أن يزيد عن 10 أحرف').required('يجب إدخال البريد الإلكتروني'),
//     userAge: Yup.number()
//       .positive('يجب أن يكون العمر أكبر من الصفر')
//       .integer('يجب أن يكون العمر عددًا صحيحًا')
//       .min(18, 'يجب أن يكون العمر 18 عامًا أو أكبر')
//       .required('يجب إدخال العمر'),
//     userMobile: Yup.string().min(10, 'يجب أن تكون أكثر من 10 أرقام').required('يجب إدخال رقم الهاتف'),
//     address: Yup.string().min(3, 'يجب أن تدخل عنوانا مناسباً').required('يجب إدخال العنوان'),
//     region: Yup.string().required('يجب إدخال المنطقة'),
//     gender: Yup.string().required('يجب إدخال الجنس'),
//     startDate: Yup.date().required('يجب إدخال تاريخ البدء'),
//     endDate: Yup.date().required('يجب إدخال تاريخ الانتهاء'),
//     numOfDevices: Yup.number().required('يجب إدخال عدد الأجهزة'),
//   });

let schema = Yup.object().shape({
    userName: Yup.string().min(3, 'الإسم لا يقل عن 3 أحرف'),
    email: Yup.string().min(10, 'يجب أن يزيد عن 10 أحرف'),
    userAge: Yup.number()
      .positive('يجب أن يكون العمر أكبر من الصفر')
      .integer('يجب أن يكون العمر عددًا صحيحًا')
      .min(18, 'يجب أن يكون العمر 18 عامًا أو أكبر'),
    userMobile: Yup.string().min(10, 'يجب أن تكون أكثر من 10 أرقام'),
    address: Yup.string().min(3, 'يجب أن تدخل عنوانا مناسباً'),
    region: Yup.string(),
    gender: Yup.string(),
    startDate: Yup.date(),
    endDate: Yup.date(),
    numOfDevices: Yup.number(),
  });
  
  const handleSubmit = async (values) => {
    console.log(values);
    console.log("values");
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'تم حفظ النموذج',
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
    console.log(patient)

    try {
      const tokenn = await AsyncStorage.getItem('token');
      const token = JSON.parse(tokenn);
      const patient = await AsyncStorage.getItem('data');
      const data = JSON.parse(patient);
      const patientId = data._id;
      console.log(patientId)
      const response = await axios.post(`http://${IP}:3500/order/addOrder/?patientId=${patientId}`, values, {
        headers: { authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      props.navigation.navigate('Checkout');
    } catch (error) {
      console.error(error);
    }
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
                    address: "",
                    region: "",
                    gender: "", 
                    startDate: "",
                    endDate: "",
                }}
                onSubmit={handleSubmit}
            >

                {(props) => (
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
                            <FontAwesome name="phone-square-alt" style={{ color: '#05375a' }} size={20} />
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
                                value={props.values.address}
                                onChangeText={props.handleChange('address')}
                                style={styles.input}
                                onBlur={props.handleBlur('address')}
                            />
                            <FontAwesome name="address-card" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.address && props.touched.address ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.address}</Text>
                            </Animatable.View>
                            : null
                        }

                        <Text style={[styles.text_footer]}>المنطقه</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل المنطقه بالتفصيل"
                                placeholderTextColor="#666666"
                                value={props.values.region}
                                onChangeText={props.handleChange('region')}
                                style={styles.input}
                                onBlur={props.handleBlur('region')}
                            />
                            <FontAwesome name="city" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.region && props.touched.region ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.region}</Text>
                            </Animatable.View>
                            : null
                        }

                        <Text style={[styles.text_footer]}>الجنس</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل الجنس"
                                placeholderTextColor="#666666"
                                value={props.values.gender}
                                onChangeText={props.handleChange('gender')}
                                style={styles.input}
                                onBlur={props.handleBlur('gender')}
                            />
                            <FontAwesome name="male" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.gender && props.touched.gender ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.gender}</Text>
                            </Animatable.View>
                            : null
                        }


                     

                        <Text style={[styles.text_footer]}>موعد بداية التأجير</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل موعد بداية التأجير"
                                placeholderTextColor="#666666"
                                value={props.values.startDate}
                                onChangeText={props.handleChange('startDate')}
                                style={styles.input}
                                onBlur={props.handleBlur('startDate')}
                            />
                            <FontAwesome name="clipboard" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.startDate && props.touched.startDate ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.startDate}</Text>
                            </Animatable.View>
                            : null
                        }

                        <Text style={[styles.text_footer]}>موعد نهاية التأجير</Text>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="أدخل موعد نهاية التأجير"
                                placeholderTextColor="#666666"
                                value={props.values.endDate}
                                onChangeText={props.handleChange('endDate')}
                                style={styles.input}
                                onBlur={props.handleBlur('endDate')}
                            />
                            <FontAwesome name="clipboard-list" style={{ color: '#05375a' }} size={20} />
                        </View>
                        {props.errors.endDate && props.touched.endDate ?
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>{props.errors.endDate}</Text>
                            </Animatable.View>
                            : null
                        }

                        <View>
                            <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                                <Text style={styles.textButton}>إرسال</Text>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
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

export default AskDevice