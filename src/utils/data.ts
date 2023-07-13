import { PersonSchema, type Person } from '@/schemas/data';

let persons: Person[] = [];

export const getPersons = (): Person[] => persons;

export const addPerson = (person: Person): Person[] => {
  const result = PersonSchema.parse(person);
  persons = [...persons, result];
  return persons;
};

export const removePerson = (idx: number) => {
  if (idx >= persons.length) {
    throw Error('Cannot find Person at requested position');
  }
  persons.splice(idx, 1);
  return persons;
};

export const clearPersons = () => {
  persons = [];
  return persons;
};
