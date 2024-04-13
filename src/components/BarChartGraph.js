import {Dimensions, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';

export default function BarChartGraph({ data }) {
  const datasetsInK = data.yearDatasets.map(dataset => ({
    data: dataset.data.map(value => value / 1000), // Divide each value by 1000
  }));
  return (
    <View>
      <BarChart
        data={{labels: data.yearLabels, datasets: datasetsInK}}
        segments={data.yearLabels.length / 2 + 1}
        width={Dimensions.get('window').width - 15}
        height={280}
        yAxisLabel={'₹ '}
        yAxisSuffix="k"
        fromZero={true}
        chartConfig={{
          propsForBackgroundLines: {
            stroke: 'white',
            opacity: 0.4,
          },
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 1,
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
