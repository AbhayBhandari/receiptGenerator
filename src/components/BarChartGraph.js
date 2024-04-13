import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

export default function BarChartGraph() {
  return (
    <View>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 15}
        height={280}
        yAxisLabel={'₹ '}
        yAxisSuffix="k"
        chartConfig={{
          propsForBackgroundLines: {
            stroke: 'white',
            opacity: 0.4,
          },
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          fillShadowGradientFromOpacity: 0.7,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
