// /app/components/auth/

'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
  signInSchema,
  SignUpInput,
  signUpSchema,
} from '@/lib/schemas/user.schema';
import styles from './Form.module.css';
import { useState } from 'react';
import { signIn, signUp } from '@/lib/services/auth.service';
import { useRouter } from 'next/navigation';

interface FormProps {
  signingUp: boolean;
}

export const Form = ({ signingUp }: FormProps) => {
  const router = useRouter();
  const schema = signingUp ? signUpSchema : signInSchema;
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: SignUpInput) => {
    setServerError(null);
    try {
      if (signingUp) {
        await signUp(data);
      } else {
        await signIn(data);
      }
      router.push('/dashboard');
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Something went wrong',
      );
      reset(data, { keepValues: true, keepIsSubmitted: false });
    }
  };
  const onInvalid = () => {};

  return (
    <div>
      <div
        className={` ${styles.container} ${!signingUp ? styles.signIn : ''} `}
      >
        <h1 className="self-center text-4xl font-bold">AuthMind</h1>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          onChange={() => {
            setServerError(null);
          }}
          className="flex flex-col gap-2 my-8"
        >
          {signingUp && (
            <div className={styles.nameContainer}>
              {' '}
              <div
                className={`${styles.divInput} ${errors.firstName ? styles.inputError : ''}`}
              >
                <input
                  {...register('firstName')}
                  type="text"
                  className={styles.input}
                  placeholder="First Name"
                />
              </div>
              <div
                className={`${styles.divInput} ${errors.lastName ? styles.inputError : ''}`}
              >
                <input
                  {...register('lastName')}
                  type="text"
                  className={styles.input}
                  placeholder="Last Name"
                />
              </div>
            </div>
          )}
          <div
            className={`${styles.divInput} ${errors.email ? styles.inputError : ''}`}
          >
            <input
              {...register('email')}
              className={styles.input}
              type="email"
              placeholder="Email"
            />
          </div>
          <div
            className={`${styles.divInput} ${errors.password ? styles.inputError : ''}`}
          >
            <input
              {...register('password')}
              type={isPasswordVisible ? 'text' : 'password'}
              className={styles.input}
              placeholder="Password"
            />
            <div className={styles.passwordIcon}>
              {isPasswordVisible ? (
                <FaEyeSlash onClick={() => setIsPasswordVisible(false)} />
              ) : (
                <FaEye onClick={() => setIsPasswordVisible(true)} />
              )}
            </div>
          </div>
          {signingUp && (
            <div
              className={`${styles.divInput} ${errors.confirmPassword ? styles.inputError : ''}`}
            >
              <input
                {...register('confirmPassword')}
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                className={styles.input}
                placeholder="Confirm password"
              />
              <div className={styles.passwordIcon}>
                {isConfirmPasswordVisible ? (
                  <FaEyeSlash
                    onClick={() => setIsConfirmPasswordVisible(false)}
                  />
                ) : (
                  <FaEye onClick={() => setIsConfirmPasswordVisible(true)} />
                )}
              </div>
            </div>
          )}
          <button className={styles.button} type="submit">
            {signingUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        {serverError && <div className={styles.globalError}>{serverError}</div>}
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
        {isSubmitted && Object.keys(errors).length > 0 && (
          <div className={styles.globalError}>
            {Object.values(errors).map((error, index) => (
              <div key={index}>{error?.message as string}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
