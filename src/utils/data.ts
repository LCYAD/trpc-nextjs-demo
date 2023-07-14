import { PersonSchema, type Person } from '@/schemas/data';
import path from 'path';
import { promises as fs } from 'fs';

const writePersonsToJson = async (persons: Person[]): Promise<void> => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  await fs.writeFile(
    jsonDirectory + '/data.json',
    Buffer.from(JSON.stringify(persons, null, 2)),
    {
      encoding: 'utf8',
    },
  );
  return;
};

export const getPersonsFromJson = async (): Promise<Person[]> => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', {
    encoding: 'utf8',
    flag: 'r',
  });
  const persons = JSON.parse(fileContents);
  return persons;
};

export const addPerson = async (person: Person): Promise<Person[]> => {
  const result = PersonSchema.parse(person);
  const persons = await getPersonsFromJson();
  const updatedPersons = [...persons, result];
  writePersonsToJson(updatedPersons);
  return updatedPersons;
};

export const removePerson = async (idx: number): Promise<Person[]> => {
  const persons = await getPersonsFromJson();
  if (idx >= persons.length) {
    throw Error('Cannot find Person at requested position');
  }
  persons.splice(idx, 1);
  writePersonsToJson(persons);
  return persons;
};

export const clearPersons = async () => {
  await writePersonsToJson([]);
  return [];
};
