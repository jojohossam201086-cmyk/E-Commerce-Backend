require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const Product = require("./models/productModel");
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();
    await Category.deleteMany();

    const category = await Category.create({
      name: "Electronics",
      description: "Electronic devices",
    });

    await Product.insertMany([
      {
        name: "Lenovo Legion 5",
        price: 45000,
        stock: 10,
        category: category._id,
      },
      {
        name: "Dell XPS 13",
        price: 55000,
        stock: 7,
        category: category._id,
      },
      {
        name: "HP Victus",
        price: 39000,
        stock: 15,
        category: category._id,
      },
    ]);

    console.log("Data Seeded Successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();