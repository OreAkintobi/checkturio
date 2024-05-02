import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../utils';

interface BooleanInputProps {
  value: string;
  isSelected?: boolean;
  onSelect: () => void;
}

export const RadioButton: React.FC<BooleanInputProps> = ({
  value,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={styles.radioContainer}>
        <View style={styles.radioIndicator}>
          {isSelected ? <View style={styles.selectedIndicator} /> : null}
        </View>
        <Text style={styles.label}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.sizes.m,
    marginRight: theme.sizes.m,
    borderRadius: theme.sizes.s,
    padding: theme.sizes.m,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  radioIndicator: {
    width: theme.sizes.l,
    height: theme.sizes.l,
    borderRadius: theme.sizes.l,
    backgroundColor: theme.colors.background,
    marginRight: theme.sizes.m,
    borderColor: theme.colors.border,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicator: {
    width: theme.sizes.m,
    height: theme.sizes.m,
    borderRadius: theme.sizes.m,
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.primary,
    fontSize: theme.sizes.xl,
  },
});
