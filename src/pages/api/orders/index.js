import db from '@/utils/db';
import Order from '../../../../models/Order';

const { getSession } = require('next-auth/react');

const handler = async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  console.log('get', user);
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;
