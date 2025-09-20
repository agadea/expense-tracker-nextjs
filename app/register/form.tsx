'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { registrationFormSchema } from '../_lib/definitions';
import { registerAction } from './actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const initialState = {
  message: '',
  errors: {},
  type: '',
};

export function RegisterForm() {
  const [state, formAction] = useFormState(registerAction, initialState);
  const { pending } = useFormStatus();

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (state?.type === 'error') {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='John Doe' {...field} />
              </FormControl>
              <FormMessage>
                {state?.errors?.name && state.errors.name[0]}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@example.com' {...field} />
              </FormControl>
              <FormMessage>
                {state?.errors?.email && state.errors.email[0]}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='******' {...field} />
              </FormControl>
              <FormMessage>
                {state?.errors?.password && state.errors.password[0]}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button disabled={pending}>
          Register
        </Button>
      </form>
    </Form>
  );
}
