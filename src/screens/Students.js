import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import colors from '../utils/Colors';
import {storeStudent, loadStudents} from '../utils/AsynStorage';

export default function Students() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudents()
      .then(storedStudents => setStudents(storedStudents))
      .then(() => setIsLoading(false));
  }, []);

  const addStudent = () => {
    setModalVisible(true);
  };

  const saveStudent = () => {
    if (newStudentName.trim() !== '') {
      const capitalizedStudentName = newStudentName
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      storeStudent(capitalizedStudentName)
        .then(() => {
          setNewStudentName('');
          setModalVisible(false);
          // Reload students after saving a new student
          loadStudents().then(storedStudents => setStudents(storedStudents));
        })
        .catch(error => console.error('Error saving student:', error));
    }
  };

  const cancelAddStudent = () => {
    setNewStudentName('');
    setModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.tabIcons} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {students.map((student, index) => (
          <View key={index} style={styles.studentCard}>
            <Icon
              name="person"
              size={20}
              color={colors.black}
              style={styles.icon}
            />
            <Text style={styles.studentText}>{student}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={addStudent} style={styles.addButton}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Modal for adding a new student */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Student Name"
              placeholderTextColor={colors.greyDark}
              value={newStudentName}
              onChangeText={text => setNewStudentName(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={cancelAddStudent}
                style={[styles.modalButton, styles.cancelButton]}>
                <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveStudent}
                style={[styles.modalButton, styles.saveButton]}>
                <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    backgroundColor: colors.secondary,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: 10,
  },
  studentText: {
    color: colors.black,
    fontFamily: 'serif',
    fontWeight: '700',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    color: colors.black,
    fontFamily: 'serif',
    borderWidth: 1,
    borderColor: colors.greyDark,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: colors.error,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  buttonTextWhite: {
    color: colors.black,
    fontFamily: 'serif',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
