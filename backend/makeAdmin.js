const mongoose = require('mongoose');
const User = require('./models/user'); 
const email = 'snehapothi2002@gmail.com'; 

const makeAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found');
    process.exit(1);
  }

  user.isAdmin = true;

  await user.save();
  console.log(`✅ ${user.email} is now an admin!`);
  process.exit(0);
};

makeAdmin();