import React, { createContext, useState } from 'react';
import OutputConfig from 'src/types/OutputConfig';
import TranscriptionConfig from 'src/types/TranscriptionConfig';

interface FullTranscriptionConfigContextType {
  outputConfig: OutputConfig | undefined;
  setOutputConfig: (value: OutputConfig) => void;
  transcriptionConfig: TranscriptionConfig | undefined;
  setTranscriptionConfig: (value: TranscriptionConfig) => void;
}

export const FullTranscriptionConfigContext = createContext<
  FullTranscriptionConfigContextType | undefined
>(undefined);

export const TranscriptionConfigProvider = ({ children }: { children: React.ReactNode }) => {
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
