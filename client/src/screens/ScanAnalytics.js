import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { getHistory } from '../store/history';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width - 40;

export default function ScanAnalytics() {
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    loadHistory();
  }, [isFocused]);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  // --- Compute stats ---
  const totalScans = history.length;
  const safeCount = history.filter(h => h.identification === 'Safe').length;
  const phishingCount = totalScans - safeCount;
  const urlCount = history.filter(h => h.type === 'URL').length;
  const smsCount = history.filter(h => h.type === 'SMS').length;
  const lastScan =
    totalScans > 0 ? new Date(history[0].ts).toLocaleString() : 'No scans yet';

  const pieData = [
    {
      name: 'Safe',
      count: safeCount,
      color: '#10B981',
      legendFontColor: '#0F172A',
      legendFontSize: 14,
    },
    {
      name: 'Phishing / Smishing',
      count: phishingCount,
      color: '#EF4444',
      legendFontColor: '#0F172A',
      legendFontSize: 14,
    },
  ];

  const barData = {
    labels: ['URL', 'SMS'],
    datasets: [
      {
        data: [urlCount, smsCount],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Scan Analytics
      </Text>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Text style={styles.summaryText}>Total Scans: {totalScans}</Text>
          <Text style={styles.summaryText}>Safe: {safeCount}</Text>
          <Text style={styles.summaryText}>Phishing / Smishing: {phishingCount}</Text>
          <Text style={styles.summaryText}>Last Scan: {lastScan}</Text>
        </Card.Content>
      </Card>

      {totalScans > 0 ? (
        <>
          <Text style={styles.chartTitle}>Safety Distribution</Text>
          <PieChart
            data={pieData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="10"
            absolute
          />

          <Text style={[styles.chartTitle, { marginTop: 24 }]}>Scan Type Comparison</Text>
          <BarChart
            data={barData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            fromZero
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No scans yet. Start checking URLs or SMS messages to see analytics here.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#FFFFFF',
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(13, 148, 136, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: '5', strokeWidth: '2', stroke: '#0D9488' },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  summaryCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    marginBottom: 24,
  },
  summaryText: {
    color: '#334155',
    marginBottom: 6,
  },
  chartTitle: {
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 280,
  },
});
