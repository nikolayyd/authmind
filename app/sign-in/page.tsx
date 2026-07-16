import { Form } from '../components/auth/Form';

const SignInPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans">
      <Form signingUp={false} />
    </div>
  );
};
export default SignInPage;
