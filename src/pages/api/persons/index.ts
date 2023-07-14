// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { type Person } from '@/schemas/data';
import { ErrorRes } from '@/types/api';
import { addPerson, clearPersons, getPersonsFromJson } from '@/utils/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person[] | ErrorRes>,
) {
  if (req.method === 'GET') {
    const currPersons = await getPersonsFromJson();
    res.status(200).json(currPersons);
  } else if (req.method === 'POST') {
    try {
      const body =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const updatedPersons = await addPerson(body);
      res.status(201).json(updatedPersons);
    } catch (err: any) {
      console.log(err);
      res.status(400).json({
        message: 'Cannot Add Person',
        reasons: err.errors,
      });
    }
  } else if (req.method === 'DELETE') {
    const updatedPersons = await clearPersons();
    res.status(200).json(updatedPersons);
  } else {
    res.status(404).json({
      message: 'Invalid API Request',
    });
  }
}
