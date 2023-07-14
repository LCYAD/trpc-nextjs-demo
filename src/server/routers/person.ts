import {
  addPerson,
  clearPersons,
  getPersonsFromJson,
  removePerson,
} from '@/utils/data';
import { router, publicProcedure } from '../trpc';
import { type Person, PersonSchema } from '@/schemas/data';
import { z } from 'zod';

export const personRouter = router({
  list: publicProcedure.query(async (): Promise<Person[]> => {
    const persons = await getPersonsFromJson();
    return persons;
  }),
  add: publicProcedure
    .input(PersonSchema)
    .mutation(async ({ input }): Promise<Person[]> => {
      const updatedPersons = await addPerson(input);
      return updatedPersons;
    }),
  remove: publicProcedure
    .input(z.number())
    .mutation(async ({ input }): Promise<Person[]> => {
      const updatedPersons = await removePerson(input);
      return updatedPersons;
    }),
  clear: publicProcedure.mutation(async (): Promise<Person[]> => {
    await clearPersons();
    return [];
  }),
});
