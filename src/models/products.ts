import { dbQuery, dbQueryFirst } from "../services/db";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};
 
const insertProduct = async (product: Product) => {
  await dbQuery(`INSERT INTO product (name, price, category) VALUES(?, ?, ?)`, [
    product.name,
    product.price,
    product.category
  ]);
  let retorno = await dbQuery(`SELECT * FROM product`);
  return getProduct(retorno[0].Id);
};

const updateProduct = async (product: Product) => {
  await dbQuery(
    `UPDATE product SET name = ?, price = ?, category = ? WHERE id = ?`,
    [product.name, product.price, product.id, product.category]
  );
  return getProduct(product.id);
};

const listProducts = async () => {
  const retorno = await dbQuery(`SELECT * FROM product`);
  return retorno as Product[];
};

const getProduct = async (id: number) => {
  const retorno = await dbQueryFirst(`SELECT * FROM product WHERE id = ?`, [
    id,
  ]);
  return retorno as Product | undefined;
};

const getProductByName = async (name: string) => {
  const retorno = await dbQueryFirst(`SELECT * FROM product WHERE name = ?`, [
    name,
  ]);
  return retorno as Product | undefined;
};

const deleteProduct = async (id: number) => {
  await dbQueryFirst(`DELETE FROM product WHERE id = ?`, [id]);
};

/* Exportar módulos */
export const productModel = {
  insertProduct,
  listProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductByName,
};
