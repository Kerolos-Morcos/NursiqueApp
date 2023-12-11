import React , {useState}from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StyleSheet ,
    StatusBar,
    Alert,
    ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { IP } from  '../../src/screens/Theme'
    const validationSchema = yup.object().shape({
email: yup.string().email('Invalid email').required('Email is required'),
password: yup.string().min(6, 'Password must be at least 8 characters').required('Password is required')
    });
    
    const Signin = () => {
        const navigation=useNavigation()
        const [showPassword, setShowPassword] = useState(false);
    const handlelogin = (values) => {
      console.log(values)
        axios.post(`http://${IP}:3500/patient/login`, values)
          .then(async(response) => {
            if (response.data.success === true) {
              // User is registered, navigate to Home screen
              console.log("gttgvtftrf")
              console.log(response.data.token)
              console.log(response.data)
              const token=response.data.token
              await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
             await AsyncStorage.setItem('data', JSON.stringify(response.data.data));
              
              axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
              navigation.navigate('navbar');
            }
              else {
                console.log("errorrr")
              // User is not registered, show error message
              Alert.alert('Error', response.data.message, [{ text: 'OK' }]);
            }
          })
          .catch((error) => {
            console.log(error);
            Alert.alert('Error', 'An unexpected error occurred', [{ text: 'OK' }]);
            console.error('Error login :', error.message);
          })
        
      };
    const { colors } = useTheme();

    // const { signIn } = React.useContext(AuthContext);

    

    // const handlePasswordChange = (val, setFieldValue) => {
    //     if (val.trim().length >= 8) {
    //         setFieldValue('password', val);
    //     }
    // };

    // const updateSecureTextEntry = (data, setData) => {
    //     setData({
    //         ...data,
    //         secureTextEntry: !data.secureTextEntry
    //     });
    // };

    // const handleValidUser = (val, setFieldValue) => {
    //     if (val.trim().length >= 4) {
    //         setFieldValue('username', val);
    //     }
    // };



    return (
        <View style={styles.container}>
            <ImageBackground source={require('../images/Doctors(2).gif')} style={styles.image}>
                {/* <View style={styles.header}>
                    <Text style={styles.text_header}>مرحبا</Text>
                </View> */}
            </ImageBackground>
            <Formik
  initialValues={{ 
    username: '', 
    password: '',
    secureTextEntry: true 
  }}
  validationSchema={validationSchema}
  onSubmit={handlelogin}
>
  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
    <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
     <Text style={[styles.text_footer, { color: colors.text }]}>البريد الإلكتروني</Text>
      <View style={styles.action}>
      <FontAwesome name="envelope-o" color={colors.text} size={20} />

        <TextInput
          placeholder="ادخل البريد الإلكتروني"
          placeholderTextColor="#666666"
          style={[styles.textInput, { color: colors.text }]}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
        //   onSubmitEditing={() => { passwordInputRef.current?.focus(); }}
         
          onChangeText={(val) => handleChange('email')(val)}
          onBlur={handleBlur('email')}
          value={values.email}
        />
        {/* {values.email.trim().length >= 4 ?
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
          : null
        } */}
      </View>
      {errors.email && touched.email ?
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{errors.email}</Text>
        </Animatable.View>
        : null
      }

      <Text style={[styles.text_footer, { color: colors.text, marginTop: 35 }]}> كلمة المرور</Text>
      <View style={styles.action}>
        {/* <Feather name="lock" color={colors.text} size={20} /> */}
        <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            >
              <FontAwesome
                name={showPassword ? "eye" : "eye-slash"}
                color="grey"
                size={20}
              />
        </TouchableOpacity>
        <TextInput
          placeholder="ادخل كلمة المرور"
          secureTextEntry={!showPassword}
          placeholderTextColor="#666666"
          style={[styles.textInput, { color: colors.text }]}
          autoCapitalize="none"
          returnKeyType="done"
        //   ref={passwordInputRef}
        //   onChangeText={(val) => handleChange('password', val)}
        onChangeText={(val) => handleChange('password')(val)}
          onBlur={handleBlur('password')}
          value={values.password}
        />
      </View>
      {errors.password && touched.password ?
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{errors.password}</Text>
        </Animatable.View>
        : null
      }

      <View style={styles.button}>
        <TouchableOpacity style={[styles.signIn  ]} onPress={handleSubmit}>
          <Text style={[styles.textSign, { color: 'white' }]}>تسجيل الدخول</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={[styles.newUser]}>
          <Text style={[styles.textSign, { color: '#041858' }]}> مستخدم جديد </Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )}
</Formik>
        </View>
    );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:200,
        backgroundColor:"white"
        // backgroundColor: '#05375a'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: "#F3F2F3",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginTop:35,
        paddingTop:30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth:.3,
        borderBottomColor: '#666666',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        // marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
        fontSize:12,
        textAlign:"right",
        // display:"flex",
        // alignItems:"center"
        
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        // gap:5,
        // alignSelf:"flex-end",
        paddingLeft:13,
        paddingRight:13

    },
    signIn: {
        width: '45%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor:"#041858"
    },
    newUser:{
      width: '45%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor:"white",
      borderWidth:.7,
      borderColor:"#041858"
    },
    textSign: {
        fontSize: 15,
        fontWeight: 'bold',
        
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
          paddingTop:200,
          // paddingBottom:10,
height:320,
width:320,
marginLeft:'auto',
marginRight:'auto',
marginTop:-20,


    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 13,
    },
});