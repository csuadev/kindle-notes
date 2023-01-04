const useNormalizeNotes = (noteList) => {
  const notes = [];
  const titles = [];

  noteList.forEach(note => {
    const info = note.split(/\r?\n/) || [];
    const title = info[0]?.length > 0 ? info[0] : info[1];
    const highlight = info[3]?.length > 0 ? info[3] : info[4];

    if (highlight?.length === 0) return;

    notes.push({
      title,
      highlight,
    })

    if (!titles.includes(title) && title?.length > 0) {
      titles.push(title);
    }

  });

  return {
    notes,
    titles,
  };
}

export default useNormalizeNotes