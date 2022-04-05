import { DataTypes, Optional, Model } from "sequelize";
import db from "../db/connection";

interface ItemSaleAttributes {
  id: number;
  product_id: number;
  sale_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  profit: number;
}

interface ItemSaleCreationAttributes
  extends Optional<ItemSaleAttributes, "id"> {}
interface ItemsaleInstance
  extends Model<ItemSaleAttributes, ItemSaleCreationAttributes>,
    ItemSaleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const ItemSale = db.define<ItemsaleInstance>(
  "item_sale",
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
  },
  {
    updatedAt: false,
  }
);

export default ItemSale;
