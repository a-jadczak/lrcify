import { useState } from 'react';
import type { JSX, ReactNode } from 'react';
import type OutputConfig from '@/types/OutputConfig';
import type TranscriptionConfig from '@/types/TranscriptionConfig';
import { FullTranscriptionConfigContext } from '@/renderer/src/contexts/TranscribeConfigContext';

export const TranscriptionConfigProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [transcriptionConfig, setTranscriptionConfig] = useState<TranscriptionConfig>();
  const [outputConfig, setOutputConfig] = useState<OutputConfig>();

  return (
    <FullTranscriptionConfigContext.Provider
      value={{
        transcriptionConfig,
        setTranscriptionConfig,
        outputConfig,
        setOutputConfig
      }}
    >
      {children}
    </FullTranscriptionConfigContext.Provider>
  );
};
