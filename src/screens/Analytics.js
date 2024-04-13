import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BarChartGraph from '../components/BarChartGraph';
import LineChartGraph from '../components/LineChartGraph';
import colors from '../utils/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {getAllData} from '../utils/AsynStorage';

export default function Analytics() {
  const [feeSumByMonth, setFeeSumByMonth] = useState({
    labels: [],
    datasets: [{data: []}],
  });

  useFocusEffect(
    React.useCallback(() => {
      // Async function to fetch data from AsyncStorage
      const fetchData = async () => {
        try {
          const allData = await getAllData();
          console.log('all data', allData);
          const currentYear = new Date().getFullYear();

          console.log('current year', currentYear);

          // Filter data for the current year
          const filteredData = allData.filter(item => {
            const year = parseInt(item.dateOfReceiving.split('-')[2]);
            return year === currentYear;
          });

          console.log('filtered data from current year', filteredData);

          // Extract unique months present in the filtered data
          const uniqueMonths = [
            ...new Set(filteredData.map(item => item.month)),
          ];

          console.log('uniq months', uniqueMonths);

          // Generate labels and initialize dataset with zeros
          const labels = uniqueMonths.map(
            month => month.charAt(0).toUpperCase() + month.slice(1),
          );

          console.log('labels', labels);
          const datasets = [{data: Array(labels.length).fill(0)}];

          console.log('dataset', datasets);

          // Calculate sum of fees for each month
          filteredData.forEach(item => {
            const monthIndex = labels.indexOf(
              item.month.charAt(0).toUpperCase() + item.month.slice(1),
            );
            if (monthIndex !== -1) {
              datasets[0].data[monthIndex] += parseInt(item.fee);
            }
          });

          console.log('labels processed', labels);
          console.log('dataset processed', datasets);

          // Update state with the calculated sums
          setFeeSumByMonth({labels, datasets});
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <BarChartGraph />
      <LineChartGraph />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
