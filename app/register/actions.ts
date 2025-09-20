'use server';

import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { registrationFormSchema } from '../_lib/definitions';

export async function registerAction(prevState: any, formData: FormData) {
  const validatedFields = registrationFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register.',
    };
  }

  const { name, email, password } = validatedFields.data;

  const exist = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return {
      type: 'error',
      message: 'User already exists.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      type: 'error',
      message: 'Database Error: Failed to Register.',
    };
  }

  redirect('/login');
}
