const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    // deleteAt: Date,
    createdBy: {
        accountId: String,
        createdAt: Date
    },
    deletedBy: {
        accountId: String,
        deletedAt: Date
    },
    updatedBy: [
        {
            accountId: String,
            updatedAt: Date
        }
    ],
    featured: String
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product