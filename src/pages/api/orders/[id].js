const { default: db } = require('@/utils/db');
const { getSession } = require('next-auth/react');
const { default: Order } = require('../../../../models/Order');

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('signin required');
  }

  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};
export default handler;
