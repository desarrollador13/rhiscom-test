-- 1. Crea la tabla solo si no existe
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL
);

-- 2. Crea el índice solo si no existe
CREATE INDEX IF NOT EXISTS idx_products_name ON products (name);

-- 3. Inserta los datos sin duplicarlos (Evita filas repetidas si se ejecuta de nuevo)
INSERT INTO products (name, price, stock) 
VALUES
('Laptop Gamer', 1250.50, 15),
('Teclado Mecánico', 45.99, 30),
('Mouse Inalámbrico', 25.00, 50)
ON CONFLICT DO NOTHING; 

--docker compose down -v
--docker compose up -d
