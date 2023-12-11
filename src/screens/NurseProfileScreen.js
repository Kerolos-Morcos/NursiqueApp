import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NurseProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePicture}>
        <Image
          source={require('./nurse-profile-picture.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.profileDetails}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.designation}>Registered Nurse</Text>
        <Text style={styles.specialization}>Emergency Medicine</Text>
        <Text style={styles.experience}>8 years of experience</Text>
        <View style={styles.education}>
          <Text style={styles.educationTitle}>Education</Text>
          <Text>Bachelor of Science in Nursing</Text>
          <Text>Certified Emergency Nurse (CEN)</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileDetails: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  designation: {
    fontSize: 18,
    marginBottom: 5,
  },
  specialization: {
    fontSize: 16,
    marginBottom: 5,
  },
  experience: {
    fontSize: 16,
    marginBottom: 10,
  },
  education: {
    marginTop: 10,
  },
  educationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default NurseProfileScreen;
