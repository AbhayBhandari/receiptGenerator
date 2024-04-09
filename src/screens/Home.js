import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
    ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../utils/Colors';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {generateHtmlContent} from '../utils/PdfHtmlTemplate';
import {storeData} from '../utils/AsynStorage';

export default function Home() {
  const [studentName, setStudentName] = useState('');
  const [fee, setFee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [generateDisabled, setGenerateDisabled] = useState(true);
  const [pdfPath, setPdfPath] = useState(null);
  const [isGenerateClicked, setIsGenerateClicked] = useState(false);

  useEffect(() => {
    // Enable Generate button only when all fields are filled
    setGenerateDisabled(!(studentName && fee && selectedMonth));
  }, [studentName, fee, selectedMonth]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleGenerate = async () => {
    setIsGenerateClicked(true);
    // Get today's date (date of receving fee)
    const currentDate = new Date().toLocaleDateString();

    const feeDetails = {
      name: studentName,
      fee: fee.toString(),
      month: selectedMonth,
      dateOfReceiving: currentDate,
    };

    // Define HTML content for the PDF
    const htmlContent = generateHtmlContent(
      studentName,
      selectedMonth,
      currentDate,
    );

    try {
      // Generate PDF using HTML content
      const {filePath} = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'FeeSlip',
        directory: 'Documents',
      });

      if (filePath) {
        console.log(feeDetails.fee, 'feeeeee');
        await storeData(feeDetails);

        const path = FileViewer.open(filePath).then(() => {
          setIsGenerateClicked(false);
          setStudentName('');
          setFee('');
          setSelectedMonth('');
          setGenerateDisabled(true);
        });
      }

      console.log('PDF generated:', filePath);
      setPdfPath(filePath); // Set the generated PDF path
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={text => setStudentName(text)}
          value={studentName}
          placeholder="Student Name"
          placeholderTextColor={colors.greyDark}
        />

        <TextInput
          style={styles.input}
          onChangeText={text => setFee(text)}
          value={fee}
          placeholder="Fee"
          keyboardType="numeric"
          placeholderTextColor={colors.greyDark}
        />

        <View style={pickerSelectStyles.inputContainer}>
          <RNPickerSelect
            onValueChange={value => setSelectedMonth(value)}
            items={months.map(month => ({
              label: month,
              value: month,
              color: colors.black,
            }))}
            placeholder={{
              label: 'Select Month',
              value: '',
            }}
            style={{
              ...pickerSelectStyles.inputAndroid,
              placeholder: {color: 'black'},
              inputAndroidContainer: {paddingHorizontal: 10},
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleGenerate}
        disabled={generateDisabled}
        style={
          generateDisabled ? [styles.button, {opacity: 0.4}] : styles.button
        }>
        {isGenerateClicked ? (
          <ActivityIndicator size="large" color={colors.black} />
        ) : (
          <Text style={styles.buttonText}>Generate</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.secondary,
  },
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
    fontSize: 16,
    marginVertical: 20,
    fontFamily: 'serif',
    fontWeight: '700',
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    width: 290,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    fontFamily: 'serif',
    fontWeight: '700',
    fontSize: 22,
    color: colors.black,
  },
  inputWrapper: {
    top: 70,
    backgroundColor: colors.white,
    width: '88%',
    alignItems: 'center',
    height: 350,
    justifyContent: 'center',
    borderRadius: 20,
  },
  pdfContainer: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 30,
    marginBottom: 20,
    width: 250,
    backgroundColor: colors.grey,
    paddingHorizontal: 10,
    top: 20,
  },
  inputAndroid: {
    fontSize: 16,
  },
});
