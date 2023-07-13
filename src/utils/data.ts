import { PersonSchema, type Person } from '@/schemas/data';

const persons: Person[] = [];

export const getPersons = (): Person[] => persons;

export const addPerson = (person: Person): Person[] => {
  const result = PersonSchema.parse(person);
  persons.push(result);
  return persons;
};

export const removePerson = (idx: number) => {
  // TODO: resolve unknown issue where array is empty is calling this endpoint (when there should be items in it)
  if (idx >= persons.length) {
    throw Error('Cannot find Person at requested position');
  }
  persons.splice(idx, 1);
  return persons;
};

export const clearPersons = () => {
  persons.splice(0, persons.length);
  return persons;
};
