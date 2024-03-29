const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/create-tree.helper");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false
    });
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    });
};
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false,
    });

    const newRecords = createTreeHelper(records);

    console.log(newRecords);

    res.render("admin/pages/products-category/create", {
        pageTitle: "Thêm mới danh mục sản phẩm",
        records: newRecords
    });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
    if (res.locals.role.permissions.includes("products-category_create")) {
        if (req.body.position == "") {
            const countRecords = await ProductCategory.countDocuments();
            req.body.position = countRecords + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }
        const record = new ProductCategory(req.body);
        await record.save();
        req.flash("success", "Thêm mới danh mục sản phẩm thành công!");
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    } else {
        res.send("403");
    }

};
// [PATCH] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await ProductCategory.updateOne({
        _id: id
    }, {
        status: status
    });
    req.flash('success', 'Cập nhật trạng thái thành công!');


    res.redirect("back");
}
// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const data = await ProductCategory.findOne({
            _id: req.params.id,
            deleted: false
        });

        console.log(data);

        const records = await ProductCategory.find({
            deleted: false,
        });

        const newRecords = createTreeHelper(records);

        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        if (req.body.position == "") {
            const countRecords = await ProductCategory.countDocuments();
            req.body.position = countRecords + 1;
        } else {
            req.body.position = parseInt(req.body.position);
        }

        await ProductCategory.updateOne({
            _id: req.params.id,
            deleted: false
        }, req.body);

        req.flash("success", "Cập nhật danh mục sản phẩm thành công!");

        res.redirect(`back`);
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
};
// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductCategory.findOne({
            _id: id,
            deleted: false
        });
        console.log(product)
        res.render("admin/pages/products-category/detail", {
            pageTitle: "Chi tiết danh mục sản phẩm",
            product: product
        })
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
}