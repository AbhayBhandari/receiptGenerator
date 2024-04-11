import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getAllData} from '../utils/AsynStorage';
import FilterDropdown from '../components/FilterDropdown';
import FilterCard from '../components/FilterCard';
import colors from '../utils/Colors';

const Search = ({navigation}) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFilterBy, setSelectedFilterBy] = useState('Month');
  const [filteredData, setFilteredData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getAllYears = async () => {
        try {
          const data = await getAllData();
          const uniqueYears = [
            ...new Set(
              data.map(item =>
                new Date(
                  item.dateOfReceiving.split('-').reverse().join('-'),
                ).getFullYear(),
              ),
            ),
          ];
          uniqueYears.sort((a, b) => b - a);
          setYears(uniqueYears);
          filterDataByYearAndFilter(data, selectedYear, selectedFilterBy);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      getAllYears();
    }, [selectedYear, selectedFilterBy]),
  );

  const handleYearChange = year => {
    setSelectedYear(year);
  };

  const handleFilterBy = filterName => {
    setSelectedFilterBy(filterName);
  };

  const filterDataByYearAndFilter = (data, year, filterBy) => {
    console.log('inside filter data data', data);
    console.log('inside filter data year', year);
    console.log('inside filter filter by', filterBy);
    let filteredData = data.filter(item => {
      const itemYear = new Date(
        item.dateOfReceiving.split('-').reverse().join('-'),
      ).getFullYear();
      console.log('item year', itemYear);
      return itemYear === year;
    });

    console.log('filtered data after itemyear', filteredData);

    if (filterBy === 'Month') {
      // Group data by month
      const monthsData = {};
      filteredData.forEach(item => {
        if (!monthsData[item.month]) {
          monthsData[item.month] = [];
        }
        monthsData[item.month].push(item);
      });
      filteredData = monthsData;
      console.log('filtered data after month', filteredData);
    } else if (filterBy === 'Name') {
      // Group data by name
      const namesData = {};
      filteredData.forEach(item => {
        if (!namesData[item.name]) {
          namesData[item.name] = [];
        }
        namesData[item.name].push(item);
      });
      filteredData = namesData;
    }

    console.log('filtered data', filteredData);
    setFilteredData(filteredData);
  };

  const handleMonthCard = monthData => {
    navigation.navigate('Filter', {data: monthData});
  };

  const handleNameCard = nameData => {
    navigation.navigate('Filter', {data: nameData});
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <View style={{top: 30, left: 20}}>
          <FilterDropdown
            filterName="Year"
            selectedValue={selectedYear}
            options={years}
            onSelect={handleYearChange}
          />
        </View>

        <View style={{top: 30, right: 20}}>
          <FilterDropdown
            filterName="Filter By"
            selectedValue={selectedFilterBy}
            options={['Name', 'Month']}
            onSelect={handleFilterBy}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Display month cards */}
        {selectedFilterBy === 'Month' ? (
          <View>
            {Object.entries(filteredData).map(([key, value]) => (
              <FilterCard
                key={key}
                data={{[key]: value}}
                onPress={() => handleMonthCard(value)}
              />
            ))}
          </View>
        ) : null}

        {/* Display Name cards */}
        {selectedFilterBy === 'Name' ? (
          <View>
            {Object.entries(filteredData).map(([key, value]) => (
              <FilterCard
                filterBy="Name"
                key={key}
                data={{[key]: value}}
                onPress={() => handleNameCard(value)}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  scrollViewContent: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  nothingFoundTextStyle: {
    alignSelf: 'center',
    fontSize: 17,
    color: colors.black,
    fontFamily: 'serif',
  },
});

export default Search;
