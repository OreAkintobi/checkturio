import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with title', () => {
    const mockOnPress = jest.fn();
    const tree = renderer
      .create(<Button title="Submit" onPress={mockOnPress} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('simulates press event', () => {
    const mockOnPress = jest.fn();
    const component = renderer.create(
      <Button title="Submit" onPress={mockOnPress} />
    );
    const buttonInstance = component.root.findByType(TouchableOpacity);

    // Simulate press event
    buttonInstance.props.onPress();

    // Assert onPress handler is called
    expect(mockOnPress).toHaveBeenCalled();
  });
});
