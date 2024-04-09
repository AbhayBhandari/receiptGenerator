import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../utils/Colors';

const FeeCard = ({name, month, dateOfReceiving, amount}) => {
  const capitalizeName = name => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{capitalizeName(name)}</Text>
        <Text style={styles.monthText}>{month}</Text>
        <Text style={styles.dateText}>{dateOfReceiving}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>₹ {amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black,
  },
  dateText: {
    fontSize: 14,
    color: colors.black,
  },
  amountContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    right: 10,
  },
  amountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default FeeCard;
