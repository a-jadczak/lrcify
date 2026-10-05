import OutputFileConfigurationPage from '../pages/OutputFileConfigurationPage/OutputFileConfigurationPage';
import ModelSelectionPage from '../pages/ModelSelectionPage/ModelSelectionPage';
import TranslationPage from '../pages/TranslationPage/TranslationPage';
import CompletionPage from '@renderer/pages/CompletionPage/CompletionPage';
import UploadPage from '@renderer/pages/UploadPage/UploadPage';
import Step from 'src/types/Step';

export const steps: Step[] = [
  {
    name: 'Upload',
    component: <UploadPage />,
    backButton: true
  },
  {
    name: 'Output',
    component: <OutputFileConfigurationPage />,
    backButton: true
  },
  {
    name: 'Model',
    component: <ModelSelectionPage />,
    backButton: true
  },
  {
    name: 'Translation',
    component: <TranslationPage />,
    backButton: false
  },
  {
    name: 'Finish',
    component: <CompletionPage />,
    backButton: false
  }
];
