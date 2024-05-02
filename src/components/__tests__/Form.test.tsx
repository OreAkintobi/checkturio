import React from 'react';
import renderer from 'react-test-renderer';
import { Form } from '../Form';
import {
  FormDataProvider,
  useFormDataContext,
} from '../../context/FormDataContext';
import { theme } from '../../utils';

// Mock FormDataContext
jest.mock('../../context/FormDataContext', () => ({
  useFormDataContext: jest.fn(),
}));

// Mock saveData function
jest.mock('../../utils', () => ({
  saveData: jest.fn(),
  theme: {
    colors: {
      primary: '#007bff',
      danger: '#dc3545',
      background: '#ffffff',
      border: '#ced4da',
    },
    sizes: {
      s: 4,
      m: 8,
      l: 12,
      xl: 16,
      '2xl': 20,
    },
  },
}));

describe('Form', () => {
  const mockOnSubmit = jest.fn();
  const mockOnReset = jest.fn();

  it('renders correctly with no errors', () => {
    // Mock useFormDataContext hook to return form data without errors
    (useFormDataContext as jest.Mock).mockReturnValueOnce({
      formData: {
        groups: [
          {
            name: 'Group 1',
            checkpoints: [
              { type: 'string', name: 'Name', value: '' },
              { type: 'number', name: 'Age', value: '' },
            ],
          },
        ],
      },
      setFormData: jest.fn(),
    });

    const tree = renderer
      .create(
        <FormDataProvider>
          <Form onSubmit={mockOnSubmit} onReset={mockOnReset} />
        </FormDataProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with errors', () => {
    // Mock useFormDataContext hook to return form data with errors
    (useFormDataContext as jest.Mock).mockReturnValueOnce({
      formData: {
        groups: [
          {
            name: 'Group 1',
            checkpoints: [
              { type: 'string', name: 'Name', value: '' },
              { type: 'number', name: 'Age', value: '' },
            ],
          },
        ],
      },
      setFormData: jest.fn(),
    });
    const tree = renderer
      .create(
        <FormDataProvider>
          <Form onSubmit={mockOnSubmit} onReset={mockOnReset} />
        </FormDataProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onSubmit when form is submitted without errors', () => {
    // Mock useFormDataContext hook to return form data without errors
    (useFormDataContext as jest.Mock).mockReturnValueOnce({
      formData: {
        groups: [
          {
            name: 'Group 1',
            checkpoints: [
              { type: 'string', name: 'Name', value: 'John' },
              { type: 'number', name: 'Age', value: '30' },
            ],
          },
        ],
      },
      setFormData: jest.fn(),
    });

    const tree = renderer.create(
      <FormDataProvider>
        <Form onSubmit={mockOnSubmit} onReset={mockOnReset} />
      </FormDataProvider>
    );

    // Simulate form submission
    tree.root.findByProps({ testID: 'submit-button' }).props.onPress();

    // Expect onSubmit to be called
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  // Add more tests for handleInputChange, handleReset, and other scenarios if needed
});
