import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import { useFormDataContext } from '../context/FormDataContext';
import { theme, Group, Checkpoint, saveData } from '../utils';
import { RadioButton } from './RadioButton';
import { Button } from './Button';

interface FormProps {
  onSubmit: () => void;
  onReset: () => void;
}

export const Form: React.FC<FormProps> = ({ onSubmit, onReset }) => {
  const { formData, setFormData } = useFormDataContext();
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (
    groupIndex: number,
    checkpointIndex: number,
    value: string
  ) => {
    const updatedFormData = { ...formData };
    updatedFormData.groups[groupIndex].checkpoints[checkpointIndex].value =
      value;
    setFormData(updatedFormData);

    // Save updated form data to AsyncStorage
    saveData(JSON.stringify(updatedFormData));
  };

  const handleSubmit = () => {
    // Validate form
    const formErrors: string[] = [];
    formData.groups.forEach((group: Group) => {
      group.checkpoints.forEach((checkpoint: Checkpoint) => {
        if (!checkpoint.value) {
          formErrors.push(`${checkpoint.name} is required`);
        }
      });
    });
    setErrors(formErrors);

    // If no errors, submit form
    if (formErrors.length === 0) {
      onSubmit();
    }
  };

  const renderCheckpoint = (
    groupIndex: number,
    checkpointIndex: number,
    checkpoint: Checkpoint
  ) => {
    switch (checkpoint.type) {
      case 'string':
      case 'number':
        return (
          <>
            <TextInput
              keyboardType={
                checkpoint.type === 'number' ? 'numeric' : 'default'
              }
              style={styles.input}
              placeholder={checkpoint.placeholder}
              onChangeText={(value) =>
                handleInputChange(groupIndex, checkpointIndex, value)
              }
              value={
                formData.groups[groupIndex].checkpoints[checkpointIndex]
                  .value || ''
              }
            />

            {errors.includes(`${checkpoint.name} is required`) && (
              <Text style={styles.errorText}>
                * {checkpoint.name} is required
              </Text>
            )}
          </>
        );
      case 'boolean':
        return (
          <>
            <View style={styles.booleanContainer}>
              {checkpoint.values?.map((option) => (
                <RadioButton
                  key={option}
                  value={option}
                  onSelect={() =>
                    handleInputChange(groupIndex, checkpointIndex, option)
                  }
                  isSelected={checkpoint.value === option}
                />
              ))}
            </View>

            {errors.includes(`${checkpoint.name} is required`) && (
              <Text style={styles.errorText}>
                * {checkpoint.name} is required
              </Text>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {formData.groups.map((group: Group, groupIndex: number) => (
        <View key={group.name} style={styles.groupContainer}>
          <Text style={styles.groupName}>{group.name}</Text>
          {group.checkpoints.map(
            (checkpoint: Checkpoint, checkpointIndex: number) => (
              <View key={checkpoint.name} style={styles.checkpointContainer}>
                <Text>{checkpoint.name}</Text>
                {renderCheckpoint(groupIndex, checkpointIndex, checkpoint)}
              </View>
            )
          )}
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Reset" onPress={onReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupContainer: {
    marginBottom: theme.sizes.xl,
  },
  groupName: {
    fontSize: theme.sizes['2xl'],
    fontWeight: 'bold',
    marginBottom: theme.sizes.m,
  },
  checkpointContainer: {
    marginBottom: theme.sizes.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.sizes.s,
    padding: theme.sizes.m,
    marginVertical: theme.sizes.m,
    fontSize: theme.sizes.xl,
  },
  booleanContainer: {
    flexDirection: 'row',
    marginVertical: theme.sizes.m,
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.sizes.m,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.sizes.l,
  },
});
