import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY = 'PHISH_HISTORY';

export async function saveHistory(item) {
  const raw = await AsyncStorage.getItem(KEY);
  const arr = raw ? JSON.parse(raw) : [];
  arr.unshift(item);
  await AsyncStorage.setItem(KEY, JSON.stringify(arr.slice(0, 200))); // cap at 200 items
}

export async function getHistory() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function clearHistory() {
  await AsyncStorage.removeItem(KEY);
}
