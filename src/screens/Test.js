import React, { useState } from 'react';
import { Modal, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStars = Math.round(rating - filledStars);
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(filledStars)].map((_, i) => (
        <Icon name="star" key={`star-${i}`} size={30} color="gold" />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <Icon name="star-half" key={`half-star-${i}`} size={30} color="gold" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon name="star-outline" key={`empty-star-${i}`} size={30} color="gold" />
      ))}
    </View>
  );
};

const RatingModal = () => {
  const [rating, setRating] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const submitRating = () => {
    console.log('Rating submitted:', rating);
    // function to send the rating to the database
    setModalVisible(false);  };

  const isValidRating = () => {
    return !isNaN(parseFloat(rating)) && rating >= 0 && rating <= 5;
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>تقييم المنتج</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>التقييم:</Text>
            <TextInput
              style={styles.ratingInput}
              placeholder="ادخل التقييم (0-5)"
              keyboardType="numeric"
              value={rating}
              onChangeText={(value) => setRating(value)}
            />
          </View>
          {isValidRating() && (
            <View style={styles.starRatingContainer}>
              <StarRating rating={parseFloat(rating)} />
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="ارسل التقييم"
              onPress={submitRating}
              disabled={!isValidRating()}
              color="#4CAF50"
            />
            <Button title="اغلق" onPress={closeModal} color="#f44336" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  ratingInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    fontSize: 16,
  },
  starRatingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default RatingModal;