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
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../utils/Colors';
import {
  storeStudent,
  loadStudents,
  deleteStudent,
  updateStudent,
} from '../utils/AsynStorage';

export default function Students() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNameExistsModalVisible, setIsNameExistsModalVisible] =
    useState(false);
  const [editingStudentName, setEditingStudentName] = useState(null);

  useEffect(() => {
    loadStudents()
      .then(storedStudents => setStudents(storedStudents))
      .then(() => setIsLoading(false));
  }, []);

  const addStudent = () => {
    setModalVisible(true);
    setEditingStudentName(null);
    setNewStudentName('');
  };

  const saveStudent = async () => {
    if (newStudentName.trim() !== '') {
      const capitalizedStudentName = newStudentName
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

      // Check if the name already exists
      if (students.includes(capitalizedStudentName)) {
        // If the name already exists, show the modal
        setIsNameExistsModalVisible(true);
      } else {
        if (editingStudentName) {
          await updateStudent(editingStudentName, capitalizedStudentName);
        } else {
          await storeStudent(capitalizedStudentName);
        }
        setNewStudentName('');
        setModalVisible(false);
        // Reload students after saving a new student or updating an existing one
        loadStudents().then(storedStudents => setStudents(storedStudents));
      }
    }
  };

  const cancelAddStudent = () => {
    setNewStudentName('');
    setModalVisible(false);
  };

  const handleEditStudent = async studentName => {
    setModalVisible(true);
    setEditingStudentName(studentName);
    setNewStudentName(studentName);
  };

  const handleDeleteStudent = async studentName => {
    const updatedStudents = await deleteStudent(studentName);
    setStudents(updatedStudents);
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
        {students?.length > 0 ? (
          students.map((student, index) => (
            <View key={index} style={styles.studentCard}>
              <Icon
                name="person"
                size={20}
                color={colors.black}
                style={styles.icon}
              />
              <Text style={styles.studentText}>{student}</Text>
              <TouchableOpacity
                onPress={() => handleEditStudent(student)}
                style={styles.editButton}>
                <Icon name="create-outline" size={22} color={colors.greyDark} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteStudent(student)}
                style={styles.deleteButton}>
                <Icon name="trash-outline" size={22} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: colors.greyDark,
                fontFamily: 'serif',
                fontWeight: 'bold',
              }}>
              No Data Found!
            </Text>
          </View>
        )}
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
                <Text
                  style={[
                    styles.buttonText,
                    styles.buttonTextWhite,
                    {color: colors.white},
                  ]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for name already exists */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isNameExistsModalVisible}
        onRequestClose={() => {
          setIsNameExistsModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Student name already exists!</Text>
            <TouchableOpacity
              onPress={() => setIsNameExistsModalVisible(false)}
              style={[
                styles.modalButton,
                styles.cancelButton,
                {alignItems: 'center'},
              ]}>
              <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                OK
              </Text>
            </TouchableOpacity>
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
    top: 20,
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
    flex: 1,
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
    width: '90%',
    height: '30%',
  },
  input: {
    color: colors.black,
    fontFamily: 'serif',
    borderWidth: 1,
    borderColor: colors.greyDark,
    borderRadius: 5,
    padding: 10,
    marginBottom: 60,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 126,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.tabIcons,
    backgroundColor: colors.white,
  },
  saveButton: {
    backgroundColor: colors.tabIcons,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  buttonTextWhite: {
    color: colors.tabIcons,
    fontFamily: 'serif',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'serif',
    fontWeight: '700',
    color: colors.black,
  },
  deleteButton: {
    marginLeft: 5,
    left: 5,
  },
  editButton: {
    left: 3,
  },
});
