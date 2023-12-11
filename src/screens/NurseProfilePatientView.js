import React , {useState , useEffect} from "react";
import {
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import "moment/locale/ar";
import { IconButton } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { IP } from "./Theme";
import io from "socket.io-client";
import Iconbar from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
moment.locale("ar");
const NurseProfilePatientView = ({
  navigation,
  Name,
  image,
  specialty,
  rating,
  location,
  availability,
  route
}) => {
  const API_URL = `http://${IP}:3500`;
  const Socket = io(API_URL);

  const joinRoom = (id) => {
    // if (username !== "" && id !== "") {
    Socket?.emit("join_room", id);
    // }
  };
  // const data = navigation.getParam('data');
  const { data } = route.params;
  console.log(data);
  const stars = [];

  
  // Add a full star for each whole number in the rating
  for (let i = 1; i <= Math.floor(data.rates); i++) {
    stars.push(<Icon key={i} name="star" size={16} color="#f90" />);
  }

  // Add a half star if the rating has a fractional part between 0.25 and 0.75
  const remainder = data.rates - Math.floor(data.rates);
  if (remainder >= 0.25 && remainder <= 0.75) {
    stars.push(
      <Icon key={stars.length + 1} name="star-half" size={16} color="#f90" />
    );
  }
  const [patientData, setPatientData] = useState(null);
  let myData = null;

  useEffect(() => {
    const getPatientData = async () => {
      const patient = await AsyncStorage.getItem('data');
      if (patient) {
        const datapatient = JSON.parse(patient);
        setPatientData(datapatient);
      }
    };
    getPatientData();
  }, []);

  if (patientData) {
    myData = patientData;
  }
  
  console.log(myData , "my data")
  return (
    <ScrollView
      style={{
        backgroundColor: "#041858",
      }}
    >
      {/* <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBack}>
          <IconButton style={styles.appBarText} icon="arrow-left"  color={'#fff'} size={28} />
        </TouchableOpacity>
        <Text >
          {data.name}
          </Text>
      </View> */}
      <ImageBackground
        source={{
          uri: "https://th.bing.com/th/id/OIP.Pmi8uZKvflHRWBjDddRz6QHaEo?w=266&h=180&c=7&r=0&o=5&pid=1.7",
        }}
        style={{
          height: 0.45 * h,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginTop: 60,
            alignItems: "center",
          }}
        ></View>
        <LinearGradient
          colors={["#041858", "transparent"]}
          style={{
            transform: [{ rotate: "180deg" }],
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            height: 0.16 * h,
          }}
        >
          <Text
            style={{
              transform: [{ rotate: "-180deg" }],
              color: "#FFF",
              fontSize: 35,
              marginVertical: 6,
              alignSelf: "center",
            }}
          >
            {data.name}
          </Text>
          <View style={styles.ratingContainer}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {stars}
              <Text style={styles.rating}></Text>
            </View>
          </View>

          <Image
  source={{ uri: `http://${IP}:3500/${data.profile}` }}
  style={{
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    transform: [{ rotate: '-180deg' }],
  }}
/>

          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          ></View>
        </LinearGradient>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 35,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "#FFF",
            }}
          >
            {" "}
            0{" "}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#EEED3F",
            }}
          >
            مريض
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
          <Text
            style={{
              fontSize: 16,

              color: "#EEED3F",
            }}
          >
            شفت
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "#FFF",
            }}
          >
            0
          </Text>
          <Text
            style={{
              fontSize: 16,

              color: "#EEED3F",
            }}
          >
            خدمة سريعة
          </Text>
        </View>
      </View>
      <View
  style={{
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#041858",
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 1.84,
    elevation: 5,
  }}
