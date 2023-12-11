import React from "react";
                    
import { View, Text, TextInput, Button ,Alert, ScrollView} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { IP } from "../Theme";
import { getNurse } from "../../../Redux/Slices/NurseProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
 
const AddEducation = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const nurse = useSelector((state) => state.nurseProfileSlice);
  let myData = nurse.nurseProfile
  console.log(myData,'dataaaaaaaaaaaaa')
    useEffect(() => {
        dispatch(getNurse());
      }, [dispatch]);

    return (
    
        <ScrollView>
        <View style={{ padding: 10 }}>
            <Formik
                initialValues={{
                    education: {
                        degree: "",
                        school: "",
                        fieldOfStudy: "",
                        toDate: "",
                        description: "",
                    },
                }}
                onSubmit={(values, { setSubmitting }) => {
                    if( myData) {
                        let id = myData._id
                         axios.post(`http://${IP}:3500/nurse/addEducationAndExperience/${myData._id}`, {
                          education: values.education,
                        })
                        .then((response) => {
                            dispatch(getNurse());
                             console.log(response.data);
                          Alert.alert(
                            "تمت  الاضافة بنجاح",
                            "   شكرا لك ",
                            [{ text: "حسنا", onPress: () => navigation.goBack() }]
                          );
                            console.log(response.data);
                          })
                          .catch((error) => {
                            console.log(error);
                          })
                          .finally(() => {
                            setSubmitting(false);
                          });
                      } else {
                        console.log('errorerrrrrrrrrrrrrrrrr')
                        // handle the case when nurseProfileData or its _id is undefined
                        // maybe show an error message or a loading indicator
                      }
                      
                    }}
                  
                  
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    
                    <View>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>أضف تعليماً</Text>
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>الدرجة</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="بكالوريوس / ماجيستير"
                                autoFocus
                                onChangeText={handleChange("education.degree")}
                                onBlur={handleBlur("education.degree")}
                                value={values.education.degree}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>اسم الجامعة</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="اسم الجامعة"
                                onChangeText={handleChange("education.school")}
                                onBlur={handleBlur("education.school")}
                                value={values.education.school}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>التخصص</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="التخصص"
                                onChangeText={handleChange("education.fieldOfStudy")}
                                onBlur={handleBlur("education.fieldOfStudy")}
                                value={values.education.fieldOfStudy}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>عام الحصول على المؤهل</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="عام الحصول على المؤهل"
                                onChangeText={handleChange("education.toDate")}
                                onBlur={handleBlur("education.toDate")}
                                value={values.education.toDate}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>نبذة عن الدراسة</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="نبذة عن الدراسة"
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={handleChange("education.description")}
                                onBlur={handleBlur("education.description")}
                                value={values.education.description}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <Button
                                title="إلغاء"
                                onPress={() => { }}
                                color="#041858"
                            />

                            <Button
                                title="حفظ"
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                                color="#00A02B"
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
        </ScrollView>

    );
};

export default AddEducation