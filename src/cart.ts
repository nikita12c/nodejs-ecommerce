import { Request, Response } from 'express';
import { products } from './products';

interface CartItem {
    productId: number;
    quantity: number;
}

let cart: CartItem[] = [];

interface Cart {
  items: CartItem[];
  shippingAddress?: string;
}

const carts: Record<string, Cart> = {};

export const addToCart = (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    res.status(200).send('Product added to cart');
};

export const getCart = (req: Request, res: Response) => {
    const detailedCart = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { product, quantity: item.quantity };
    });
    res.json(detailedCart);
};

export const checkoutCart = (req: Request, res: Response) => {
  const { shippingAddress } = req.body;

  if (cart.length === 0) {
      return res.status(400).send('Your cart is empty.');
  }

  console.log('Order placed with shipping address:', shippingAddress);

  // Clear the cart
  cart = [];

  res.status(200).send('Checkout successful. Your order will be shipped to ' + shippingAddress);
};