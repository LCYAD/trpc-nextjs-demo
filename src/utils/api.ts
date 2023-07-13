import { type Person } from '@/schemas/data';

export const getPersons = async (): Promise<Person[]> => {
  const res = await fetch('/api/persons', {
    method: 'GET',
  });
  return res.json();
};

export const addPerson = async (person: Person): Promise<Person[]> => {
  const res = await fetch('/api/persons', {
    method: 'POST',
    body: JSON.stringify(person),
  });
  return res.json();
};

export const removePerson = async (position: number): Promise<Person[]> => {
  const res = await fetch(`/api/persons/${position}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const clearPersons = async (): Promise<Person[]> => {
  const res = await fetch('/api/persons', {
    method: 'DELETE',
  });
  return res.json();
};
