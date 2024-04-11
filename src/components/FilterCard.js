import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterCard = ({data, onPress, filterBy}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        {filterBy === 'Name' && (
          <Icon
            style={styles.iconStyle}
            name="person-circle-sharp"
            color={colors.black}
            size={35}
          />
        )}
        <Text
          style={[styles.dataText, filterBy === 'Name' && styles.textWithIcon]}>
          {Object.keys(data)[0]}
        </Text>
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
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
  },
  dataText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 15, // Adjust the margin for text without icon
  },
  textWithIcon: {
    marginLeft: 10, // Adjust the margin for text with icon
  },
  iconStyle: {
    marginLeft: 5, // Adjust the margin for icon
  },
});

export default FilterCard;
