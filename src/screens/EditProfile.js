import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    TouchableRipple,
    ScrollView,
  } from "react-native";
  import { Formik } from "formik";
  import * as Yup from "yup";
  import React, { useState } from "react";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from "axios";
  import * as ImagePicker from "expo-image-picker";
  import { Avatar, Button } from "react-native-paper";
  import * as Permissions from "expo-permissions";
  import {getPatient} from '../../Redux/Slices/PatientSlice';
  import { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import * as Animatable from "react-native-animatable";
  import FontAwesome from "react-native-vector-icons/FontAwesome5";
  // import SweetAlert from 'react-native-sweet-alert';
  import Swal from "sweetalert2";
  import { IP } from  '../../src/screens/Theme'

  // import { useNavigation } from '@react-navigation/native';

  
  const EditProfileScreen = ({navigation}) => {
 
 function nav(){
  console.log('first')
  navigation.navigate('patientProfile');
}
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getPatient());
     }, []);
      const patient = useSelector((state) => state.PatientSlice.patient);
     console.log(patient , "kkkkkk")
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
          });
      
          if (!result.cancelled) {
            setImage(result.assets[0].uri);
          }
        }
      };
  let schema = Yup.object().shape({
    name: Yup.string().min(3, "الإسم لا يقل عن 3 أحرف"),
    email: Yup.string().min(10, "يجب أن يزيد عن 10 أحرف"),
    age: Yup.number()
      .positive("يجب أن يكون العمر أكبر من الصفر")
      .integer("يجب أن يكون العمر عددًا صحيحًا")
      .min(18, "يجب أن يكون العمر 18 عامًا أو أكبر"),
      phoneNumber: Yup.string().min(10, "يجب أن تكون أكثر من 10 أرقام"),
    address: Yup.string().min(3, "يجب أن تدخل عنوانا مناسباً"),
    region: Yup.string(),
  });
// console.log(image);
const updatePatientProfile = async () => {
  try {
    const user = await AsyncStorage.getItem('data');
    console.log(user , "ewrtwertwrtwrtw")
    if (user !== null) {
      const Id = JSON.parse(user)._id;
      console.log(Id, "id patient");
      return Id;
    } else {
      // Value does not exist, handle accordingly
      console.log('User ID not found in AsyncStorage');
      return null;
    }
  } catch (error) {
    // Error retrieving data
    console.error(error);
    return null;
  }
};

