import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';

  const token = await new SignJWT({
    id: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime('2h')
    .setIssuedAt()
    .setSubject(user.id)
    .sign(secret);

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2, // 2 hours
    path: '/',
  });

  return NextResponse.json({ message: 'Login successful' });
}
