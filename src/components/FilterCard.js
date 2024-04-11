import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterCard = ({data, onPress, filterBy}) => {
  const navigation = useNavigation();

  // const handlePress = () => {
  //   navigation.navigate('MonthDetails', {monthData: month});
  // };

  return (
    <TouchableOpacity>
      <View style={styles.card}>
        {filterBy === 'Name' ? (
          <Icon
            style={styles.iconStyle}
            name="person-circle-sharp"
            color={colors.black}
            size={35}
          />
        ) : null}
        <Text style={styles.dataText}>{Object.keys(data)[0]}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  dataText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  iconStyle: {
    position: 'absolute',
    left: 25,
  },
});

export default FilterCard;
