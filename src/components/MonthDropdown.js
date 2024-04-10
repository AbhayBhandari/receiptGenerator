import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../utils/Colors';

export default function MonthDropdown({onPress, selectedMonth}) {
  return (
    <TouchableOpacity style={styles.input} onPress={onPress}>
      <Text style={styles.textStyle}>{selectedMonth || 'Month'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.primaryLight,
    color: colors.black,
    height: 60,
    width: 250,
    borderColor: colors.black,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    marginVertical: 20,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: '700',
    color: colors.greyDark,
  },
});
