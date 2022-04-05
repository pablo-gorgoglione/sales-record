import { DataTypes, Optional, Model } from "sequelize";
import db from "../db/connection";

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  stock: number;
  category_id: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Product = db.define<ProductInstance>(
  "product",
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    updatedAt: false,
  }
);
export default Product;
