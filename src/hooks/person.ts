import { create } from 'zustand';
import type { Person } from '@/schemas/data';

interface PersonState {
  persons: Person[];
  addPerson: (person: Person) => void;
  removePerson: (idx: number) => () => void;
  clearAll: () => void;
}

export const usePersonState = create<PersonState>()((set) => ({
  persons: [],
  addPerson: (person: Person) =>
    set((state) => ({ persons: [...state.persons, person] })),
  removePerson: (idx: number) => () =>
    set((state) => ({
      persons: [
        ...state.persons.slice(0, idx),
        ...state.persons.slice(idx + 1),
      ],
    })),
  clearAll: () =>
    set(() => ({
      persons: [],
    })),
}));