>
 {myData && myData.role === 'nurse' ? null : ( 
  <TouchableOpacity
    onPress={() => {
      joinRoom(data._id)
      navigation.navigate("Chat", { data });
    }}
    style={{
      backgroundColor: "#00A02B",
      paddingHorizontal: 21,
      paddingVertical: 17,
      borderRadius: 30,
      width: '100%',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFF" style={{ marginRight: 10 }} />
    <Text
      style={{
        fontSize: 17,
        color: "#FFF",
        textAlign: 'right',
      }}
    >
      تواصل الآن
    </Text>
  </TouchableOpacity>
  )}
  {myData && myData.role === 'nurse' ? null : (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate("AskNurseShift", { data });
    }}
    style={{
      backgroundColor: "#00A02B",
      paddingHorizontal: 20,
      paddingVertical: 17,
      borderRadius: 30,
      width: '100%',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Ionicons name="calendar-outline" size={24} color="#FFF" style={{ marginRight: 10 }} />
    <Text
      style={{
        fontSize: 17,
        color: "#FFF",
        textAlign: 'right',
      }}
    >
      احجز شفت
    </Text>
  </TouchableOpacity>
  )}
  {myData && myData.role === 'nurse' ? null : (
  <TouchableOpacity
    onPress={() => {
      navigation.navigate("service", { data });
    }}
    style={{
      backgroundColor: "#00A02B",
      paddingHorizontal: 20,
      paddingVertical: 17,
      borderRadius: 30,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Ionicons name="book-outline" size={24} color="#FFF" style={{ marginRight: 10 }} />
    <Text
      style={{
        fontSize: 17,
        color: "#FFF",
        textAlign: 'right',
      }}
    >
      احجز خدمة
    </Text>
  </TouchableOpacity>
  )}


</View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          borderRadius: 20,
          marginBottom: 20,
          borderWidth: 1,
          // borderColor: "#e5e5e5",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#041858",
            marginBottom: 20,
            lineHeight: 24,
            textAlign: "justify",
          }}
        ></Text>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="account-circle"
              size={30}
              color="#041858"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#041858",
              }}
            >
              نبذة عني
            </Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            <Text
              style={{
                fontSize: 18,
                color: "#041858",
                marginBottom: 5,
              }}
            >
              {/* أنا ممرضة محترفة لدي خبرة في مجال رعاية المرضى والإشراف على الفحوصات الطبية وتنفيذ الإجراءات الطبية الضرورية. لدي خبرة في التعامل مع مرضى العمليات الجراحية والمرضى الذين يحتاجون إلى رعاية خاصة مثل كبار السن والمرضى الذين يعانون من أمراض مزمنة. أعمل على مساعدة المرضى وتوفير الرعاية اللازمة لهم للتخفيف من أعراضهم وتسهيل عملية شفائهم. */}
              {data.skills}
              {data.about}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="book-open-variant"
              size={30}
              color="#041858"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#041858",
              }}
            >
              التعليم
            </Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            {data.education.length > 0 ? (
              data.education.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#041858",
                      marginBottom: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {item.degree}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {item.field}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {item.school}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {moment(item.fromDate).format("MMM YYYY")}
                    {" - "}
                    {moment(item.toDate).format("MMM YYYY")}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {item.description}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  color: "#041858",
                  marginBottom: 5,
                }}
              >
                لا يوجد تعليم
              </Text>
            )}
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="briefcase"
              size={30}
              color="#041858"
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#041858",
              }}
            >
              الخبرة
            </Text>
          </View>
          <View style={{ marginLeft: 40 }}>
            {data.experience.length > 0 ? (
              data.experience.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#041858",
                      marginBottom: 5,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {item.employmentType}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {item.company}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {moment(item.fromDate).format("MMM YYYY")}
                    {" - "}
                    {moment(item.toDate).format("MMM YYYY")}
                  </Text>
                  <Text
                    style={{ fontSize: 16, color: "#041858", marginBottom: 3 }}
                  >
                    {item.description}
                  </Text>
                </View>
              ))
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  color: "#041858",
                  marginBottom: 5,
                }}
              >
                لا توجد خبرة
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default NurseProfilePatientView;
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingContainer: {
    paddingVertical: 13,
  },
  rating: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    textAlign: "right",
  },
  text: {
    fontSize: 17,
    color: "#918998",
    marginBottom: 20,
    textAlign: "center",
  },

  appBarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});