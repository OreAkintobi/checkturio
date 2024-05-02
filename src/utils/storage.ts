import AsyncStorage from '@react-native-async-storage/async-storage';

export const FORM_KEY = 'FORMDATA';

// Function to save data to AsyncStorage
export const saveData = async (data: any) => {
  try {
    await AsyncStorage.setItem(FORM_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Function to load data from AsyncStorage
export const loadData = async () => {
  try {
    const jsonData = await AsyncStorage.getItem(FORM_KEY);
    if (jsonData !== null && jsonData !== undefined) {
      return JSON.parse(jsonData);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Function to clear data from AsyncStorage
export const clearData = async () => {
  try {
    await AsyncStorage.removeItem(FORM_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
