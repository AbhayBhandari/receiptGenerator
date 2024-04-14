import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React from 'react';
import colors from '../utils/Colors';

export default function DropDownModal({isVisible, items, onSelect, onClose}) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {items?.length > 0 ? (
            <FlatList
              data={items}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => onSelect(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={styles.itemText}>Nothing Found!</Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '88%',
  },
  itemText: {
    color: colors.black,
    fontSize: 13,
    paddingVertical: 10,
    fontFamily: 'serif',
    fontWeight: '700',
  },
});
