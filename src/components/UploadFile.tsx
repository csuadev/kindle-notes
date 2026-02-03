import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

type UploadFileProps = {
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
};

const UploadFile = ({ setHighlights }: UploadFileProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleFileContent = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      
      if (typeof result === 'string') {
        setHighlights(result.split('=========='));
      }
    };
    
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileContent(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave = () => {
    setIsDragging(false);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    handleFileContent(file);
  }

  return (
    <form className='transition duration-300'>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`h-50 flex justify-center items-center align-center flex-col p-16 rounded-lg border border-dashed
 ${isDragging ? ` border-cyan-500` : `border-sky-600`} hover:opacity-90 ${
  theme === 'light' ? `border-slate-300 text-black` : ` border-slate-700 text-white`
 }`}
      >
        <p>Drop your <em>My Clippings.txt</em> file here or click to select it</p>
        <input
          type="file"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
          <label htmlFor="fileInput" className={`cursor-pointer mt-4 rounded-lg py-2 px-4 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-700'}`}>
            Browse File
          </label>
      </div>
    </form>
  )
};

export default UploadFile;
