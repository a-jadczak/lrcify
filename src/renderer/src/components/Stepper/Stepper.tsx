import { Stepper as StepperMUI, Step as StepMUI, StepLabel, Button, Box } from '@mui/material';
import { JSX, useState } from 'react';
import './Stepper.css';
import Step from 'src/types/Step';
import StepperContext from '@renderer/contexts/StepperContext';

interface StepperProps {
  steps: Step[];
}
/*
 * This Stepper component was created to recive conditions determined by page components which controls the buttons props here.
 */
const Stepper: React.FC<StepperProps> = ({ steps }): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const [nextStepAvailable, setNextStepAvailable] = useState<boolean>(false);
  const [previousStepAvailable, setPreviousStepAvailable] = useState<boolean>(true);

  return (
    <Box className="stepper-container">
      <StepperMUI className="stepper-steps" activeStep={activeStep}>
        {steps.map(({ name }) => (
          <StepMUI key={name}>
            <StepLabel>{name}</StepLabel>
          </StepMUI>
        ))}
      </StepperMUI>

      <StepperContext.Provider
        value={{ setActiveStep, setNextStepAvailable, setPreviousStepAvailable }}
      >
        <Box className="stepper-children">{steps[activeStep].component}</Box>
      </StepperContext.Provider>

      <Box className="stepper-buttons">
        {steps[activeStep].backButton && (
          <Button
            disabled={!previousStepAvailable || activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
            variant="contained"
          >
            Back
          </Button>
        )}
        {!(activeStep === steps.length - 1) && (
          <Button
            disabled={!nextStepAvailable || activeStep === steps.length - 1}
            onClick={() => setActiveStep((prev) => prev + 1)}
            variant="contained"
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Stepper;
