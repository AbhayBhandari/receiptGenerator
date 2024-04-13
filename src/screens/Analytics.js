import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BarChartGraph from '../components/BarChartGraph';
import LineChartGraph from '../components/LineChartGraph';
import colors from '../utils/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {getAllData} from '../utils/AsynStorage';

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
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
          const currentYear = new Date().getFullYear();

          // Filter data for the current year
          const filteredData = allData.filter(item => {
            const year = parseInt(item.dateOfReceiving.split('-')[2]);
            return year === currentYear;
          });

          // Extract unique months present in the filtered data
          const uniqueMonths = [
            ...new Set(filteredData.map(item => item.month)),
          ];

          // Generate labels as 3-character abbreviations
          const monthAbbreviations = {
            January: 'Jan',
            February: 'Feb',
            March: 'Mar',
            April: 'Apr',
            May: 'May',
            June: 'Jun',
            July: 'Jul',
            August: 'Aug',
            September: 'Sep',
            October: 'Oct',
            November: 'Nov',
            December: 'Dec',
          };
          const labels = uniqueMonths.map(month => monthAbbreviations[month]);

          // Initialize dataset with zeros
          const datasets = [{data: Array(labels.length).fill(0)}];

          // Calculate sum of fees for each month
          filteredData.forEach(item => {
            const monthIndex = labels.indexOf(monthAbbreviations[item.month]);
            if (monthIndex !== -1) {
              datasets[0].data[monthIndex] += parseInt(item.fee);
            }
          });

          console.log('datasets', datasets);
          console.log('lab', labels);

          // Update state with the calculated sums
          setFeeSumByMonth({labels, datasets});
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []),
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarChartGraph />
      <LineChartGraph data={feeSumByMonth} />
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
