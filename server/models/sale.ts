import { DataTypes, Optional, Model } from "sequelize";
import db from "../db/connection";

interface SaleAttributtes {
  id: number;
  user_id: number;
  total: number;
}

interface SaleCreationAttributes
  extends Optional<SaleAttributtes, "id" | "total"> {}

interface SaleInstace
  extends Model<SaleAttributtes, SaleCreationAttributes>,
    SaleAttributtes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Sale = db.define<SaleInstace>(
  "sale",
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: true,
    },
    total: { type: DataTypes.NUMBER, allowNull: true },
  },
  {
    updatedAt: false,
  }
);

export default Sale;
