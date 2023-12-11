import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { IP } from "../Theme";
import { ScrollView } from "react-native-gesture-handler";
import { getNurse } from "../../../Redux/Slices/NurseProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AddExperience = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const nurse = useSelector((state) => state.nurseProfileSlice);
  let myData = nurse.nurseProfile
  // console.log(myData,'dataaaaaaaaaaaaa')
    useEffect(() => {
        dispatch(getNurse());
      }, [dispatch]);
    
  // const nurseProfileData = route.params?.nurseProfileData;
  // console.log(nurseProfileData,'nurseProfileData')

  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{
          experience: {
            title: "",
            employmentType: "",
            company: "",
            location: "",
            fromDate: "",
            toDate: "",
            description: "",
          },
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          if (myData) {

            axios
              .post(
                `http://${IP}:3500/nurse/addEducationAndExperience/${myData._id}`,
                {
                  experience: values.experience,
                }
              )
              .then((response) => {
                dispatch(getNurse());
                navigation.goBack()
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
          setSubmitting,
        }) => (
          <ScrollView>
            <View>
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  أضف خبراتك
                </Text>
              </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>المسمي الوظيفي</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="اخصائي تمريض قسم الاطفال"
                                name="experience.title"
                                value={values.experience.title}
                                onChangeText={handleChange("experience.title")}
                                onBlur={handleBlur("experience.title")}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>نوع العمل</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="دوام كلي او جزئي"
                                name="experience.employmentType"
                                value={values.experience.employmentType}
                                onChangeText={handleChange("experience.employmentType")}
                                onBlur={handleBlur("experience.employmentType")}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>اسم المستشفي</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="مستشفي أسوان الجامعي"
                                name="experience.company"
                                value={values.experience.company}
                                onChangeText={handleChange("experience.company")}
                                onBlur={handleBlur("experience.company")}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>الموقع</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="أسوان"
                                name="experience.location"
                                value={values.experience.location}
                                onChangeText={handleChange("experience.location")}
                                onBlur={handleBlur("experience.location")}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>بداية العمل</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="مايو 2021"
                                name="experience.fromDate"
                                value={values.experience.fromDate}
                                onChangeText={handleChange("experience.fromDate")}
                                onBlur={handleBlur("experience.fromDate")}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>نهاية العمل</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10 }}
                                placeholder="الان او يونيو 2023"
                                name="experience.toDate"
                                value={values.experience.toDate}
                                onChangeText={handleChange("experience.toDate")}
                                onBlur={handleBlur("experience.toDate")}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={{ marginBottom: 5, fontSize: 16, fontWeight: 'bold' }}>نبذة عن دورك الوظيفي</Text>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, height: 100 }}
                                placeholder="نبذة عن دورك الوظيفي"
                                name="experience.description"
                                value={values.experience.description}
                                onChangeText={handleChange("experience.description")}
                                onBlur={handleBlur("experience.description")}
                                multiline={true}
                            />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <Button
                  title="حفظ"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />
                <Button
                  title="إلغاء"
                  onPress={() => {
                    // reset form values
                    setSubmitting(false);
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

export default AddExperience;