const handleSubmit = async (values,{ resetForm, }) => {
  try {
     console.log(image)
    const form = new FormData();
    form.append('name', values.name);
    form.append('email', values.email);
    form.append('age', values.age);
    form.append('phoneNumber', values.phoneNumber);
    form.append('address', values.address);
    form.append('region', values.region);
    if (image) {
      form.append('profile', {
        uri: image,
        type: 'image/jpeg',
        name: 'profile_image.jpeg',
      });
    }
    let config={
      headers: {
      'Content-Type': 'multipart/form-data',
    }}
    const patientId = await updatePatientProfile();
    if (patientId) {
      const response = await axios.put(`http://${IP}:3500/patient/editPatientProf/${patientId}`, form ,config)
      console.log(response)
      dispatch(getPatient());

      if(response.data.success== true){
        navigation.goBack();
      }
     } else {
      console.log('Patient ID not found');
    }
  } catch (error) {
    console.error(error)
  }
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });
 
};

    return (
      <View style={styles.container}>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: patient.name,
            email: patient.email,
            age: patient.age,
            phoneNumber: patient.phoneNumber,
            address: patient.address,
            region: patient.region,
            profile: patient.profile
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <ScrollView>
                <View style={styles.profile}>
                  <Avatar.Image source={{ uri: image }} size={120} />
                  <Button style={{marginTop:12,}} mode="outlined" onPress={() => pickImage()}>
                    تغيير الصورة الشخصية
                  </Button>
                </View>
                <Text
                  style={{ color: "#05375a", fontSize: 18, fontWeight: "600" }}
                >
                  الاسم
                </Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="اسم المريض"
                    placeholderTextColor="#666666"
                    value={props.values.name}
                    onChangeText={props.handleChange("name")}
                    style={styles.input}
                    onBlur={props.handleBlur("name")}
                  />
                  <FontAwesome
                    name="user-circle"
                    style={{ color: "#05375a" }}
                    size={20}
                  />
                </View>
                {props.errors.name && props.touched.name ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{props.errors.name}</Text>
                  </Animatable.View>
                ) : null}
                <Text style={[styles.text_footer]}>الإيميل</Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="أدخل الإيميل الخاص"
                    placeholderTextColor="#666666"
                    value={props.values.email}
                    onChangeText={props.handleChange("email")}
                    style={styles.input}
                    onBlur={props.handleBlur("email")}
                  />
                  <FontAwesome
                    name="envelope"
                    style={{ color: "#05375a" }}
                    size={20}
                  />
                </View>
                {props.errors.email && props.touched.email ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{props.errors.email}</Text>
                  </Animatable.View>
                ) : null}
  
                <Text style={[styles.text_footer]}>العمر</Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="أدخل العمر"
                    placeholderTextColor="#666666"
                    value={props.values.age}
                    onChangeText={props.handleChange("age")}
                    style={styles.input}
                    onBlur={props.handleBlur("age")}
                  />
                  <FontAwesome
                    name="child"
                    style={{ color: "#05375a" }}
                    size={20}
                  />
                </View>
                {props.errors.age && props.touched.age ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{props.errors.age}</Text>
                  </Animatable.View>
                ) : null}
  
                <Text style={[styles.text_footer]}>الهاتف</Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="أدخل رقم الهاتف"
                    placeholderTextColor="#666666"
                    value={props.values.phoneNumber}
                    onChangeText={props.handleChange("phoneNumber")}
                    style={styles.input}
                    onBlur={props.handleBlur("phoneNumber")}
                  />
                  <FontAwesome
                    name="phone-square-alt"
                    style={{ color: "#05375a" }}
                    size={20}
                  />
                </View>
                {props.errors.phoneNumber && props.touched.phoneNumber ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{props.errors.phoneNumber}</Text>
                  </Animatable.View>
                ) : null}
  
                <Text style={[styles.text_footer]}>العنوان</Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="أدخل العنوان بالتفصيل"
                    placeholderTextColor="#666666"
                    value={props.values.address}
                    onChangeText={props.handleChange("address")}
                    style={styles.input}
                    onBlur={props.handleBlur("address")}
                  />
                  <FontAwesome
                    name="address-card"
                    style={{ color: "#05375a" }}
                    size={20}
                  />
                </View>
                {props.errors.address && props.touched.address ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{props.errors.address}</Text>
                  </Animatable.View>
                ) : null}
  
                <Text style={[styles.text_footer]}>المنطقه</Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="أدخل المنطقه بالتفصيل"
                    placeholderTextColor="#666666"
                    value={props.values.region}
                    onChangeText={props.handleChange("region")}
                    style={styles.input}
                    onBlur={props.handleBlur("region")}
                  />
                  <FontAwesome
                    name="city"
                    style={{ color: "#05375a" }}
                    size={20}
                  />
                </View>
                {props.errors.region && props.touched.region ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{props.errors.region}</Text>
                  </Animatable.View>
                ) : null}
  
                <View>
                  <Button style={styles.button} mode="contained" onPress={props.handleSubmit}>
                    حفظ التعديلات
                  </Button>

                  {/* <TouchableOpacity onPress={() => {
           
        }}>
                  <Text style={styles.button} mode="contained"  >
                  
                    حفظ التعديلات
                  </Text>
        </TouchableOpacity> */}
                </View>
              </ScrollView>
            </Animatable.View>
          )}
        </Formik>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#041858",
    },
    profile: {
      alignItems: "center",
      marginBottom: 20,
    },
    footer: {
      flex: 3,
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_footer: {
      color: "#05375a",
      fontSize: 18,
      fontWeight: "600",
      marginTop: 35,
    },
    action: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      paddingBottom: 5,
    },
    input: {
      flex: 1,
      marginTop: -5,
      paddingLeft: 10,
      color: "#05375a",
      fontSize: 15,
      textAlign: "right",
    },
    button: {
      // width: "80%",
      // height: 50,
      // justifyContent: "center",
      // alignItems: "center",
      // borderRadius: 10,
      backgroundColor: "#041858",
      // borderWidth: 1,
      marginTop: 50,
      alignSlf: "center",
    },
    textButton: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
    errorMsg: {
      color: "#FF0000",
      fontSize: 12,
    },
  });
  
  export default EditProfileScreen;