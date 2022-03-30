import mysql, { Connection, PoolConnection } from "mysql";

// Test Operation
export const getAllUsers = (connection: Connection, callback: any) => {
  const insertQuery = `SELECT id, name, email, 'Nombre' FROM users ORDER BY id ASC`;
  connection.query(insertQuery, (err: any, result: any) => {
    if (err) throw err;
    callback(result);
  });
};

/* USER OPERATIONS */

//searchs if any user has that email
export const findByEmail = (
  connection: PoolConnection,
  email: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const insertQuery = `SELECT email FROM users WHERE users.email=?`;
    connection.query(insertQuery, [email], (err: any, result: string[]) => {
      if (err) reject(err);
      if (!result[0]) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export const saveOne = (connection: Connection, user: User) => {
  const insertQuery = `INSERT INTO users (email, password, name, lastname) VALUES (?,?,?,?)`;
  return new Promise((resolve, reject) => {
    connection.query(
      insertQuery,
      [user.email, user.password, user.name, user.lastname],
      (err: any, result: any) => {
        if (err) reject(new Error(err.message ? err.message : err));
        resolve(result);
      }
    );
  });
};
