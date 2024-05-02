import React from 'react';
import renderer from 'react-test-renderer';
import { FormDataProvider, useFormDataContext } from '../FormDataContext';

describe('FormDataProvider', () => {
  it('provides formData and setFormData', () => {
    const TestComponent = () => {
      const { formData, setFormData } = useFormDataContext();
      return (
        <div>
          <span>{formData.name}</span>
          <button onClick={() => setFormData({ name: 'Test', groups: [] })}>
            Set Form Data
          </button>
        </div>
      );
    };

    const tree = renderer.create(
      <FormDataProvider>
        <TestComponent />
      </FormDataProvider>
    );

    const testComponentInstance = tree.root.findByType(TestComponent);
    const spanInstance = testComponentInstance.findByType('span');
    const buttonInstance = testComponentInstance.findByType('button');

    // Assert initial formData value
    expect(spanInstance.props.children).toBe('');

    // Trigger button click to set new formData value
    buttonInstance.props.onClick();

    // Assert updated formData value
    expect(spanInstance.props.children).toBe('Test');
  });

  it('throws an error if used outside of FormDataProvider', () => {
    const TestComponent = () => {
      useFormDataContext();
      return <div>Test Component</div>;
    };

    // Expect using useFormDataContext outside of FormDataProvider to throw an error
    expect(() => {
      renderer.create(<TestComponent />);
    }).toThrow('useFormData must be used within a FormDataProvider');
  });
});
