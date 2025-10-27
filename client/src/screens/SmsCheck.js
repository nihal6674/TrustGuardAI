import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, ActivityIndicator, Icon } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { saveHistory } from '../store/history';

export default function SmsCheck() {
  const [message, setMessage] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onCheck = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://phis-7.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();
      console.log('📩 SMS API response:', data);

      const isSmishing = data.prediction === 1;
      const resultData = {
        label: isSmishing ? 'Smishing Detected' : 'Safe',
      };

      setResult(resultData);
      saveHistory({
        type: 'SMS',
        text: message,
        identification: resultData.label,
        ts: Date.now(),
      });
    } catch (error) {
      console.error('❌ Error contacting server:', error);
      setResult({
        label: 'Error contacting server',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text variant="headlineMedium" style={styles.title}>
        Check SMS
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Paste your message below to detect possible smishing attempts.
      </Text>

      {/* Input */}
      <TextInput
        mode="outlined"
        label="Enter message text"
        value={message}
        onChangeText={setMessage}
        left={<TextInput.Icon icon="message-text-outline" />}
        multiline
        numberOfLines={4}
        style={styles.input}
        editable={!loading}
      />

      {/* Button */}
      <Button
        mode="contained"
        icon={loading ? undefined : 'cellphone-check'}
        onPress={onCheck}
        disabled={!message.trim() || loading}
        contentStyle={{ flexDirection: 'row-reverse' }}
        style={[styles.button, loading && { opacity: 0.8 }]}
      >
        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator animating color="#fff" size="small" />
            <Text style={styles.loadingText}>Analyzing...</Text>
          </View>
        ) : (
          'Check Message'
        )}
      </Button>

      {/* Animated Result */}
      {result && (
        <Animatable.View animation="fadeInUp" duration={600}>
          <Card
            mode="elevated"
            style={[
              styles.resultCard,
              {
                borderLeftColor: result.label === 'Safe' ? '#10B981' : '#EF4444',
              },
            ]}
          >
            <Card.Content style={styles.resultContent}>
              <Icon
                source={result.label === 'Safe' ? 'check-decagram' : 'alert-decagram'}
                size={36}
                color={result.label === 'Safe' ? '#10B981' : '#EF4444'}
              />
              <Text
                variant="titleLarge"
                style={[
                  styles.resultLabel,
                  {
                    color: result.label === 'Safe' ? '#10B981' : '#EF4444',
                  },
                ]}
              >
                {result.label}
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
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    color: '#64748B',
    marginBottom: 24,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 6,
    marginBottom: 24,
    backgroundColor: '#0D9488',
  },
  loadingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#fff',
    fontWeight: '600',
  },
  resultCard: {
    borderRadius: 16,
    borderLeftWidth: 6,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    paddingVertical: 8,
  },
  resultContent: {
    alignItems: 'center',
  },
  resultLabel: {
    fontWeight: '700',
    marginTop: 8,
  },
});
