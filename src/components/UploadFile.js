const UploadFile = ({ setHighlights }) => {
  const handleFileContent = (e) => {
    e.preventDefault()
    const reader = new FileReader();
    reader.onloadend = async (e) => {
      if (!e.target) return;
      const fileContent = (e.target.result);
      setHighlights((fileContent)?.split('=========='));
    }
    reader.readAsText(e.target.files[0])
  };

  return (
    <form>
      <input type="file" onChange={e => handleFileContent(e)} />
    </form>
  )
}

export default UploadFile