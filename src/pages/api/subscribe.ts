import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

interface UserProps {
  data: {
    name: string;
    email: string;
    password: string;
    // confirmPassword: string;
    createdAt: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('aqui');
  if (req.method === 'POST') {
    console.log('aqui2');

    const user = await fauna.query<UserProps>(
      q.If(
        q.Not(
          q.Exists(
            q.Match(q.Index('user_by_email'), q.Casefold(req.body.email)),
          ),
        ),
        q.Create(q.Collection('users'), {
          data: {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            createdAt: req.body.createdAt,
          },
        }),
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email))),
      ),
    );

    if (user.data.createdAt !== req.body.createdAt) {
      return res.status(405).json({ user });
    } else {
      return res.status(201).json({ user });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
