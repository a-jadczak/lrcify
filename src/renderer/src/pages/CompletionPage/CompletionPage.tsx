import { Box, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StepperContext from '@renderer/contexts/StepperContext';
import './styles.css';

const CompletionPage = (): React.JSX.Element => {
  const { setActiveStep } = useContext(StepperContext)!;

  return (
    <Box className="container">
      <TaskAltIcon className="success-icon" color="success" />
      <Typography component="h2" variant="h4">
        Done!
      </Typography>
      <Typography component="p" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        The translation of the songs has been completed.
      </Typography>
      <Button onClick={() => setActiveStep(0)} variant="contained" sx={{ mt: 1 }}>
        Start over
      </Button>
    </Box>
  );
};

export default CompletionPage;
