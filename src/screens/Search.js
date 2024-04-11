import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getAllData} from '../utils/AsynStorage';
import FilterDropdown from '../components/FilterDropdown';

const Search = ({navigation}) => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedFilterBy, setSelectedFilterBy] = useState('Month');

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
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      getAllYears();
    }, []),
  );

  const handleYearChange = year => {
    setSelectedYear(year);
    console.log('year', year);
  };

  const handleFilterBy = filterName => {
    setSelectedFilterBy(filterName);
    console.log('filter by', filterName);
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
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
    </View>
  );
};

export default Search;
