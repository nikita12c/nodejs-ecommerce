import { Request, Response } from 'express';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

export const products: Product[] = [
  {
    id: 1,
    image: 'https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725926400&semt=ais_hybrid',
    title: 'Product 1',
    description: 'Description of Product 1',
    price: 29.99
  },
  {
    id: 2,
    image: 'https://img.freepik.com/free-photo/purple-osteospermum-daisy-flower_1373-16.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725926400&semt=ais_hybrid',
    title: 'Product 2',
    description: 'Description of Product 2',
    price: 39.99
  }
];

// Get all products
export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

// Add a new product (Super Admin only)
export const addProduct = (req: Request, res: Response) => {
  const { image, title, description, price } = req.body;
  
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Forbidden: Only admins can add products.');
  }

  const newProduct: Product = {
    id: products.length + 1,
    image,
    title,
    description,
    price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Update an existing product (Super Admin only)
export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  const { image, title, description, price } = req.body;

  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Forbidden: Only admins can update products.');
  }

  const product = products.find(p => p.id === parseInt(id, 10));
  if (product) {
    product.image = image;
    product.title = title;
    product.description = description;
    product.price = price;
    res.json(product);
  } else {
    res.status(404).send('Product not found.');
  }
};

// Delete a product (Super Admin only)
export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Forbidden: Only admins can delete products.');
  }

  const index = products.findIndex(p => p.id === parseInt(id, 10));
  if (index > -1) {
    products.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).send('Product not found.');
  }
};

