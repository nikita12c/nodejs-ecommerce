import { Request, Response } from 'express';

interface UserSession {
  email: string;
  role: 'admin' | 'user';
}

const users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'user@example.com', password: 'user123', role: 'user' }
];

export const loginHandler = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    req.session.user = { email: user.email, role: user.role } as UserSession;
    res.redirect('/'); 
  } else {
    res.status(401).send('Invalid email or password.');
  }
};

export const logoutHandler = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out.');
    } else {
      res.redirect('/'); // Redirect to home page after logging out
    }
  });
};
