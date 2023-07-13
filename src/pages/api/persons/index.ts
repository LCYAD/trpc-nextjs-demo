// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { type Person } from '@/schemas/data';
import { ErrorRes } from '@/types/api';
import { addPerson, clearPersons, getPersons } from '@/utils/data';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person[] | ErrorRes>,
) {
  if (req.method === 'GET') {
    const currPersons = getPersons();
    res.status(200).json(currPersons);
  } else if (req.method === 'POST') {
    try {
      const updatedPersons = addPerson(req.body);
      res.status(201).json(updatedPersons);
    } catch (err: any) {
      res.status(400).json({
        message: 'Cannot Add Person',
        reasons: err.errors,
      });
    }
  } else if (req.method === 'DELETE') {
    const updatedPersons = clearPersons();
    res.status(200).json(updatedPersons);
  } else {
    res.status(404).json({
      message: 'Invalid API Request',
    });
  }
}
