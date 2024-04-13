import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
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

  const [feeSumByYear, setFeeSumByYear] = useState({
    yearLabels: [],
    yearDatasets: [{data: []}],
  });

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const allData = await getAllData();
          const currentYear = new Date().getFullYear();

          // Filtered data for the current year
          const filteredData = allData.filter(item => {
            const year = parseInt(item.dateOfReceiving.split('-')[2]);
            return year === currentYear;
          });

          // Extracted unique months present in the filtered data
          const uniqueMonths = [
            ...new Set(filteredData.map(item => item.month)),
          ];

          // Generated labels as 3-character abbreviations and sort them
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
          const labels = uniqueMonths
            .map(month => monthAbbreviations[month])
            .sort((a, b) => {
              const months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ];
              return months.indexOf(a) - months.indexOf(b);
            });

          // Initialized dataset with zeros
          const datasets = [{data: Array(labels.length).fill(0)}];

          // sum of fees for each month
          filteredData.forEach(item => {
            const monthIndex = labels.indexOf(monthAbbreviations[item.month]);
            if (monthIndex !== -1) {
              datasets[0].data[monthIndex] += parseInt(item.fee);
            }
          });

          console.log('datasets', datasets);
          console.log('lab', labels);

          // state with the calculated sums
          setFeeSumByMonth({labels, datasets});

          const uniqueYears = [
            ...new Set(allData.map(item => item.dateOfReceiving.split('-')[2])),
          ];

          // Sorted uniqueYears in descending order and select the first five years
          const lastFiveYears = uniqueYears
            .map(year => parseInt(year))
            .sort((a, b) => b - a)
            .slice(0, 5)
            .map(year => year.toString());

          const yearLabels = lastFiveYears;
          const yearDatasets = [{data: Array(yearLabels.length).fill(0)}];

          allData.forEach(item => {
            const yearIndex = yearLabels.indexOf(
              item.dateOfReceiving.split('-')[2],
            );
            if (yearIndex !== -1) {
              yearDatasets[0].data[yearIndex] += parseInt(item.fee);
            }
          });

          console.log('year labels-', yearLabels);
          console.log('year dataset-', yearDatasets);

          // state with the calculated sums
          setFeeSumByYear({yearLabels, yearDatasets});

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
      {console.log(
        'year wale ki length',
        feeSumByYear?.yearDatasets?.length > 0,
      )}
      {console.log('check check', Math.ceil(feeSumByMonth?.datasets?.length/2))}
      {feeSumByMonth?.datasets?.length > 0 &&
      feeSumByYear?.yearDatasets?.length > 0 ? (
        <>
          <BarChartGraph data={feeSumByYear} />
          <LineChartGraph data={feeSumByMonth} />
        </>
      ) : (
        <Text style={styles.noDataFoundTextStyle}>No Data Found!</Text>
      )}
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
  noDataFoundTextStyle: {
    fontSize: 18,
    color: colors.greyDark,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
});
