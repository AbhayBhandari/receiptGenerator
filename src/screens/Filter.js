import React from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FeeCard from '../components/FeeCard';
import colors from '../utils/Colors';

const Filter = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          size={30}
          color={colors.black}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Filtered data */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {route.params.data.map((item, index) => (
            <FeeCard
              key={index}
              name={item.name}
              month={item.month}
              dateOfReceiving={item.dateOfReceiving}
              amount={item.fee}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1, // Ensure the back button appears above other components
  },
  content: {
    flex: 1,
    marginTop: 50, // Adjust as needed
  },
});

export default Filter;
