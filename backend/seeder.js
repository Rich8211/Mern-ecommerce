const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./config/db');
const users = require('./data/users');
const products = require('./data/products');
const dotenv = require('dotenv');

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!')
        process.exit()
    }

    catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

importData()
