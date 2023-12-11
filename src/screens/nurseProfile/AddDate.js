import { Formik } from 'formik';
import {Text, View, TouchableOpacity ,Alert, ScrollView } from 'react-native';
import * as Yup from 'yup';
import axios from "axios";
import Swal from 'sweetalert2'
import { Picker } from '@react-native-picker/picker';
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements';
import {IP} from '../Theme'
import { getNurse } from "../../../Redux/Slices/NurseProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// import { ScrollView } from 'react-native-gesture-handler';
const schema = Yup.object().shape({
    available: Yup.object({
        day: Yup.string().required("من فضلك حدد اليوم"),
        times: Yup.array().required("من فضلك حدد المواعيد")
    }).required()
});

const AddDates = ({route,navigation}) => {
    const { nurseProfileData } = route.params;
    // console.log(nurseProfileData)
    const dispatch = useDispatch();
    const nurse = useSelector((state) => state.nurseProfileSlice);
  let myData = nurse.nurseProfile
  // console.log(myData,'dataaaaaaaaaaaaa')
    useEffect(() => {
        dispatch(getNurse());
      }, [dispatch]);
    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                available: {
                    day: '',
                    times: [],
                }
            }}
            onSubmit={(values, { resetForm }) => {
                console.log(values)

                axios.put(
                    `http://${IP}:3500/nurse/editDates?patientId=${myData._id}`,
                    {
                        available: values.available,
                    }
                )
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
            }}
        >
            {(formik) => (
                <ScrollView>
                <View style={{ marginTop: 20 }}>

                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>أضف المواعيد</Text>
                    </View>

                    <View style={{ writingDirection: "rtl" }}>
                        <Picker
                            selectedValue={formik.values.available.day}
                            onValueChange={formik.handleChange('available.day')}
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

                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
                    <View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("1 am - 2 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("1 am - 2 am")
          ? formik.values.available.times.filter(
              (time) => time !== "1 am - 2 am"
            )
          : [...formik.values.available.times, "1 am - 2 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>1 am - 2 am</Text>
</View>

<View style={{ width: '50%', flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes('2 am - 3 am')}
    onPress={() => {
      const times = formik.values.available.times;
      formik.setFieldValue(
        'available.times',
        formik.values.available.times.includes('2 am - 3 am')
          ? times.filter((time) => time !== '2 am - 3 am')
          : [...times, '2 am - 3 am']
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>2 am - 3 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("3 am - 4 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("3 am - 4 am")
          ? formik.values.available.times.filter(
              (time) => time !== "3 am - 4 am"
            )
          : [...formik.values.available.times, "3 am - 4 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>3 am - 4 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("4 am - 5 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("4 am - 5 am")
          ? formik.values.available.times.filter(
              (time) => time !== "4 am - 5 am"
            )
          : [...formik.values.available.times, "4 am - 5 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>4 am - 5 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("5 am - 6 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("5 am - 6 am")
          ? formik.values.available.times.filter(
              (time) => time !== "5 am - 6 am"
            )
          : [...formik.values.available.times, "5 am - 6 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>5 am - 6 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("6 am - 7 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("6 am - 7 am")
          ? formik.values.available.times.filter(
              (time) => time !== "6 am - 7 am"
            )
          : [...formik.values.available.times, "6 am - 7 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>6 am - 7 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("7 am - 8 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("7 am - 8 am")
          ? formik.values.available.times.filter(
              (time) => time !== "7 am - 8 am"
            )
          : [...formik.values.available.times, "7 am - 8 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>7am - 8 am</Text>
</View>
<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("8 am - 9 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("8am - 9am")
          ? formik.values.available.times.filter(
              (time) => time !== "8 am - 9am"
            )
          : [...formik.values.available.times, "8 am - 9 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>8 am - 9 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("9 am - 10am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("9 am - 10am")
          ? formik.values.available.times.filter(
              (time) => time !== "9 am - 10am"
            )
          : [...formik.values.available.times, "9 am - 10am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>9 am - 10 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("10 am - 11 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("10 am - 11 am")
          ? formik.values.available.times.filter(
              (time) => time !== "10am - 11am"
            )
          : [...formik.values.available.times, "10 am - 11 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>10 am - 11 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("11 am - 12 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("11 am - 12 am")
          ? formik.values.available.times.filter(
              (time) => time !== "11am - 12 am"
            )
          : [...formik.values.available.times, "11 am - 12 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>11 am - 12 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("12 pm - 1 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("12 pm - 1 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "12 pm - 1 pm"
            )
          : [...formik.values.available.times, "12 pm - 1 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>12 pm - 1 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("1 pm - 2 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("1 pm - 2 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "1 pm - 2 pm"
            )
          : [...formik.values.available.times, "1 pm - 2 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>1 pm - 2 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("2 pm - 3 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("2 pm - 3 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "2 pm - 3 pm"
            )
          : [...formik.values.available.times, "2 pm - 3 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>2 pm - 3 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("3 pm - 4 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("3 pm - 4 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "3 pm - 4 pm"
            )
          : [...formik.values.available.times, "3 pm - 4 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>3 pm - 4 pm</Text>
</View>
<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("4 pm - 5 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("4 pm - 5 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "4 pm - 5 pm"
            )
          : [...formik.values.available.times, "4 pm - 5 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>4 pm - 5 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("5 pm - 6 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("5 pm - 6 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "5 pm - 6 pm"
            )
          : [...formik.values.available.times, "5 pm - 6 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>5 pm - 6 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("6 pm - 7 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("6 pm - 7 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "6 pm - 7 pm"
            )
          : [...formik.values.available.times, "6 pm - 7 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>6 pm - 7 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("7 pm - 8 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("7 pm - 8 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "7 pm - 8 pm"
            )
          : [...formik.values.available.times, "7 pm - 8 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>6 am - 7 am</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("8 pm - 9 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("8 pm - 9 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "8 pm - 9 pm"
            )
          : [...formik.values.available.times, "8 pm - 9 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>8 pm - 9 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("9 pm - 10 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("9 pm - 10 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "9 pm - 10 pm"
            )
          : [...formik.values.available.times, "9 pm - 10 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>9 pm - 10 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("10 pm - 11 pm")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("10 pm - 11 pm")
          ? formik.values.available.times.filter(
              (time) => time !== "10 pm - 11 pm"
            )
          : [...formik.values.available.times,"10 pm - 11 pm"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>10 pm - 11 pm</Text>
</View>

<View style={{ width: "50%", flexDirection: 'row', marginBottom: 10 }}>
  <CheckBox
    checked={formik.values.available.times.includes("11 pm - 12 am")}
    onPress={() => {
      formik.setFieldValue(
        "available.times",
        formik.values.available.times.includes("11 pm - 12 am")
          ? formik.values.available.times.filter(
              (time) => time !== "11 pm - 12 am"
            )
          : [...formik.values.available.times, "11 pm - 12 am"]
      );
    }}
  />
  <Text style={{ marginLeft: 10 }}>11 pm - 12 am</Text>
</View>

                    </View>

                    {formik.errors.available && formik.errors.available.day && formik.errors.available.times && <Text>fsudhikld</Text>}

                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 10 }} >
                        <TouchableOpacity
                            style={{ backgroundColor: "white", color: "#041858", borderColor: '#041858', borderWidth: 1, padding: 10, marginTop: 20, width: 100, alignItems: 'center' }}
                            onPress={() => {
                                formik.resetForm();
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }} >إلغاء</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ backgroundColor: "#00A02B", color: "white", borderColor: '#00A02B', borderWidth: 1, padding: 10, marginTop: 20, width: 100, alignItems: 'center' }}
                            onPress={formik.handleSubmit}
                        >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }} >حفظ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            )}
        </Formik>
    )
};

export default AddDates;