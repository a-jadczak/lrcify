import type AudioFile from '@/types/AudioFile';
import type Language from '@/types/Language';
import type OutputConfig from '@/types/OutputConfig';
import type TranscriptionConfig from '@/types/TranscriptionConfig';

export interface ModelInfo {
  name: string;
  weight: number;
  unit: string;
}

export interface PickFilesResult {
  canceled: boolean;
  files: AudioFile[];
}

export interface PickDirectoryResult {
  canceled: boolean;
  filePaths: string[];
}

export interface RendererApi {
  pickFiles(): Promise<PickFilesResult>;
  pickDirectory(): Promise<PickDirectoryResult>;
  getPathForFile(file: File): string;
  getModels(): Promise<ModelInfo[]>;
  getModelWeight(modelName: string): Promise<number>;
  getIsModelInstalled(modelName: string): Promise<boolean>;
  getLanguages(): Promise<Language[]>;
  getIsCudaAvailable(): Promise<boolean>;
}

export type WebSocketCommand =
  | { type: 'download'; model_name: string }
  | {
      type: 'transcribe';
      files: AudioFile[];
      outputConfig: OutputConfig;
      transcriptionConfig: TranscriptionConfig;
    };

export interface RendererSocket {
  send(command: WebSocketCommand): Promise<void>;
  onMessage(listener: (data: string) => void): () => void;
}
