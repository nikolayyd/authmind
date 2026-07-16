'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signInSchema,
  // SignInInput,
  signUpSchema,
  // SignUpInput,
} from '@/lib/schemas/auth';
import styles from './Form.module.css';

interface FormProps {
  signingUp: boolean;
}

export const Form = ({ signingUp }: FormProps) => {
  const schema = signingUp ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = () => {};
  const onInvalid = () => {};

  return (
    <div>
      <div className={styles.container}>
        <h1 className="self-center text-4xl font-bold">AuthMind</h1>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex flex-col gap-2 my-8"
        >
          {signingUp && (
            <div className="flex gap-1">
              {' '}
              <input
                {...register('firstName')}
                type="text"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                placeholder="First Name"
              />
              <input
                {...register('lastName')}
                type="text"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                placeholder="Last Name"
              />
            </div>
          )}
          <input
            {...register('email')}
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="Email"
          />
          <input
            {...register('password')}
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder="Password"
          />
          {signingUp && (
            <input
              {...register('confirmPassword')}
              type="password"
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              placeholder="Confirm password"
            />
          )}
          <button className={styles.button} type="submit">
            {signingUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        {!isSubmitted && (
          <p className={styles.paragraph}>
            {signingUp
              ? 'You already have an account?'
              : "Don't have an account?"}{' '}
            <Link
              href={signingUp ? '/sign-in' : '/sign-up'}
              className={styles.link}
            >
              {signingUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </p>
        )}
        {isSubmitted && Object.keys(errors).length > 0 && (
          <div className={styles.globalError}>
            Please correct the errors in the form and try again.
          </div>
        )}
      </div>
    </div>
  );
};
