import { DataTypes, Optional, Model } from "sequelize";
import { db } from "../db/connection";
import Sale from "./sale";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  lastname: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = db.define<UserInstance>(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
  },
  {
    updatedAt: false,
  }
);
User.hasMany(Sale, {
  sourceKey: "id",
  foreignKey: "user_id",
  as: "sales",
});

Sale.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default User;
