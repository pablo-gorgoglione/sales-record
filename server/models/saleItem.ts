import { DataTypes, Optional, Model } from "sequelize";
import { db } from "../db/connection";

interface SaleItemAttributes {
  id: number;
  product_id: number;
  sale_id: number;
  quantity: number;
  unit_price: number;
  unit_cost: number;
  subtotal: number;
  profit: number;
}

interface SaleItemCreationAttributes
  extends Optional<SaleItemAttributes, "id"> {}
interface SaleItemInstance
  extends Model<SaleItemAttributes, SaleItemCreationAttributes>,
    SaleItemAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const SaleItem = db.define<SaleItemInstance>(
  "sale_item",
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    sale_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    subtotal: { type: DataTypes.NUMBER, allowNull: true },
    profit: { type: DataTypes.NUMBER, allowNull: true },
    quantity: { type: DataTypes.NUMBER, allowNull: false },
    unit_price: { type: DataTypes.NUMBER, allowNull: false },
    unit_cost: { type: DataTypes.NUMBER, allowNull: false },
  },
  {
    updatedAt: false,
    createdAt: false,
  }
);

export default SaleItem;
