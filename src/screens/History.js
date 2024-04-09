import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getAllData} from '../utils/AsynStorage';
import FeeCard from '../components/FeeCard';
import colors from '../utils/Colors';

const HistoryScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feeDetails, setFeeDetails] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllData();
    console.log('data', data);
    setFeeDetails(data);
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : feeDetails.length > 0 ? (
          feeDetails.map((item, index) => (
            <FeeCard
              key={index}
              name={item.name}
              month={item.month}
              dateOfReceiving={item.dateOfReceiving}
              amount={item.fee}
            />
          ))
        ) : (
          <Text style={styles.nothingFound}>Nothing Found !</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nothingFound: {
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.greyDark,
  },
});

export default HistoryScreen;
