import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async feeDetails => {
  try {
    // Retrieve existing data for the name
    const existingData = await AsyncStorage.getItem('feeDetails');
    console.log('existing data', existingData);
    let newData = [];

    if (existingData) {
      // If data exists, parse it and append the new feeDetails
      newData = JSON.parse(existingData);
      newData.push(feeDetails);
    } else {
      // If no data exists, initialize newData with the feeDetails
      newData.push(feeDetails);
    }

    // Store the updated data for the name
    await AsyncStorage.setItem('feeDetails', JSON.stringify(newData));
    console.log('Data stored successfully for', 'feeDetails', ':', feeDetails);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export const getAllData = async () => {
  try {
    const data = await AsyncStorage.getItem('feeDetails');
    if (data) {
      return JSON.parse(data).reverse();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting all data:', error);
    return [];
  }
};
