import Category from "../models/category.js";
import Product from "../models/product.js";
import { categorySchema } from "../validations/category.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(400).json({
        message: "khong tim thay san pham !",
      });
    }

    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({
      message: "loi server!",
      error: err,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products");
    if (!category) {
      return res.status(404).json({
        message: "khong tim thay danh muc !",
      });
    }
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({
      message: "loi server!",
      error: err.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const category = await Category.create(req.body);
    if (!category) {
      return res.status(400).json({
        message: "them khong thanh cong!",
      });
    }
    return res.status(200).json({
      message: "thanh cong",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "loi server",
      error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Tìm danh mục "Chưa phân loại" hoặc tạo nếu chưa tồn tại
    let undefinedCategory = await Category.findOne({ name: "Chưa phân loại" });

    if (!undefinedCategory) {
      undefinedCategory = await Category.create({ name: "Chưa phân loại" });
    }

    //  Tìm và chuyển các sản phẩm liên quan sang danh mục "Uncategorized"
    const productsToUpdate = await Product.find({ categoryId: categoryId });
    console.log(productsToUpdate);
    await Category.findByIdAndUpdate(undefinedCategory._id, {
      $push: {
        products: {
          $each: productsToUpdate.map((product) => product._id),
        },
      },
    });

    // Xóa danh mục
    const category = await Category.findByIdAndDelete(req.params.id)

    // Cập nhật tất cả sản phẩm thuộc danh mục xóa để tham chiếu đến danh mục "Chưa phân loại"
    if (undefinedCategory) {
      await Product.updateMany(
        { categoryId },
        { categoryId: undefinedCategory._id }
      );
    }

    if (!category) {
      return res.status(400).json({
        message: "Xóa không thành công!",
      });
    }
    return res.status(200).json({
      message: "Thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const updateData = { ...req.body, updateAt: new Date() };
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!category) {
      return res.status(400).json({
        message: "sua khong thanh cong!",
      });
    }
    return res.status(200).json({
      message: "thanh cong",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "loi server",
      error,
    });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const categoryIds = req.body.categoryIds;

    let undefinedCategory = await Category.findOne({ name: "Chưa phân loại" });

    if (!undefinedCategory) {
      undefinedCategory = await Category.create({ name: "Chưa phân loại" });
    }

    const productsToUpdate = await Product.find({ categoryId: { $in: categoryIds } });

    if (productsToUpdate.length > 0) {
      await Category.findByIdAndUpdate(undefinedCategory._id, {
        $push: {
          products: {
            $each: productsToUpdate.map((product) => product._id),
          },
        },
      });

      await Product.updateMany(
        { categoryId: { $in: categoryIds } },
        { categoryId: undefinedCategory._id }
      );
    }

    const result = await Category.deleteMany({ _id: { $in: categoryIds } });

    if (!result || result.deletedCount === 0) {
      return res.status(400).json({
        message: "Xóa không thành công!",
      });
    }

    return res.status(200).json({
      message: "Thành công",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server",
      error,
    });
  }
};
