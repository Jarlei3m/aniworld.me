import { query as q, Client } from 'faunadb';

interface recoverUserInfoProps {
  data: [{ data: {} }];
}

export async function recoverUserInfo(accessToken: string) {
  const client = new Client({ secret: accessToken });

  const userInfo = await client.query<recoverUserInfoProps>(
    q.Map(
      q.Paginate(q.Documents(q.Collection('users'))),
      q.Lambda(['user_by_email'], q.Get(q.Var('user_by_email'))),
    ),
  );

  return { user: userInfo.data[0].data };
}
