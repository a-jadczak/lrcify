import { createContext } from 'react';
import type AudioFile from '@/types/AudioFile';

interface FilesContextType {
  files: AudioFile[];
  setFiles: (files: AudioFile[]) => void;
  addFiles: (files: AudioFile[]) => void;
  deleteFile: (file: AudioFile) => void;
  clearFiles: () => void;
  getFileNames: () => string[];
}

export const FilesContext = createContext<FilesContextType | undefined>(undefined);
