'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export async function logoutAction() {

  // Expira la cookie del token en el servidor
  try {
    //! esto solo retira el token del navegador, no invalida la session en el servidor 
    cookies().delete(
      'token',
    );
  } catch (err) {
    // no queremos romper la action por un fallo menor; redirigimos de todas formas
    console.error('Logout action error:', err);
  }

  // Redirige al login (o a la página principal si prefieres)
  redirect('/login');
}
