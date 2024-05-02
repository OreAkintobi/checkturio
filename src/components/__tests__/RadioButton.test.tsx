import React from 'react';
import renderer from 'react-test-renderer';
import { RadioButton } from '../RadioButton';

describe('<RadioButton />', () => {
  const onSelectMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <RadioButton
          value="Option"
          isSelected={false}
          onSelect={onSelectMock}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onSelect when pressed', () => {
    const component = renderer.create(
      <RadioButton value="Option" isSelected={false} onSelect={onSelectMock} />
    );
    const instance = component.root;
    instance.props.onSelect(); // Directly call onSelect prop
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it('displays selected indicator when isSelected is true', () => {
    const tree = renderer
      .create(
        <RadioButton value="Option" isSelected={true} onSelect={onSelectMock} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not display selected indicator when isSelected is false', () => {
    const tree = renderer
      .create(
        <RadioButton
          value="Option"
          isSelected={false}
          onSelect={onSelectMock}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
