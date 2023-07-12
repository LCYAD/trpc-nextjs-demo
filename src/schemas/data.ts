import { z } from 'zod';

export const PersonSchema = z.object({
  name: z.string(),
  age: z.number().gte(1).lte(120),
});

export type Person = z.infer<typeof PersonSchema>;
