import { app } from "./app";
const port = 4500;
export const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
