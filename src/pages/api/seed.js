// import Product from '../../../models/Product';

const { default: db } = require('@/utils/db');
const { default: data } = require('@/utils/dummyData');
const { default: User } = require('../../../models/User');
const { default: Product } = require('../../../models/Product');

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  const raps = await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: 'seeded successfully', text: raps });
};

export default handler;
