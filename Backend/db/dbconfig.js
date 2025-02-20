const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DbConnectionFunction = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("✅ The Database is connected successfully");
    } catch (err) {
        console.error("❌ Error connecting to the database:", err);
    }
};

module.exports = DbConnectionFunction;
