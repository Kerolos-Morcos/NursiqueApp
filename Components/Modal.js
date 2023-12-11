import React, { useState , useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FAB } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { IP } from  '../src/screens/Theme'
// import PostsScreen from '../src/screens/PostsScreen'
import { Navigation } from 'react-native-feather'
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Please enter a valid input value.'),
  content: Yup.string().required('Please enter a valid input value.'),
})

const FloatingButton = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)
  const [contentt, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [patientData, setPatientData] = useState(null);

  const handleButtonClick = () => {
    setModalVisible(true)
  }
  
  const handleModalClose = () => {
    setModalVisible(false)
  }
  
  const handleSave = async (values) => {
    try {
      console.log(patientData.token);
      console.log("first");
      navigation.navigate('PostsScreen', { contentt });

      if (!patientData) {
        console.log('User is not authenticated');
        return;
      }
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${patientData.token}`;
      let patientId = patientData._id;
      const response = await axios.post(`http://${IP}:3500/Post/addPost/${patientId}`, values);
      await setPosts([response.data.data, ...posts]);
      setContent(`${values.title}: ${values.content}`);
      console.log('API response:', response.data);
    } 
    catch (error) {
      console.error('API error:', error);

      if (error.response) {
        console.error('API response error:', error.response.data);
        console.error('API response status:', error.response.status);
      } else if (error.request) {
        console.error('API request error:', error.request);
      } else {
        console.error('API setup error:', error.message);
      }
    }
  };
  
  useEffect(() => {
    const fetchPatientData = async () => {
      const tokenString = await AsyncStorage.getItem('data');
      const patientData = JSON.parse(tokenString);
      setPatientData(patientData);
    };

    fetchPatientData();
  }, []);

  
      
      return (
        <View>
      <FAB
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: '#041585',
          zIndex: 1,
        }}
        color="white"
        icon="plus"
        onPress={handleButtonClick}
        />

      <Modal
        visible={modalVisible}
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={handleModalClose}
        >
        <View style={styles.modal}>
          <Formik
            initialValues={{ 
              title: '',
              content: '',
              patientName: patientData?.name,
              patientImg: patientData?.profile,
              patientLocation: patientData?.region,
              }}
            validationSchema={validationSchema}
            onSubmit={(values)=> handleSave(values,navigation)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>طلب خدمة</Text>
                <TextInput
                  style={styles.modalInput}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholder="عنوان الطلب"
                  />
                {touched.title && errors.title && (
                  <Text style={styles.title}>{errors.title}</Text>
                )}
                <TextInput
                  style={{
                    height: 100,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginBottom: 10,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                  onChangeText={handleChange('content')}
                  onBlur={handleBlur('content')}
                  value={values.content}
                  multiline={true}
                  placeholder="محتوى الطلب" />
                {touched.content && errors.content && (
                  <Text style={styles.errorText}>{errors.content}</Text>
                )}
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSubmit}>     
                  <Text style={styles.modalButtonText}>إرسال</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleModalClose}
                >
                  <Text style={styles.modalButtonText}>إلغاء</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // height: 400,
    width: 400,
    // padding: 20,
    marginLeft: -20,
  },
  modalContent: {
    width: '80%',
    height: 450,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: '#041585',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
})

export default FloatingButton

// const FloatingButton = () => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [content, setContent] = useState('');

//   const handleSave = async (values) => {
//     try {
//       // ... existing code ...

//       navigation.navigate('PostsScreen', { content });

//     } catch (error) {
//       console.error('API error:', error);

//       if (error.response) {
//         // ... existing error handling code ...
//       } else if (error.request) {
//         // ... existing error handling code ...
//       } else {
//         // ... existing error handling code ...
//       }
//       // Handle the error here
//     }
//   }

//   // Rest of the component code...
// }