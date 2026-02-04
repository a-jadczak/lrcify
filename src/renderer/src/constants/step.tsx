import OutputFileConfigurationPage from '../pages/OutputFileConfigurationPage';
import ModelSelectorInstaller from '../pages/ModelSelectionPage';
import TranslationPage from '../pages/TranslationPage';
import CompletionPage from '@renderer/pages/CompletionPage';
import UploadPage from '@renderer/pages/UploadPage';
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
    component: <ModelSelectorInstaller />,
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
