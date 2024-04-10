import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../utils/Colors';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {generateHtmlContent} from '../utils/PdfHtmlTemplate';
import {storeData} from '../utils/AsynStorage';
import MonthDropdown from '../components/MonthDropdown';
import MonthDropDownModal from '../components/MonthDropDownModal';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Home() {
  const [studentName, setStudentName] = useState('');
  const [fee, setFee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [generateDisabled, setGenerateDisabled] = useState(true);
  const [pdfPath, setPdfPath] = useState(null);
  const [isGenerateClicked, setIsGenerateClicked] = useState(false);
  const [isMonthDropDownModalOpen, setIsMonthDropDownModalOpen] =
    useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    console.log('selected date', selectedDate);

    const date = new Date(selectedDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0, so we add 1
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}-${
      month < 10 ? '0' + month : month
    }-${year}`;
    console.log('f date', formattedDate);

    const feeDetails = {
      name: studentName,
      fee: fee.toString(),
      month: selectedMonth,
      dateOfReceiving: formattedDate,
    };

    // Define HTML content for the PDF
    const htmlContent = generateHtmlContent(
      studentName,
      selectedMonth,
      formattedDate,
    );

    try {
      // Generate PDF using HTML content
      const {filePath} = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'FeeSlip',
        directory: 'Documents',
      });

      if (filePath) {
        console.log(feeDetails, 'feeeeee');
        await storeData(feeDetails);

        const path = FileViewer.open(filePath).then(() => {
          setIsGenerateClicked(false);
          setStudentName('');
          setFee('');
          setSelectedMonth('');
          setSelectedDate(new Date());
          setGenerateDisabled(true);
        });
      }

      console.log('PDF generated:', filePath);
      setPdfPath(filePath); // Set the generated PDF path
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleMonthSelect = month => {
    setSelectedMonth(month);
    setIsMonthDropDownModalOpen(false);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <MonthDropDownModal
        isVisible={isMonthDropDownModalOpen}
        items={months}
        onSelect={handleMonthSelect}
        onClose={() => setIsMonthDropDownModalOpen(false)}
      />
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

        <MonthDropdown
          selectedMonth={selectedMonth}
          onPress={() => setIsMonthDropDownModalOpen(true)}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.textStyle}>
            {selectedDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
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
    </View>
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
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    height: 55,
    width: 290,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
  },
  buttonText: {
    fontFamily: 'serif',
    fontWeight: '700',
    fontSize: 20,
    color: colors.black,
  },
  inputWrapper: {
    top: 70,
    backgroundColor: colors.white,
    width: '88%',
    alignItems: 'center',
    height: 400,
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
  textStyle: {
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: '700',
    color: colors.black,
  },
});
