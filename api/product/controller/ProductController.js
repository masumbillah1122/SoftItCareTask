const ERROR_LIST = require("../../helpers/errorList");
const ERROR_MESSAGE = require("../../helpers/errorMessage");
const ResponseStatus = require("../../helpers/responseStatus");
const Product = require("../../models/Product");
const Validator = require('validatorjs'); 
const mongoose = require("mongoose");
const Features = require('../../utils/Features');


class ProductController{
    async index(req, res, next) {
        const limit = 5;
        try {
            const productCount = await Product.countDocuments();
            const feature = new Features(
                Product.find({ _id: mongoose.Types.ObjectId(req.params.id) }),
                req.query)
                .search()
                .filter
                .pagination(limit)
                .exec()
            const products = await feature.query;
            if(!products.length){
                return res
                    .status(ERROR_LIST.HTTP_NO_CONTENT)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_NO_CONTENT));
            }
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, products));
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async show(req, res, next){
        try{
            const product = await Product.findOne({_id: req.params.id});
            if(product){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success(ERROR_MESSAGE.HTTP_OK, product));
            }
        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async create(req, res, next){
        try {
            const validate = new Validator(req.body, {
              name: "string|min:2|max:200|alpha",
              slug: "string",
            });
            if(validate.fails()){
                return res
                    .status(ERROR_LIST.HTTP_UNPROCESSABLE_ENTITY)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_UNPROCESSABLE_ENTITY, validate.errors.errors));
            }
            const exist = await Product.findOne({name: req.body.name, bnName: req.body.bnName});
            if(exist){
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.failure("Product already exist.", exist));
            }
            if (req.file) {
              req.body.image = req.file.path;
            }
            let create = new Product({
                ...req.body
            });
             await create.save();
                return res
                    .status(ERROR_LIST.HTTP_OK)
                    .send(ResponseStatus.success("product created successfully", create));
        } catch (err) {
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async update(req, res, next){
        try{
            let product = await Product.findById(req.params.id);
            if(!product){
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, {}));
            }
            product = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: false
            });
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("product update successfully", product));

        } catch(err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
    async remove(req, res, next){
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res
                    .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                    .send(ResponseStatus.failure("Product is not found with this id", {}));
            }
            await product.remove();
            return res
                .status(ERROR_LIST.HTTP_OK)
                .send(ResponseStatus.success("product remove successfully", {}));
        }catch (err){
            return res
                .status(ERROR_LIST.HTTP_INTERNAL_SERVER_ERROR)
                .send(ResponseStatus.failure(ERROR_MESSAGE.HTTP_INTERNAL_SERVER_ERROR, err));
        }
    }
}

module.exports = new ProductController();