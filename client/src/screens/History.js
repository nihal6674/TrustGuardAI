import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, IconButton, Divider } from 'react-native-paper';
import { getHistory, clearHistory } from '../store/history';
import { useIsFocused } from '@react-navigation/native';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const loadHistory = async () => {
    setLoading(true);
    const data = await getHistory();
    setHistory(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) loadHistory();
  }, [isFocused]);

  const handleClearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            loadHistory();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Scan History
        </Text>
        <View style={styles.actions}>
          <IconButton
            icon="refresh"
            size={24}
            iconColor="#0D9488"
            onPress={loadHistory}
            disabled={loading}
          />
          <IconButton
            icon="delete-sweep-outline"
            size={24}
            iconColor="#EF4444"
            onPress={handleClearHistory}
          />
        </View>
      </View>

      <Divider style={{ marginBottom: 16 }} />

      {/* History List */}
      <ScrollView>
        {loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.loadingText}>Loading history...</Text>
          </View>
        ) : history.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              No history yet. Start scanning to see results here.
            </Text>
          </View>
        ) : (
          history.map((item, i) => (
            <Card
              key={i}
              mode="elevated"
              style={[
                styles.card,
                {
                  borderLeftColor:
                    item.identification === 'Safe' ? '#10B981' : '#EF4444',
                },
              ]}
            >
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text
                    variant="titleMedium"
                    style={{
                      color:
                        item.identification === 'Safe'
                          ? '#10B981'
                          : '#EF4444',
                      fontWeight: '700',
                    }}
                  >
                    {item.identification}
                  </Text>
                  <Text style={styles.typeBadge}>
                    {item.type.toUpperCase()}
                  </Text>
                </View>

                <Text style={styles.textLabel} numberOfLines={2}>
                  {item.text}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.timeText}>
                    {new Date(item.ts).toLocaleString()}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: '#0F172A',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    maxWidth: 260,
  },
  loadingText: {
    color: '#64748B',
    fontStyle: 'italic',
  },
  card: {
    borderRadius: 16,
    borderLeftWidth: 6,
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeBadge: {
    backgroundColor: '#E2E8F0',
    color: '#475569',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  textLabel: {
    color: '#334155',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timeText: {
    color: '#64748B',
    fontSize: 12,
  },
});
