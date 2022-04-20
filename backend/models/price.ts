import { DataTypes, Optional, Model } from "sequelize";
import { db } from "../db/connection";

interface PriceAttributes {
  product_id: number;
  unit_price: number;
  createdAt: string;
}
export interface PriceInstance
  extends Model<PriceAttributes>,
    PriceAttributes {}
const Price = db.define<PriceInstance>(
  "price",
  {
    product_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    createdAt: { type: DataTypes.DATE, primaryKey: true, allowNull: false },
    unit_price: { type: DataTypes.NUMBER, allowNull: false },
  },
  {
    updatedAt: false,
    createdAt: false,
  }
);

export default Price;
