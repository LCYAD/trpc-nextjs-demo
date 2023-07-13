import { create } from 'zustand';
import type { Person } from '@/schemas/data';

interface PersonState {
  persons: Person[];
  updatePersons: (persons: Person[]) => void;
}

export const usePersonState = create<PersonState>()((set) => ({
  persons: [],
  updatePersons: (persons: Person[]) =>
    set(() => ({
      persons,
    })),
}));
