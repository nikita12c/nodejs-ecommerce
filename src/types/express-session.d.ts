// types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      email: string;
      role: 'admin' | 'user';
    };
  }
}
