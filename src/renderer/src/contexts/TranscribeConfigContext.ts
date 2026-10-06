import { createContext } from 'react';
import type OutputConfig from '@/types/OutputConfig';
import type TranscriptionConfig from '@/types/TranscriptionConfig';

interface FullTranscriptionConfigContextType {
  outputConfig: OutputConfig | undefined;
  setOutputConfig: (value: OutputConfig) => void;
  transcriptionConfig: TranscriptionConfig | undefined;
  setTranscriptionConfig: (value: TranscriptionConfig) => void;
}

export const FullTranscriptionConfigContext = createContext<
  FullTranscriptionConfigContextType | undefined
>(undefined);
