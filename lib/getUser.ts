import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/lib/db';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUser() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = await db.user.findUnique({
      where: {
        id: payload.id as string,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}
