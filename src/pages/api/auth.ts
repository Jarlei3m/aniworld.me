import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import { fauna } from '../../services/fauna';
import { Now, query as q, TimeAdd } from 'faunadb';

interface UserProps {
  data: {
    name: string;
    email: string;
    image?: string;
    createdAt: string;
  };
  token: NewAccessProps;
}

interface UserExistsProps {
  userExists: boolean;
}

interface NewAccessProps {
  secret: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // check if user exists
    const userExists = await fauna.query<UserExistsProps>(
      q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email))),
    );
    console.log('user exists:', userExists);

    if (userExists) {
      // get user authentication token
      const newAccess = await fauna.query<NewAccessProps>(
        q.Login(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email)), {
          password: req.body.password,
          ttl: TimeAdd(Now(), 7, 'days'),
        }),
      );

      // if password is correct we gonna receive the secret token
      if (newAccess?.secret) {
        // get user info
        const user = await fauna.query<UserProps>(
          q.Get(q.Match(q.Index('user_by_email'), q.Casefold(req.body.email))),
        );

        const { name, email, image, createdAt } = user.data;

        // return user info and access token
        return res.status(200).json({
          user: {
            name,
            email,
            image,
            createdAt,
          },
          token: newAccess.secret,
        });
      } else {
        // pw is incorrect
        return res.status(500).json({});
      }
    } else {
      // user does not exists
      return res.status(404).json({});
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
