// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { type Person } from '@/schemas/data';
import { ErrorRes } from '@/types/api';
import { removePerson } from '@/utils/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Person[] | ErrorRes>,
) {
  if (req.method === 'DELETE') {
    const position = parseInt(req.query.position as any, 10);
    try {
      const updatedPersons = await removePerson(position);
      res.status(200).json(updatedPersons);
    } catch (err: any) {
      res.status(400).json({
        message: 'Cannot Remove Person',
        reasons: err.message,
      });
    }
  } else {
    res.status(404).json({
      message: 'Invalid API Request',
    });
  }
}
