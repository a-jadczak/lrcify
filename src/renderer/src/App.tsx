import Stepper from './components/Stepper/Stepper';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { FilesProvider } from './contexts/FilesContext';
import theme from './theme/theme';
import { steps } from './constants/step';
import { TranscriptionConfigProvider } from './contexts/TranscribeConfigContext';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FilesProvider>
        <TranscriptionConfigProvider>
          <main>
            <Stepper steps={steps} />
          </main>
        </TranscriptionConfigProvider>
      </FilesProvider>
    </ThemeProvider>
  );
}

export default App;
