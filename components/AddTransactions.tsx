'use client';

import addTransaction from '@/app/actions/addTransaction';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { Button } from './ui/button';

/**
 * A client component for adding a new transaction.
 * It provides a form for the user to enter the transaction details.
 * When the form is submitted, it calls the `addTransaction` server action.
 *
 * @returns {JSX.Element} The form for adding a new transaction.
 */
const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * An async function that is called when the form is submitted.
   * It calls the `addTransaction` server action and handles the response.
   * If the action is successful, it shows a success toast and resets the form.
   * If there is an error, it shows an error toast.
   *
   * @param {FormData} formData - The data from the form.
   */
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added');
      formRef.current?.reset();
    }
  };

  return (
    <>
      <h3>Add transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input type='text' name='text' id='text' placeholder='text...' />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='enter amount...'
            step='0.01'
          />
        </div>
        <Button className='btn'>Add Transaction</Button>
      </form>
    </>
  );
};

export default AddTransaction;
