import Stepper from './components/Stepper/Stepper';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { FilesProvider } from './contexts/FilesContext';
import theme from './theme/theme';
import { steps } from './constants/step';
import { TranscriptionConfigProvider } from './contexts/TranscribeConfigContext';
import { WSProvider } from './contexts/WebSocketProvider';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FilesProvider>
        <WSProvider>
          <TranscriptionConfigProvider>
            <main>
              <Stepper steps={steps} />
            </main>
          </TranscriptionConfigProvider>
        </WSProvider>
      </FilesProvider>
    </ThemeProvider>
  );
}

export default App;
