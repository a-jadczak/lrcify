interface TranscriptionConfig {
  device: 'cpu' | 'cuda';
  model: string;
  languageISO: string;
  beamSize: number;
}

export default TranscriptionConfig;
