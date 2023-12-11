import React from "react";
import { View, Image, Text, useColorScheme, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import AppIntroSlider from "react-native-app-intro-slider";
import dynamicStyles from "../../Styles/stepperstyle";
import {  useNavigation } from "@react-navigation/native";



const WalkthroughScreen = ({ appConfig, appStyles}) => {
  // const appConfig = props.appConfig;
  // const appStyles = props.appStyles; 
  // const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  
  const nav = useNavigation()
  const handleDone = () => {
   nav.navigate('Nursique')
  };
  const slides = appConfig.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {


      return {
        key: `${index}`,
        text: screenSpec.description,
        title: screenSpec.title,
        Image: screenSpec.Image,
      };
    
    }
  );
  

  const _renderItem = ({ item, dimensions, index }) => {
    const isLastSlide = index === slides.length - 1;
return (
    <View style={[styles.container, dimensions]}>
      <Image
        style={styles.image}
        source={item.Image}
        // size={100}
        // color="white"
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {/* <Image style={styles.image}>{item.image}</Image> */}
      </View>
      {isLastSlide &&(

      <TouchableOpacity onPress={handleDone}>
        <Text style={styles.button}>ابدأ الآن</Text>
      </TouchableOpacity>
      )}
    </View>
)
      };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      showSkipButton={false}
      showDoneButton={false}
      showNextButton={false}
    />
  );
};

WalkthroughScreen.propTypes = {
  appStyles: PropTypes.object,
  appConfig: PropTypes.object,
  // navigation: PropTypes.object.isRequired, 
};

export default WalkthroughScreen;