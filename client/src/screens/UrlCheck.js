import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, ActivityIndicator, Icon } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { saveHistory } from '../store/history';

export default function UrlCheck() {
  const [url, setUrl] = React.useState('');
  const [apiData, setApiData] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  // 👇 When apiData updates, compute and show the result
  React.useEffect(() => {
    if (!apiData) return;

    const isPhishing = apiData.prediction === 1;
    const resultData = {
      label: isPhishing ? 'Phishing Detected' : 'Safe',
    };

    setResult(resultData);

    saveHistory({
      type: 'URL',
      text: url,
      identification: resultData.label,
      ts: Date.now(),
    });
  }, [apiData]);

  const onCheck = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setErrorMsg('');

    try {
      console.log('🔍 Sending request:', url);

      const response = await fetch('https://phis-7.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: url }),
      });

      console.log('🛰️ Response status:', response.status);

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      console.log('📦 Response JSON:', data);

      setApiData(data);
    } catch (error) {
      console.error('❌ Error:', error);
      setErrorMsg('Unable to contact the server. Please try again.');
      setResult({
        label: 'Error contacting server',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Check URL
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Paste a website link below to verify its safety.
      </Text>

      <TextInput
        mode="outlined"
        label="Enter URL"
        value={url}
        onChangeText={setUrl}
        left={<TextInput.Icon icon="link-variant" />}
        autoCapitalize="none"
        style={styles.input}
        editable={!loading}
      />

      <Button
        mode="contained"
        icon={loading ? undefined : 'shield-check'}
        onPress={onCheck}
        disabled={!url.trim() || loading}
        contentStyle={{ flexDirection: 'row-reverse' }}
        style={[styles.button, loading && { opacity: 0.8 }]}
      >
        {loading ? (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator animating color="#fff" size="small" />
            <Text style={styles.loadingText}>Scanning...</Text>
          </View>
        ) : (
          'Check URL'
        )}
      </Button>

      {errorMsg ? (
        <Animatable.View animation="fadeIn" duration={400}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </Animatable.View>
      ) : null}

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
    backgroundColor: '#F8FAFC',
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
  errorText: {
    color: '#EF4444',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
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
