import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveData, loadData, clearData, FORM_KEY } from '../storage';

// Mock AsyncStorage methods
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('AsyncStorage Functions', () => {
  beforeEach(() => {
    // Clear mock calls and reset mock implementation before each test
    jest.clearAllMocks();
  });

  it('saves data to AsyncStorage', async () => {
    const data = { name: 'John', age: 30 };
    await saveData(data);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      FORM_KEY,
      JSON.stringify(data)
    );
  });

  it('loads data from AsyncStorage', async () => {
    const data = { name: 'John', age: 30 };
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(data)
    );
    const loadedData = await loadData();
    expect(loadedData).toEqual(data);
  });

  it('clears data from AsyncStorage', async () => {
    await clearData();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(FORM_KEY);
  });
});
