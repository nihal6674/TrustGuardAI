import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Icon, useTheme } from 'react-native-paper';

export default function Home({ navigation }) {
  const theme = useTheme();
  const [pressedCard, setPressedCard] = React.useState(null);

  const menuItems = [
    {
      id: 'url',
      title: 'Check URL',
      description: 'Scan and verify links for safety and authenticity.',
      icon: 'link-variant',
      screen: 'UrlCheck',
      color: '#3B82F6',
    },
    {
      id: 'sms',
      title: 'Simulate SMS',
      description: 'Test and analyze suspicious messages safely.',
      icon: 'message-text-lock-outline',
      screen: 'SmsCheck',
      color: '#10B981',
    },
    {
      id: 'history',
      title: 'History',
      description: 'View your past scans and results.',
      icon: 'history',
      screen: 'History',
      color: '#F59E0B',
    },
    {
      id: 'analytics',
      title: 'Scan Analytics',
      description: 'Visual insights into your scan trends and safety stats.',
      icon: 'chart-bar',
      screen: 'ScanAnalytics',
      color: '#0D9488',
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your preferences and options.',
      icon: 'cog-outline',
      screen: 'Settings',
      color: '#6366F1',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          TrustGuard AI
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Secure • Smart • Reliable
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {menuItems.map((item) => (
          <Card
            key={item.id}
            mode="elevated"
            style={[
              styles.card,
              { elevation: pressedCard === item.id ? 6 : 2 },
            ]}
            onPressIn={() => setPressedCard(item.id)}
            onPressOut={() => setPressedCard(null)}
            onPress={() => navigation.navigate(item.screen)}
          >
            {/* Accent bar */}
            <View style={[styles.accentBar, { backgroundColor: item.color }]} />

            <Card.Content style={styles.cardContent}>
              <Icon source={item.icon} size={28} color={item.color} />
              <View style={styles.textContainer}>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  {item.title}
                </Text>
                <Text variant="bodySmall" style={styles.cardDescription}>
                  {item.description}
                </Text>
              </View>
              <Icon
                source="chevron-right"
                size={24}
                color={theme.colors.outline}
              />
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Footer */}
      <Text variant="bodySmall" style={styles.footer}>
        © 2025 TrustGuard AI
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    color: '#64748B',
    marginTop: 6,
  },
  cardsContainer: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 2,
    color: '#1E293B',
  },
  cardDescription: {
    color: '#64748B',
  },
  footer: {
    color: '#94A3B8',
    textAlign: 'center',
    marginVertical: 16,
  },
});
