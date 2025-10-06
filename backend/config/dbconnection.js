const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Remove the deprecated options: useNewUrlParser and useUnifiedTopology
    await mongoose.connect('mongodb+srv://vanshaj:vanshaj@cluster0.drtwln4.mongodb.net/', {
      // You can remove the options entirely if you are only using the URI
    });
    console.log('MongoDB Connected ✅');
  } catch (error) {
    console.error('MongoDB Connection Error ❌:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;