import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
// import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Icon from "react-native-vector-icons/FontAwesome5";
import { DataTable, Button as PaperButton } from "react-native-paper";
import { useLayoutEffect, useState } from "react";
import { getNurse } from "../../../Redux/Slices/NurseProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import NurseRate from "./NurseRate";
import { IP } from "../Theme";
import io from 'socket.io-client';
// import { PaperButton, DataTable } from 'react-native-paper';
import Iconbar from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NurseProfile = ({ navigation }) => {

    const [nurseProfileData, setNurseProfileData] = useState(null);
    const dispatch = useDispatch();
    const nurse = useSelector((state) => state.nurseProfileSlice);
  let myData = nurse.nurseProfile
    useEffect(() => {
      dispatch(getNurse());
    }, [dispatch]);
  
    useEffect(() => {
      if (nurse.nurseProfile) {
        setNurseProfileData(nurse.nurseProfile);
      }
    }, [nurse.nurseProfile]);
  
    async function logout() {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('data');
        navigation.navigate('Signin');
      } catch (error) {
        console.error('Error removing items from AsyncStorage:', error);
        // Handle the error gracefully, such as showing an error message to the user
      }
    }

    const [showDetails1, setShowDetails1] = useState(false);
    const [showDetails2, setShowDetails2] = useState(false);
    const [showDetails3, setShowDetails3] = useState(false);
    const [showDetails4, setShowDetails4] = useState(false);
    const [showDetails5, setShowDetails5] = useState(false);
  // chat 
  const API_URL = `http://${IP}:3500`;
  const Socket = io(API_URL);
  
  const data=nurse.nurseProfile;
  const joinRoom = (id) => {
    // if (username !== "" && id !== "") {
    Socket?.emit("join_room", id);
    // }
  };
    return (
        <ScrollView>

        <View style={styles.container}>
            {nurseProfileData && (
                <View style={styles.header} >
                  
                    <View style={styles.imageContainer} >
                        <Image
                            source={{ uri: `http://${IP}:3500/${nurseProfileData.profile}` }}
                            resizeMode="contain" style={styles.nurseImage} />
                            <TouchableOpacity onPress={() => navigation.navigate('NurseNotification')}>
        <Iconbar name="bell-outline" size={30} color="white" style={{ marginRight: -250 , marginTop:-100 }} />
      </TouchableOpacity>
                        {/* <View style={styles.imageIconContainer} > */}
                            {/* <AddAPhotoIcon style={styles.imageIcon} /> */}
                        {/* </View> */}
                    </View>
                    <View style={styles.headerText} >
                        <Text style={styles.nurseName} > {nurseProfileData.name}</Text>
                        {/* <View style={styles.salaryBox}>
                            {nurseProfileData.TotalBalance ? (
                                <Text style={styles.nurseBalance} >{nurseProfileData.TotalBalance}</Text>
                            ) :
                                <Text style={styles.nurseBalance} >$0</Text>
                            }
                            <Text style={styles.nurseBalance} >الرصيد</Text>
                        </View> */}
                        <View style={styles.nurseRate} >
                            <NurseRate rate={nurseProfileData.rates} />
                        
                        </View>
                    </View>
                </View>
            )}


            <View style={styles.body} >

                {/* <View style={{ marginBottom: 20 }}> */}
                    {/* <TouchableOpacity
                        mode="contained"
                        onPress={() => setShowDetails1(!showDetails1)}
                        style={styles.buttonPaper}
                    >

                        <View style={styles.buttonData} >
                            <Icon name='user-clock' size={25} style={styles.Icon1} />
                            <Text style={styles.buttonTitle} >المواعيد المحجوزة</Text>
                        </View>
                    </TouchableOpacity> */}

{/* 
                    {showDetails1 && (
                        <DataTable >
                            <DataTable.Header style={styles.tableTitels} >
                                <DataTable.Title style={styles.titleData}>
                                    اسم المريض
                                </DataTable.Title>
                                <DataTable.Title style={styles.titleData}>
                                    اليوم
                                </DataTable.Title>
                                <DataTable.Title style={styles.titleData}>
                                    الموعد
                                </DataTable.Title>
                                <DataTable.Title style={styles.titleData}>
                                    هاتف المريض
                                </DataTable.Title>
                            </DataTable.Header> */}

                            {/* {nurseProfileData.booking ? ( */}
                            {/* {nurseProfileData.booking.map(() => { */}
                                {/* return */}
                                {/* <DataTable.Row style={styles.tableData} >
                                    <DataTable.Cell >
                                        01144778899
                                    </DataTable.Cell>
                                    <DataTable.Cell >
                                        2 pm - 3 pm
                                    </DataTable.Cell>
                                    <DataTable.Cell >
                                        الأحد
                                    </DataTable.Cell>
                                    <DataTable.Cell >
                                        أحمد
                                    </DataTable.Cell>
                                </DataTable.Row> */}
                            {/* }) */}
                            {/* } */}
                            {/* ) :
                                <DataTable.Row style={styles.tableData} >
                                    <DataTable.Cell style={styles.NocellData} >لا توجد مواعيد</DataTable.Cell>
                                </DataTable.Row>
                             } */}
                        {/* </DataTable>
                    )}
                </View> */}

                <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
      onPress={() => setShowDetails5(!showDetails5)}
      style={[styles.buttonPaper, styles.touchableButton]}
    >
      <View style={styles.buttonData}>
        <Icon name='scroll' size={25} style={styles.Icon5} />
        <Text style={styles.buttonTitle}>معلومات الحساب</Text>
      </View>
    </TouchableOpacity>
                    {showDetails5 && (
                        <View style={styles.Profile} >

                            <View>
                                <Text style={styles.ProfileData} >الحاله</Text>
                                <Text style={styles.ProfileMetaData} >متاح</Text>
                            </View>
                            <View>
                                <Text style={styles.ProfileData} >سعر الشفت</Text>
                                {myData.shiftPrice ? (
                                    <Text style={styles.ProfileMetaData} >{myData.shiftPrice}</Text>
                                ) :
                                    <Text style={styles.ProfileMetaData} >لم يحدد السعر بعد</Text>
                                }
                            </View>
                            <View>
                                <Text style={styles.ProfileData} >رقم الهاتف</Text>
                                {myData.phoneNumber ? (
                                    <Text style={styles.ProfileMetaData} > {myData.phoneNumber}</Text>
                                ) :
                                    <Text style={styles.ProfileMetaData} >لا يوجد رقم هاتف</Text>
                                }
                            </View>
                            <View>
                                <Text style={styles.ProfileData} >العنوان</Text>
                                {myData.address ? (
                                    <Text style={styles.ProfileMetaData} >{myData.address}</Text>
                                ) :
                                    <Text style={styles.ProfileMetaData} >لا يوجد عنوان</Text>
                                }
                            </View>
                            {/* <View>
                                <Text style={styles.ProfileData} >نبذة</Text>
                                {myData ? (
                                <Text style={styles.ProfileMetaData} >نبذة</Text>
                                ):  
                                <Text style={styles.ProfileMetaData} >لا توجد نبذه</Text>
                                }
                            </View> */}
                            {/* <View>
                                <Text style={styles.ProfileData} >المهارات</Text>
                                {myData ? (
                                <Text style={styles.ProfileMetaData} >المهارات</Text>
                                ):  
                                <Text style={styles.ProfileMetaData} >لا توجد مهارات</Text>
                                }
                            </View> */}
                        </View>
                    )}
                </View>

                <View style={{ marginBottom: 20 }}>
                <TouchableOpacity
      onPress={() => setShowDetails2(!showDetails2)}
      style={[styles.buttonPaper, styles.touchableButton]}
    >
      <View style={styles.buttonData}>
        <Icon name='cogs' size={25} style={styles.Icon2} />
        <Text style={styles.buttonTitle}>تعديل البيانات والمواعيد</Text>
      </View>
    </TouchableOpacity>
                    {showDetails2 && (
                        <View style={styles.editProfile} >
                            <TouchableOpacity onPress={() => navigation.navigate("info", { myData })}>
                                <Text style={styles.editProfileData} >تعديل الملف الشخصى</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("dates", { myData })}>
                                <Text style={styles.editProfileData} >أضف مواعيدك</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("experience", { myData })}>
                                <Text style={styles.editProfileData} >أضف خبراتك</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("education", { myData })}>
                                <Text style={styles.editProfileData} >أضف تعليماً</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={{ marginBottom: 20 }}>
  <TouchableOpacity
    onPress={() => setShowDetails3(!showDetails3)}
    style={[styles.buttonPaper, styles.touchableButton]}
  >
    <View style={styles.buttonData}>
      <Icon name="certificate" size={25} style={styles.Icon3} />
      <Text style={styles.buttonTitle}>الخبرات</Text>
    </View>
  </TouchableOpacity>
  {showDetails3 && (
    <View style={styles.experience}>
      {myData.experience && myData.experience.length > 0 ? (
        myData.experience.map((item, index) => (
          <View key={index}>
            <Text style={styles.experienceData}>المهنة</Text>
            {item.title ? (
              <Text style={styles.experienceMetaData}>{item.title}</Text>
            ) : (
              <Text style={styles.experienceMetaData}>لا يوجد</Text>
            )}

            <Text style={styles.experienceData}>المكان</Text>
            {item.location ? (
              <Text style={styles.experienceMetaData}>{item.location}</Text>
            ) : (
              <Text style={styles.experienceMetaData}>لا يوجد</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.experienceData}>لا يوجد بيانات خبرات</Text>
      )}
    </View>
  )}
</View>


                <View style={{ marginBottom: 20 }}>
  <TouchableOpacity
    onPress={() => setShowDetails4(!showDetails4)}
    style={[styles.buttonPaper, styles.touchableButton]}
  >
    <View style={styles.buttonData}>
      <Icon name="book" size={25} style={styles.Icon4} />
      <Text style={styles.buttonTitle}>التعليم</Text>
    </View>
  </TouchableOpacity>
  {showDetails4 && (
    <View style={styles.education}>
      {myData.education && myData.education.length > 0 ? (
        myData.education.map((item, index) => (
          <View key={index}>
            <Text style={styles.educationData}>التخصص</Text>
            {item.field ? (
              <Text style={styles.educationMetaData}>{item.field}</Text>
            ) : (
              <Text style={styles.educationMetaData}>لا يوجد</Text>
            )}

            <Text style={styles.educationData}>الدرجة</Text>
            {item.degree ? (
              <Text style={styles.educationMetaData}>{item.degree}</Text>
            ) : (
              <Text style={styles.educationMetaData}>لا يوجد</Text>
            )}

            <Text style={styles.educationData}>الجامعة</Text>
            {item.school ? (
              <Text style={styles.educationMetaData}>{item.school}</Text>
            ) : (
              <Text style={styles.educationMetaData}>لا يوجد</Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.educationData}>لا يوجد بيانات تعليمية</Text>
      )}
    </View>
  )}
</View>
<TouchableOpacity
                  onPress={() => {
                    joinRoom(nurseProfileData._id)
                    navigation.navigate("Chat", { data });
                  }}
              style={[styles.buttonPaper, styles.touchableButton]}
            >
              <View style={styles.buttonData}>
                <Icon name='scroll' size={25} style={styles.Icon5} />
                <Text style={styles.buttonTitle}> الدردشة</Text>
              </View>
            </TouchableOpacity>
                <View style={{ marginBottom: 30 }}>
                    <TouchableOpacity
                        mode="contained"
                        onPress={logout}
                   style={styles.buttonPaper}
                    >
                        <View style={styles.buttonData} >
                            <Icon name='sign-out-alt' size={25} style={styles.Icon6} />
                            <Text style={styles.buttonTitle} >تسجيل الخروج</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
        </ScrollView>

    )
}
  


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    width: Dimensions.get("screen").width,
    height: 140,
    backgroundColor: "#041858",
    flexDirection: "row-reverse",
    // direction: "rtl",
  },
  imageContainer: {
    width: 150,
    position: "absolute",
    height: 120,
    right: 15,
   },
  nurseImage: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 60,
    top: 40,
    left: 0,
    backgroundColor: "#cccccc",
  },
  imageIconContainer: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cccccc",
    top: 125,
    left: 5,
  },
  imageIcon: {
    fontSize: 25,
    color: "white",
  },
  headerText: {
    // direction: "rtl",
    position: "absolute",
    top: 60,
    right: 175,
  },
  nurseName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  // salaryBox: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between'
  // },
  // nurseBalance: {
  //     // fontSize: 15,
  //     marginTop: 8,
  //     fontWeight: 'bold',
  //     color: 'white'
  // },
  nurseRate: {
    marginTop: 10,
    flexDirection: "row",
  },
  body: {
    marginTop: 70,
    alignItems: "center",
  },
  buttonTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginStart: 20,
    color: "#000",
    alignSelf: "center",
  },
  buttonPaper: {
    width: Dimensions.get("screen").width,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "transparent",
  },
  buttonData: {
    flexDirection: "row",
  },
  Icon1: {
    paddingHorizontal: 15,
    marginLeft: 20,
    paddingVertical: 14,
    backgroundColor: "red",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Icon2: {
    paddingHorizontal: 9,
    paddingVertical: 14,
    backgroundColor: "#F86F03",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Icon3: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "blue",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Icon4: {
    paddingHorizontal: 13,
    paddingVertical: 14,
    backgroundColor: "purple",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Icon5: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: "green",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Icon6: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: "#3C486B",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tableTitels: {
    flexDirection: "row",
  },
  NocellData: {
    marginHorizontal: 150,
  },
  editProfile: {
    paddingHorizontal: 60,
    marginTop: 15,
  },
  editProfileData: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  experience: {
    paddingHorizontal: 60,
    marginTop: 15,
  },
  experienceData: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  experienceMetaData: {
    marginEnd: 40,
    marginBottom: 20,
  },
  education: {
    paddingHorizontal: 60,
    marginTop: 15,
  },
  educationData: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  educationMetaData: {
    marginEnd: 40,
    marginBottom: 20,
  },
  Profile: {
    paddingHorizontal: 60,
  },
  ProfileData: {
    marginVertical: 12,
    fontSize: 16,
    fontWeight: "bold",
  },
  ProfileMetaData: {
    marginEnd: 40,
    marginBottom: 20,
  },
});

export default NurseProfile;