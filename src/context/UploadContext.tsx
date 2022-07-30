import React from 'react';

type Readings = {
  data: number;
  timestamp: number;
};

export type Data = {
  name: string;
  station: string;
  readings: Readings[];
  unit: string;
};

export interface IUploadContext {
  url: string;
  setUrl: (url: string | '') => void;
  fileBytes: Uint8Array | null;
  setFileBytes: (bytes: Uint8Array) => void;
  file: File | null;
  setFile: (file: File | null) => void;
}

interface IUploadProviderProps {
  children: React.ReactNode;
}

export const UploadContext = React.createContext<IUploadContext | null>(null);

export const UploadProvider = ({
  children,
}: IUploadProviderProps): JSX.Element => {
  const [url, setUrl] = React.useState<string>('');
  const [file, setFile] = React.useState<File | null>(null);
  const [fileBytes, setFileBytes] = React.useState<Uint8Array | null>(null);

  const contextValue = {
    url,
    setUrl,
    fileBytes,
    setFileBytes,
    file,
    setFile,
  };

  return (
    <UploadContext.Provider value={contextValue}>
      {children}
    </UploadContext.Provider>
  );
};
