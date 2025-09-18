'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

import { redirect } from 'next/navigation';


export async function registerAction(formData: FormData) {
  const nameValue = formData.get('name');
  const emailValue = formData.get('email');
  const passwordValue = formData.get('password');

  const name: string = nameValue?.toString() || '';
  const email: string = emailValue?.toString() || '';
  const password: string = passwordValue?.toString() || '';

  if (!name || !email || !password) {
    return { error: 'Missing fields' };
  }

  const exist = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return { error: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect('/login')
}
