CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email varchar(50) NOT NULL,
    password varchar(30) NOT NULL,
    name varchar(20) NOT NULL,
    lastname varchar(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total decimal(16,2),
    FOREIGN KEY (user_id) REFERENCES users(id) 
);

CREATE TABLE categories (
 id INT auto_increment PRIMARY KEY,
 name varchar(30) NOT NULL
);
 
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name varchar(20) NOT NULL,
    description varchar(50),
    stock INT,
    FOREIGN KEY (category_id) references categories(id)
);

CREATE TABLE  price (
    product_id INT NOT NULL,
    unit_price decimal(16,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (product_id, created_at)
);

CREATE TABLE  cost (
    product_id INT NOT NULL,
    unit_cost decimal(16,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (product_id, created_at)
);

CREATE TABLE item_sale (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL, 
    unit_price decimal(16,2),
    subtotal decimal(16,2) NOT NULL,
    profit decimal(16,2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (sale_id, product_id)
);
