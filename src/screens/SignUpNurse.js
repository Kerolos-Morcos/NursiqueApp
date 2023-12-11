import React, { useState , useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet , Image , ImageBackground} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
// import { Feather } from 'react-native-feather';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Octicons';
import Phone from 'react-native-vector-icons/Fontisto';
import Address from 'react-native-vector-icons/MaterialIcons';
import Region from 'react-native-vector-icons/MaterialIcons';
import { IP } from  '../../src/screens/Theme';
import { RadioButton } from 'react-native-paper';
import ToastManager, { Toast } from 'toastify-react-native'

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("الاسم بالكامل مطلوب"),
    email: Yup.string().email("Invalid email").required("البريد الإلكتروني مطلوب"),
    phoneNumber: Yup.string().required("رقم الهاتف مطلوب"),
    password: Yup.string()
      .min(8, "كلمة السر يجب ان تحتوي علي 8 احرف علي الأقل")
      .required("كلمة السر مطلوبة"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "الحقول يجب ان تكون متطابقة")
      .required("تأكيد كلمة السر مطلوبة"),
      age: Yup.number().required("السن مطلوب"),
    gender: Yup.string().required("النوع مطلوب"),
    region: Yup.string().required("المنطقة السكنية مطلوبة"),
    address: Yup.string().required("العنوان مطلوب"),
    nationalId: Yup.string().required("الرقم القومي مطلوب"),
    gradeCert: Yup.string(),
    licenseJob: Yup.string()
  });


const Home = ({ navigation }) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      })();
    }, []);
  
    const pickImage1 = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage1(result.assets[0].uri);
        showToasts();
      }
    };
  
    const pickImage2 = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage2(result.assets[0].uri);
        showToasts();
      }
    };
    const showToasts = () => {
      if (image1 != null || image2 != null ) {
        Toast.success('تم ارفاق الملف بنجاح !')
      } else {
        Toast.error('الرجاء ارفاق الملفات المطلوبة')
      }
    }
    // showToasts();
  const [showPassword, setShowPassword] = useState(false);
  console.log(image1)
 
  const handleRegister = (values) => {
    // console.log()
   
    const tostError = () =>{
      if (image1 == null && image2 == null ) {
       Toast.error('الرجاء ارفاق الملفات المطلوبة')
     }
   }
   tostError();
    console.log("values",values)
    const data = new FormData();
    data.append('name', values.name);
    data.append('email', values.email);
    data.append('password', values.password);
    data.append('age', values.age);
    data.append('phoneNumber', values.phoneNumber);
    data.append('address', values.address);
    data.append('region', values.region);
    data.append('nationalId', values.nationalId);
    data.append('gender', values.gender);
    data.append('gradeCert', {
        uri: image1,
        type: 'image/jpeg',
        name: 'profile_image.jpeg',
      });
      data.append('licenseJob', {
        uri: image2,
        type: 'image/jpeg',
        name: 'profile_image.jpeg',
      });
    
    let config={
      headers: {
      'Content-Type': 'multipart/form-data',
    }}
    axios.post(`http://${IP}:3500/nurse/nurseReg`, data , config)
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
      <Image source={require('../images/Nurse.gif')} style={styles.image}/>
      <ToastManager
              style={{
                marginTop:-60,
                height:90,
              }} />

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
          gradeCert: "",
          licenseJob:"",
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {(formikProps) => (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
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
              {console.log(formikProps.errors)}
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
                  name="confirmPassword"
                  secureTextEntry={true}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={formikProps.handleChange('confirmPassword')}
                  onBlur={formikProps.handleBlur('confirmPassword')}
                  value={formikProps.values.confirmPassword}
                />
                {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword ? (
                  <Animatable.View animation="bounceIn">
                    {/* <Feather name="x-circle" color="red" size={20} /> */}
                  </Animatable.View>
                ) : null}
                {formikProps.touched.confirmPassword && !formikProps.errors.confirmPassword ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </View>
              {formikProps.touched.confirmPassword && formikProps.errors.confirmPassword ? (
                <Text style={styles.errorMsg}>{formikProps.errors.confirmPassword}</Text>
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
              <View style={styles.container2}>
             
      <TouchableOpacity onPress={pickImage1} style={styles.button2}>
     
        <Text style={{color:"#041858" , fontWeight:'bold'}}>شهادة التخرج</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage2} style={styles.button2}>
       
        <Text style={{color:"#041858" , fontWeight:'bold'}}>رخصة المهنة</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={showToasts} style={styles.button2}>
        <Text style={{color:"#041858", fontWeight:'bold'}}>Upload</Text>
      </TouchableOpacity> */}
     
    </View>
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
  image: {
    flex: 1,
    justifyContent: 'center',
      paddingTop:290,
      height:300,
      borderBottomWidth:.7,
    borderRadius:65,
      borderBottomColor:'#00000031',
      width:300,
        },
        afterImage:{
          borderBottomWidth:.7,
          borderRadius:65,
            borderBottomColor:'#00000031',
           marginBottom:20
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
    marginTop:20,
    marginBottom:10,
    alignSelf:"center"

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
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 35
  },
  button2: {
    // backgroundColor: '#041585',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor:"white",
    borderWidth:.7,
    borderColor:"#041858"
  },
  buttonImage: {
    width: 100,
    height: 100,
  },
  // image: {
  //   width: 200,
  //   height: 200,
  //   borderRadius: 8,
  // },
});

export default Home;