import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { theme } from '../utils';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.sizes.xl,
    paddingVertical: theme.sizes.m,
    paddingHorizontal: theme.sizes.xl,
    marginVertical: theme.sizes.m,
    marginRight: theme.sizes.xl,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.sizes.xl,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: theme.sizes.m,
  },
});
