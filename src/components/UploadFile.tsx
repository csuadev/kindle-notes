import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

type UploadFileProps = {
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
};

const UploadFile = ({ setHighlights }: UploadFileProps): JSX.Element => {
  const [isDragging, setIsDragging] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleFileContent = (file: File): void => {
    const reader = new FileReader();
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      
      if (typeof result === 'string') {
        setHighlights(result.split('=========='));
      }
    };
    
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileContent(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave = (): void => {
    setIsDragging(false);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
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
        className={`flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed px-6 py-10 text-center transition ${
          isDragging ? 'border-[#a85a32] bg-[#f4e7db]' : 'border-slate-300'
        } ${theme === 'light' ? 'bg-white/70 text-slate-900' : 'border-slate-700 bg-[#11141b] text-white'}`
        }
      >
        <div className='h-12 w-12 rounded-full bg-[#efe2d6] dark:bg-[#1b2029] flex items-center justify-center text-[#a85a32]'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.7'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='M12 3v12' />
            <path d='M8 7l4-4 4 4' />
            <rect x='4' y='15' width='16' height='6' rx='2' />
          </svg>
        </div>
        <p className='text-lg font-display font-semibold'>Upload Kindle Clippings</p>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          Drag and drop your <em>My Clippings.txt</em> file here
        </p>
        <span className='text-xs uppercase tracking-wide text-slate-400'>or</span>
        <input
          type="file"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className='cursor-pointer rounded-full bg-[#a85a32] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110'
        >
          Browse Files
        </label>
      </div>
    </form>
  )
};

export default UploadFile;
