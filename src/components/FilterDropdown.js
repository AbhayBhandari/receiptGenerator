import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons from react-native-vector-icons

const FilterDropdown = ({filterName, selectedValue, options, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: isOpen ? 0 : 8,
          borderBottomRightRadius: isOpen ? 0 : 8,
        },
      ]}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center', padding: 10}}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.selectedValueTextStyle}>
          <Text style={{fontWeight: 'bold'}}>{filterName}: </Text>
          {selectedValue}
        </Text>
        <Icon
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={24}
          color={colors.black}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdown, {width: '100%'}]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, {borderColor: colors.black}]}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}>
              <Text style={styles.optionsTextStyle}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    backgroundColor: colors.primary,
    borderColor: colors.black,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.black,
    zIndex: 2,
  },
  option: {
    alignItems: 'center',
    padding: 10,
  },
  optionsTextStyle: {
    fontSize: 10,
    color: colors.black,
  },
  selectedValueTextStyle: {
    color: colors.black,
    fontFamily: 'serif',
    fontSize: 10,
    marginRight: 5, // Add some space between text and icon
  },
});

export default FilterDropdown;
