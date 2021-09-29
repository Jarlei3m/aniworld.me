import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../services/fauna';
import { Now, query as q, TimeAdd } from 'faunadb';

interface UserProps {
  data: {
    name: string;
    email: string;
    createdAt: string;
  };
}

interface NewAccessProps {
  secret: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // subscribe user on faunadb
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
            createdAt: req.body.createdAt,
          },
          credentials: {
            password: req.body.password,
          },
        }),
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email))),
      ),
    );

    if (user.data.createdAt === req.body.createdAt) {
      // if subscribe was successfull, login
      // # get user auth token
      const newAccess = await fauna.query<NewAccessProps>(
        q.Login(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email)), {
          password: req.body.password,
          ttl: TimeAdd(Now(), 7, 'days'),
        }),
      );

      // # get secret token plus user info
      if (newAccess.secret) {
        const user = await fauna.query<UserProps>(
          q.Get(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email))),
        );

        const { name, email, createdAt } = user.data;

        return res.status(201).json({
          user: {
            name,
            email,
            createdAt,
          },
          token: newAccess.secret,
        });
      }
    } else {
      return res.status(405).end();
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
