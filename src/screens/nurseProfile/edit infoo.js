import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { updateNurseInfo, getNurse } from '../../../Redux/Slices/NurseProfileSlice';
import { IP } from '../Theme';

function EditInfo({ navigation }) {
  const nurse = useSelector((state) => state.nurseProfileSlice);
  console.log('nurseeeeeeeeeeeee', nurse);

  const [image, setImage] = useState(nurse.nurseProfile?.profile);
  // const url = `http://${IP}:3500/`;
  const dispatch = useDispatch();
  const updatePatientProfile = async () => {
    try {
      const user = await AsyncStorage.getItem('data');
      console.log(user , "ewrtw")
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
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        console.log('Permission not granted');
      }
    })();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('tesstttttttttttttttttt')
    try {
      console.log(values);

      let form = new FormData();
      form.append('name', values.name);
      form.append('phoneNumber', values.phoneNumber);
      form.append('region', values.region);
      form.append('address', values.address);
      form.append('about', values.about);
      form.append('skills', values.skills);
      form.append('shiftPrice', values.shiftPrice);
      form.append('experienceYears', values.experienceYears);

      if (image) {
        form.append('profile', {
          uri: image,
          type: 'image/jpeg',
          name: 'profile_image.jpeg',
        });
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const patientId = nurse._id
      // const patientId = await updatePatientProfile();

      if (patientId) {
        const id = patientId

        const response = await axios.put(`http://${IP}:3500/nurse/editNurseProfNative/${id}`,form, config);
        console.log(response);

        if (response.data.success === true) {
          navigation.goBack();
        }
      } else {
        console.log('Patient ID not found');
      }

      // dispatch(updateNurseInfo(form, config))
      // .then(() => {
      //   dispatch(getNurse());
      //   setSubmitting(false);
      //   // Show alert
      //   alert("تم التحديث بنجاح");
      //   // Navigate back
      //   navigation.goBack();
      // })
      // .catch((error) => {
      //   console.log(error);
      //   setSubmitting(false);
      // });


    } catch (error) {
      console.error(error);
    }
    
  };

  const formik = useFormik({
    initialValues: {
      profile: nurse.nurseProfile?.profile || '',
      name: nurse.nurseProfile?.name || '',
      phoneNumber: nurse.nurseProfile?.phoneNumber || '',
      region: nurse.nurseProfile?.region || '',
      about: nurse.nurseProfile?.about || '',
      skills: nurse.nurseProfile?.skills || '',
      shiftPrice: nurse.nurseProfile?.shiftPrice || '',
      experienceYears: nurse.nurseProfile?.experienceYears || '',
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      phoneNumber: Yup.string(),
      region: Yup.string(),
      about: Yup.string(),
      skills: Yup.string(),
      shiftPrice: Yup.number().positive().integer(),
      experienceYears: Yup.number().positive().integer(),
    }),
    onSubmit: handleSubmit,
  });

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const styles = {
    profile: {
      // Add your styles for the profile container here
    },
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', marginVertical: 15 }}>
            تعديل الملف الشخصي
          </Text>
          <View style={{ alignItems: 'center' }}>
            <View style={{ marginBottom: 50 }}>
              <View style={styles.profile}>
                <Avatar.Image source={{ uri: `http://${IP}:3500/${image}` }} size={120} />
                <TouchableOpacity style={{ marginTop: 12 }} onPress={pickImage}>
                  <Text>تغيير الصورة الشخصية</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              style={{ display: 'none' }}
              value={formik.values.profile}
              onChangeText={formik.handleChange('profile')}
            />
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>الاسم</Text>
          <TextInput
            defaultValue={formik.values.name}
            onChangeText={formik.handleChange('name')}
            placeholder="الاسم"
            style={{ textAlign: 'right', borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
        </View>
        {formik.touched.name && formik.errors.name && (
          <Text style={{ color: 'red' }}>{formik.errors.name}</Text>
        )}

        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>رقم الهاتف</Text>
          <TextInput
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            placeholder="رقم الهاتف"
            style={{ textAlign: 'right', borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <Text style={{ color: 'red', marginBottom: 5 }}>{formik.errors.phoneNumber}</Text>
          ) : null}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>المنطقة</Text>
          <TextInput
            value={formik.values.region}
            onChangeText={formik.handleChange('region')}
            placeholder="المنطقة"
            style={{ textAlign: 'right', borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
          {formik.touched.region && formik.errors.region ? (
            <Text style={{ color: 'red', marginBottom: 5 }}>{formik.errors.region}</Text>
          ) : null}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>نبذة عني</Text>
          <TextInput
            value={formik.values.about}
            onChangeText={formik.handleChange('about')}
            placeholder="نبذة عني"
            multiline={true}
            numberOfLines={4}
            style={{ textAlign: 'right', borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
          {formik.touched.about && formik.errors.about ? (
            <Text style={{ color: 'red', marginBottom: 5 }}>{formik.errors.about}</Text>
          ) : null}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>المهارات</Text>
          <TextInput
            value={formik.values.skills}
            onChangeText={formik.handleChange('skills')}
            placeholder="المهارات"
            multiline={true}
            numberOfLines={4}
            style={{ textAlign: 'right', borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
          {formik.touched.skills && formik.errors.skills ? (
            <Text style={{ color: 'red', marginBottom: 5 }}>{formik.errors.skills}</Text>
          ) : null}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>سعر الوردية</Text>
          <TextInput
            value={formik.values.shiftPrice}
            onChangeText={formik.handleChange('shiftPrice')}
            placeholder="سعر الوردية"
            style={{ textAlign: 'right', borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
          {formik.touched.shiftPrice && formik.errors.shiftPrice ? (
            <Text style={{ color: 'red', marginBottom: 5 }}>{formik.errors.shiftPrice}</Text>
          ) : null}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>سنوات الخبرة</Text>
          <TextInput
            value={formik.values.experienceYears}
            onChangeText={formik.handleChange('experienceYears')}
            placeholder="سنوات الخبرة"
            style={{ textAlign: 'right', borderWidth: 1, borderColor: '#ccc', padding: 10 }}
          />
          {formik.touched.experienceYears && formik.errors.experienceYears ? (
            <Text style={{ color: 'red', marginBottom: 5 }}>{formik.errors.experienceYears}</Text>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#041858',
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 4,
            }}
            onPress={() => {
              // handle cancel action
            }}
          >
            <Text style={{ color: 'white' }}>إلغاء</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#00A02B',
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderRadius: 4,
            }}
            onPress={formik.handleSubmit}
            // disabled={isSubmitting}
          >
            <Text style={{ color: 'white' }}>حفظ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default EditInfo;
