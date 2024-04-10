import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import colors from '../utils/Colors';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import {generateHtmlContent} from '../utils/PdfHtmlTemplate';

const FeeCard = ({name, month, dateOfReceiving, amount}) => {
  const [isOpenClicked, setIsOpenClicked] = useState(false);

  const capitalizeName = name => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };

  const onClickOpen = async () => {
    setIsOpenClicked(true);
    const htmlContent = generateHtmlContent(name, month, dateOfReceiving);
    console.log('html', htmlContent);

    try {
      const {filePath} = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'FeeSlip',
        directory: 'Documents',
      });

      console.log('path', filePath);

      if (filePath) {
        const path = FileViewer.open(filePath).then(() => {
          setIsOpenClicked(false);
        });
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{capitalizeName(name)}</Text>
        <Text style={styles.monthText}>{month}</Text>
        <Text style={styles.dateText}>Received On: {dateOfReceiving}</Text>
        <View style={styles.feeContainer}>
          <Text style={styles.fee}>Fee: ₹ {amount}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onClickOpen} style={styles.openContainer}>
        {isOpenClicked ? (
          <ActivityIndicator size={30} color={colors.white} />
        ) : (
          <Text style={styles.openText}>Open</Text>
        )}
      </TouchableOpacity>
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
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  nameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: 5,
  },
  monthText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: colors.black,
  },
  dateText: {
    fontSize: 10,
    color: colors.black,
    marginVertical: 5,
  },
  feeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    height: 30,
    backgroundColor: colors.primaryLight,
    width: 120,
  },
  fee: {
    fontSize: 12,
    color: colors.black,
    fontWeight: '500',
  },
  openContainer: {
    width: 100,
    height: 45,
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 28,
    right: 10,
  },
  openText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default FeeCard;
