'use server';
export async function logoutAction() {

  // Expira la cookie del token en el servidor
  try {
    // usamos la firma que ya tienes en el route: cookies().set(name, value, options)
    const { cookies } = await import('next/headers');
    cookies().set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1,
      path: '/',
    });
  } catch (err) {
    // no queremos romper la action por un fallo menor; redirigimos de todas formas
    console.error('Logout action error:', err);
  }

  // Redirige al login (o a la página principal si prefieres)
  const { redirect } = await import('next/navigation');
  redirect('/login');
}
