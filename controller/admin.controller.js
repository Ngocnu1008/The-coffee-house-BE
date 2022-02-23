require("dotenv").config();
const { BadRequest, Success } = require("../handler/response.handler");
const logger = require("../handler/logger.handler");
const { ParentType, Product } = require("../model/index.model");
const AWS = require("aws-sdk");
const ID = process.env.ID_AWS;
const SECRET = process.env.SECRET_AWS;
const BUCKET_NAME = "the-coffee-house";
const fs = require("fs");
const path = require("path");

async function GetAllProduct(req, res) {
  try {
    logger.info("Get all product");

    const product = await Product.findAll();

    res.json(product);
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}
async function getAllGroup(_req, res) {
  try {
    logger.info(`get all group`);

    const group = await ParentType.findAll({ order: [["createdAt", "desc"]] });

    // "select * from group order by createAt desc";

    res.json(group);
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}

async function AddProduct(req, res) {
  try {
    logger.info(`Add product controller`);
    var { id_group, name, cost, price, description, story, attachment } =
      req.body;

    await Product.create({
      id_group,
      name,
      cost,
      price,
      description,
      story,
      attachment,
    });
    Success(res, { Success: true });
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}
async function Addgroup(req, res) {
  try {
    logger.info(`Add group controller`);
    var name = req.name; //lúc này đặt biến name = req.name (cái key đã được thêm vào từ req bên miidleware)

    await ParentType.create({
      name,
    });

    Success(res, { Success: true });
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}
async function EditProduct(req, res) {
  try {
    logger.info(`Edit product controller`);

    var { id, id_group, name, cost, price, description, story, attachment } =
      req.body;

    await Product.update(
      {
        id_group,
        name,
        cost,
        price,
        description,
        story,
        attachment,
        updateAt: new Date(),
      },
      {
        where: {
          id,
        },
      }
    );
    Success(res, { success: true });
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}

async function DeleteProduct(req, res) {
  try {
    logger.info(`delete product controller`);
    var { id } = req.params;

    await Product.destroy({ where: { id } });
    Success(res, { success: true });
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}

async function EditGroup(req, res) {
  try {
    logger.info(`Edit group controller`);

    var { id, name } = req.body;

    await ParentType.update(
      { name },
      {
        where: { id },
      }
    );
    Success(res, { success: true }); 
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}

async function DeleteGroup(req, res) {
  try {
    logger.info(`Delete parenttype controller`);

    var { id } = req.query;

    //check parent's product in Product exist?
    const check = await Product.findAll({
      where: { id_group: id }, 
    });

    if (check.length > 0) {
      return BadRequest(res, "Parent contains products, pls check again");
    }

    await ParentType.destroy({
      where: { id },
    });

    Success(res, { success: true });
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}

//setup S3
const s3 = new AWS.S3({
  accessKeyId: ID, 
  secretAccessKey: SECRET,
});

async function UpLoadImg(req, res) {
  try {
    const fileContent = fs.readFileSync(
      `${path.join(__dirname, "../" + "public/file-1644657840954.png")}`);

    const params = {
      Bucket: BUCKET_NAME, 
      CreateBucketConfiguration: {
        LocationConstraint: "ap-southeast-1",
      },
      Key: "dog.jpg",
      Body: fileContent,
      ACL: "read"
    };
     //uploading files to the bucket:
     s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    })
  } catch (error) {
    logger.error(error.message);
    console.error(error);
    BadRequest(res, "Somthing went wrong, pls try again");
  }
}

module.exports = {
  AddProduct,
  Addgroup,
  EditProduct,
  DeleteProduct,
  EditGroup,
  DeleteGroup,
  GetAllProduct,
  getAllGroup,
  UpLoadImg
};
