const Product = require("../../models/product.model");
const filterStateHelper = require("../../helpers/filter-state.helper");
// [GET] /admin/products/
module.exports.index = async (req, res) => {
    // Status filter
    const filterState = filterStateHelper(req.query);
    // End Status filter
    const find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status;
    }
    if(req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
    const products = await Product.find(find);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterState: filterState,
        keyword: req.query.keyword
    });
}