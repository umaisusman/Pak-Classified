import { useState, useEffect } from 'react';

const useFile = (fileUrl) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(fileUrl);
      const fileBlob = await response.blob();
      setFile(URL.createObjectURL(fileBlob));
    };

    fetchFile();
  }, [fileUrl]);

  return file;
};

export default useFile;
