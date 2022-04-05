import { DataTypes, Optional, Model } from "sequelize";
import db from "../db/connection";

interface CostAttributes {
  product_id: number;
  unit_cost: number;
  createdAt: string;
}
interface CostCreationAttributes
  extends Optional<CostAttributes, "product_id"> {}

interface CostInstance
  extends Model<CostAttributes, CostCreationAttributes>,
    CostAttributes {}
const Cost = db.define<CostInstance>(
  "cost",
  {
    product_id: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
    createdAt: { type: DataTypes.DATE, primaryKey: true, allowNull: false },
    unit_cost: { type: DataTypes.NUMBER, allowNull: false },
  },
  {
    updatedAt: false,
    createdAt: false,
  }
);

export default Cost;
