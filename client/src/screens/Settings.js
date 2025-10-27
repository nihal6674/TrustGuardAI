import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Icon } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function Settings() {
  const [updated, setUpdated] = useState(false);

  const handleUpdateCheck = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 4000); // Hide message after 4 seconds
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text variant="headlineMedium" style={styles.title}>
        Settings
      </Text>

      {/* Update App Card */}
      <Card style={styles.card}>
        <Card.Content style={styles.row}>
          <View style={styles.infoSection}>
            <Icon source="update" size={28} color="#0D9488" />
            <Text variant="titleMedium" style={styles.label}>
              Update the App
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleUpdateCheck}
            buttonColor="#0D9488"
            textColor="#fff"
            style={styles.updateButton}
          >
            Check
          </Button>
        </Card.Content>
      </Card>

      {/* Animated Message */}
      {updated && (
        <Animatable.View animation="fadeInUp" duration={600}>
          <Card style={styles.messageCard}>
            <Card.Content style={styles.messageContent}>
              <Icon source="check-decagram" size={36} color="#10B981" />
              <Text variant="titleMedium" style={styles.messageText}>
                Your app is already up to date!
              </Text>
            </Card.Content>
          </Card>
        </Animatable.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 20,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    color: '#0F172A',
    fontWeight: '600',
  },
  updateButton: {
    borderRadius: 10,
  },
  messageCard: {
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
    borderLeftWidth: 6,
    borderLeftColor: '#10B981',
    elevation: 2,
    marginTop: 10,
    paddingVertical: 10,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  messageText: {
    color: '#065F46',
    fontWeight: '600',
  },
});
