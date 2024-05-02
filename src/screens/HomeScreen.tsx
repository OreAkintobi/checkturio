import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Form } from '../components';
import { useFormDataContext } from '../context/FormDataContext';
import { clearData, loadData, theme } from '../utils';

export const HomeScreen = () => {
  const { formData, setFormData } = useFormDataContext();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const fetchFormData = async () => {
    try {
      const response = await fetch(
        'https://oreakintobi.github.io/mockdata/formData.json'
      );
      const formData = await response.json();
      setFormData(formData);
    } catch (error) {
      setFetchError(
        `Error fetching form from server: ${JSON.stringify(error)}`
      );
    }
  };

  const getSavedFormData = async () => {
    setLoading(true);
    try {
      const storedFormData = await loadData();
      if (storedFormData !== null && storedFormData !== undefined) {
        setFormData(JSON.parse(storedFormData));
      } else {
        console.warn('No form data found in AsyncStorage.');
        fetchFormData();
      }
    } catch (error) {
      console.error('Error fetching saved form data:', error);
    } finally {
      setTimeout(() => {
        // Simulate fetch delay with setTimeout
        setLoading(false);
      }, 500);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(formData);
      fetchFormData();

      Alert.alert('Form Submitted Successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setTimeout(() => {
        // Simulate fetch delay with setTimeout
        setLoading(false);
      }, 200);
    }
  };

  // Function to handle form submission
  const handleReset = async () => {
    try {
      clearData().then(() => {
        fetchFormData();
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    getSavedFormData();
  }, []);

  return loading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  ) : fetchError ? (
    <View style={styles.loadingView}>
      <Text style={styles.errorText}>{fetchError}</Text>
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <Form onSubmit={handleSubmit} onReset={handleReset} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.sizes.xl,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.sizes.l,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
