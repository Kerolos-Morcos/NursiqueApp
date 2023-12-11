import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet,Image, ImageBackground } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
// import { Feather } from 'react-native-feather';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Octicons';
import Phone from 'react-native-vector-icons/Fontisto';
import Address from 'react-native-vector-icons/MaterialIcons';
import Region from 'react-native-vector-icons/MaterialIcons';

import { IP } from  '../../src/screens/Theme'
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('اسم المستخدم مطلوب'),
  email: Yup.string().email('ادخل ايميل صحيح').required('الايميل مطلوب'),
  password: Yup.string()
    .min(6, 'يجب ان يكون الرقم السري 6 احرف على الاقل')
    .required('الرقم السري مطلوب'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'يجب ان يتطابق الرقم السري')
    .required('تاكيد الرقم السري مطلوب'),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    age: Yup.number().required("السن مطلوب"),
    gender: Yup.string().required("النوع مطلوب"),
    region: Yup.string().required("المنطقة السكنية مطلوبة"),
    address: Yup.string().required("العنوان مطلوب"),
    nationalId: Yup.string().required("الرقم القومي مطلوب"),

});

const Home = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (values) => {
    axios.post(`http://${IP}:3500/patient/patientReg`, values)
      .then((response) => {
        console.log("first")
        if (response.status === 200) {
          console.log(response.data);
          navigation.navigate('Signin');
        } else {
          console.log('Form submission failed.');
        }
      })
      .catch((error) => {
        console.log(error)
        console.error('Error submitting form:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                 <Image source={require('../images/user.gif')} style={styles.image}/>
                        <Formik
          initialValues={{
            name: "",
          email: "",
          phoneNumber: "",
          password: "",
          gender: "",
          region: "",
          address: "",
          age: "",
          nationalId: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {(formikProps) => (
            
            <ScrollView  showsVerticalScrollIndicator={false} style={styles.form}>
              <Text style={styles.text_footer}>اسم المستخدم</Text>
              <View style={styles.action}>
                <FontAwesome name="user-o" color="darkblue" size={20} />
                <TextInput
                  placeholder="ادخل اسمك"
                  name="name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('name')}
                  onBlur={formikProps.handleBlur('name')}
                  value={formikProps.values.name}
                />
                {formikProps.touched.name && formikProps.errors.name ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="x-circle" color="red" size={20} />
                  </Animatable.View>
                ) : null}
                {formikProps.touched.name && !formikProps.errors.name ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.name && formikProps.errors.name ? (
                <Text style={styles.errorMsg}>{formikProps.errors.name}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>الايميل</Text>
              <View style={styles.action}>
                <FontAwesome name="envelope-o" color="darkblue" size={20} />
                <TextInput
                  placeholder="ادخل ايميلك"
                  name="email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
                  value={formikProps.values.email}
                />
                {formikProps.touched.email && formikProps.errors.email ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="x-circle" color="red" size={20} />
                  </Animatable.View>
                ) : null}
                {formikProps.touched.email && !formikProps.errors.email ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.email && formikProps.errors.email ? (
                <Text style={styles.errorMsg}>{formikProps.errors.email}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>الرقم السري</Text>
              <View style={styles.action}>
                {/* <FontAwesome name="lock" color="darkblue" size={20} /> */}
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "unlock" : "lock"}
                    color="darkblue" size={20}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="ادخل الرقم السري"
                  name="password"
                  secureTextEntry={!showPassword}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('password')}
                  onBlur={formikProps.handleBlur('password')}
                  value={formikProps.values.password}
                />
              </View>
              {formikProps.touched.password && formikProps.errors.password ? (
                <Text style={styles.errorMsg}>{formikProps.errors.password}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>تأكيد الرقم السري</Text>
              <View style={styles.action}>
                {/* <FontAwesome name="lock" color="darkblue" size={20} /> */}
                     <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "unlock" : "lock"}
                    color="darkblue" size={20}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="ادخل تأكيد الرقم السري"
                  name="confirm_password"
                  secureTextEntry={true}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('confirm_password')}
                  onBlur={formikProps.handleBlur('confirm_password')}
                  value={formikProps.values.confirm_password}
                />
                {formikProps.touched.confirm_password && formikProps.errors.confirm_password ? (
                  <Animatable.View animation="bounceIn">
                    {/* <Feather name="x-circle" color="red" size={20} /> */}
                  </Animatable.View>
                ) : null}
                {formikProps.touched.confirm_password && !formikProps.errors.confirm_password ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.confirm_password && formikProps.errors.confirm_password ? (
                <Text style={styles.errorMsg}>{formikProps.errors.confirm_password}</Text>
              ) : null}
              <View>
  <Text style={[styles.text_footer, { marginTop: 35 }]}>النوع</Text>
  <RadioButton.Group
    onValueChange={formikProps.handleChange('gender')}
    value={formikProps.values.gender}
  
  >
   <View   style={{backgroundColor:"white" , justifyContent:'space-around'  ,flexDirection: 'row'  }}>
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
  {formikProps.touched.gender && formikProps.errors.gender ? (
    <Animatable.View animation="bounceIn">
      <Feather name="x-circle" color="red" size={20} />
    </Animatable.View>
  ) : null}
  {formikProps.touched.gender && !formikProps.errors.gender ? (
    <Animatable.View animation="bounceIn">
      <Feather name="check-circle" color="green" size={20} />
    </Animatable.View>
  ) : null}
</View>
              {formikProps.touched.gender && formikProps.errors.gender ? (
                <Text style={styles.errorMsg}>{formikProps.errors.gender}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>العمر</Text>
              <View style={styles.action}>
                <Icon name="number" color="darkblue" size={20} />
                <TextInput
                  placeholder="ادخل العمر"
                  name="age"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('age')}
                  onBlur={formikProps.handleBlur('age')}
                  value={formikProps.values.age}
                />
                {formikProps.touched.age && formikProps.errors.age ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="x-circle" color="red" size={20} />
                  </Animatable.View>
                ) : null}
                {formikProps.touched.age && !formikProps.errors.age ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.age && formikProps.errors.age ? (
                <Text style={styles.errorMsg}>{formikProps.errors.age}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>رقم الهاتف</Text>
              <View style={styles.action}>
                <Phone  name="phone" color="darkblue" size={20} />
                <TextInput
                  placeholder="ادخل رقم هاتفك"
                  name="phoneNumber"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('phoneNumber')}
                  onBlur={formikProps.handleBlur('phoneNumber')}
                  value={formikProps.values.phoneNumber}
                />
                {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="x-circle" color="red" size={20} />
                  </Animatable.View>
                ) : null}
                {formikProps.touched.phoneNumber && !formikProps.errors.phoneNumber ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber ? (
                <Text style={styles.errorMsg}>{formikProps.errors.phoneNumber}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>العنوان</Text>
              <View style={styles.action}>
                <Address name="place" color="darkblue" size={20} />
                <TextInput
                  placeholder="ادخل عنوانك"
                  name="address"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('address')}
                  onBlur={formikProps.handleBlur('address')}
                  value={formikProps.values.address}
                />
                {formikProps.touched.address && formikProps.errors.address ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="x-circle" color="red" size={20} />
                  </Animatable.View>
                ) : null}
                {formikProps.touched.address && !formikProps.errors.address ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.address && formikProps.errors.address ? (
                <Text style={styles.errorMsg}>{formikProps.errors.address}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>المنطقة</Text>
              <View style={styles.action}>
                <Region name="gps-fixed" color="darkblue" size={20} />
                <TextInput
                  placeholder="ادخل المنطقة"
                  name="region"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('region')}
                  onBlur={formikProps.handleBlur('region')}
                  value={formikProps.values.region}
                />
                {formikProps.touched.region && formikProps.errors.region ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="x-circle" color="red" size={20} />
                  </Animatable.View>
                ) : null}
                {formikProps.touched.region && !formikProps.errors.region ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.region && formikProps.errors.region ? (
                <Text style={styles.errorMsg}>{formikProps.errors.region}</Text>
              ) : null}
              <Text style={[styles.text_footer, { marginTop: 35 }]}>الرقم القومى</Text>
              <View style={styles.action}>
                <FontAwesome name="id-card" color="darkblue" size={20} />
                <TextInput
                  placeholder="ادخل الرقم القومى"
                  name="nationalId"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('nationalId')}
                  onBlur={formikProps.handleBlur('nationalId')}
                  value={formikProps.values.nationalId}
                />
                {formikProps.touched.nationalId && formikProps.errors.nationalId ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="x-circle" color="red" size={20} />
                  </Animatable.View>
                ) : null}
                {formikProps.touched.nationalId && !formikProps.errors.nationalId ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.nationalId && formikProps.errors.nationalId ? (
                <Text style={styles.errorMsg}>{formikProps.errors.nationalId}</Text>
              ) : null}
              <TouchableOpacity style={styles.button} onPress={formikProps.handleSubmit}>
                <Text style={styles.textSign}>تسجيل</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Formik>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041858',
   
  },
  
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
   textAlign:"right"
  },
  button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor:"#041858",
    marginTop:40,
    alignSelf:"center"

  },
  image: {
    flex: 1,
    // resizeMode: 'cover',
    justifyContent: 'center',
      paddingTop:290,
      height:300,
      borderBottomWidth:.7,
    borderRadius:65,
      borderBottomColor:'#00000031',
      width:300,

       },
      
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});

export default Home;