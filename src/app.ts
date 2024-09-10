import express, { Request, Response } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { loginHandler, logoutHandler } from './auth';
import { getProducts, addProduct, deleteProduct } from './products';
import { addToCart, getCart, checkoutCart } from './cart';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Static files
app.use(express.static('public'));

// Routes
app.post('/login', loginHandler);
app.post('/logout', logoutHandler);
app.get('/api/user', (req, res) => {
    if (req.session && req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('Not logged in');
    }
});
// Product routes
app.get('/products', getProducts);
app.post('/products/add', addProduct);
app.delete('/products/delete/:id', deleteProduct);

// Cart routes
app.post('/cart/add', addToCart);
app.get('/cart', getCart);
app.post('/cart/checkout', checkoutCart);

app.get('/', (req: Request, res: Response) => {
    if (req.session.user) {
      res.sendFile(path.join(__dirname, '../public/home.html'));
    } else {
      res.sendFile(path.join(__dirname, '../public/login.html'));
    }
  });
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
