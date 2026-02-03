import type { Note } from '../types/notes';

type NormalizeResult = {
  notes: Note[];
  titles: string[];
};

const useNormalizeNotes = (noteList: string[]): NormalizeResult => {
  const notes: Note[] = [];
  const titles: string[] = [];

  noteList.forEach(note => {
    const info = note.split(/\r?\n/) || [];
    const title = (info[0]?.length ?? 0) > 0 ? info[0] : info[1];
    const highlight = (info[3]?.length ?? 0) > 0 ? info[3] : info[4];

    if (!title || !highlight || highlight.length === 0) return;

    notes.push({
      title,
      highlight,
    });

    if (!titles.includes(title)) {
      titles.push(title);
    }

  });

  return {
    notes,
    titles,
  };
};

export default useNormalizeNotes
