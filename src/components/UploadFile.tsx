type UploadFileProps = {
  setHighlights: React.Dispatch<React.SetStateAction<string[]>>;
};

const UploadFile = ({ setHighlights }: UploadFileProps) => {
  const handleFileContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const reader = new FileReader();
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result;
      
      if (typeof result === 'string') {
        setHighlights(result.split('=========='));
      }
    };

    if (e.target.files) {
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <form>
      <input className="bg-cyan-500" type="file" onChange={e => handleFileContent(e)} />
    </form>
  )
};

export default UploadFile;
