import { createContext } from 'react';

interface StepperContextType {
  setActiveStep: (value: number) => void;
  setNextStepAvailable: (value: boolean) => void;
  setPreviousStepAvailable: (value: boolean) => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export default StepperContext;
