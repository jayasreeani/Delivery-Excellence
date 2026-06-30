import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'management' | 'client';
}

export function signToken(user: AuthUser): string {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-in-production';
  return jwt.sign(user, secret, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
}

export function verifyToken(token: string): AuthUser {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-in-production';
  return jwt.verify(token, secret) as AuthUser;
}

export async function loginUser(email: string, password: string) {
  const result = await query<{ id: string; email: string; name: string; role: 'management' | 'client'; password_hash: string }>(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    throw new Error('Invalid credentials');
  }
  const authUser: AuthUser = { id: user.id, email: user.email, name: user.name, role: user.role };
  return { token: signToken(authUser), user: authUser };
}

export async function getUserById(id: string): Promise<AuthUser | null> {
  const result = await query<AuthUser>(
    'SELECT id, email, name, role FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0] || null;
}

export function getBearerUser(req: Request): AuthUser | null {
  const header = req.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;
  try {
    return verifyToken(header.slice(7));
  } catch {
    return null;
  }
}
