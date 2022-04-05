import jwt from "jsonwebtoken";

const generateToken = (id: number) => {
  const secret: string = process.env.JWT_SECRET as string;
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
