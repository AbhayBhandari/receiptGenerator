import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';

export default function LineChartGraph() {
  return (
    <View>
      <LineChart
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: [
                100,
                200,
                500,
                600,
                700,
                800,
                900,
                300,
                100,
                600,
                500,
                900,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 15}
        height={280}
        yAxisLabel="₹ "
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          propsForBackgroundLines: {
            stroke: 'white',
            opacity: 0.4,
          },
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          fillShadowGradientFromOpacity: 0.6,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
