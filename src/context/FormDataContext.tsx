import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { FormData } from '../utils/types';

interface FormDataContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const FormDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', groups: [] });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormDataContext = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};
