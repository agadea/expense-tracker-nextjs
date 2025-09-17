'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

/**
 * Server action to handle user login.
 * This function processes the login form data, verifies user credentials,
 * creates a JWT token, sets it in an HTTP-only cookie, and redirects to the home page on success.
 * @param formData - FormData object containing 'email' and 'password' fields.
 * @returns A promise that resolves and redirects on success, or returns an error message on failure.
 */
export async function loginAction(formData: FormData): Promise<{
  error?: string;
}> {

  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');

  if (!emailValue || emailValue === '' || !passwordValue || passwordValue === '') {
    return { error: 'Email or password is missing' };
  }

  const email: string = emailValue.toString();
  const password: string = passwordValue.toString();

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) {
    return { error: 'User not found' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: 'Invalid password' };
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';

  const token = await new SignJWT({
    id: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg })
    .setExpirationTime('30m')
    .setIssuedAt()
    .setSubject(user.id)
    .sign(secret);

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 30, // 30 minutes
    path: '/'
  });

  redirect('/');
}
