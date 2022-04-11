import { DataTypes, Model, Optional } from "sequelize";
import db from "../db/connection";

interface CategoryAttributes {
  id: number;
  name: string;
}
interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}
interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Category = db.define<CategoryInstance>(
  "categories",
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
  },
  {
    updatedAt: false,
  }
);

export default Category;
