const { default: db } = require('@/utils/db');
const { default: data } = require('@/utils/dummyData');
const { default: User } = require('../../../models/User');

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
