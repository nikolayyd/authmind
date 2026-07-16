import { Form } from '../components/auth/Form';

const SignUpPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans">
      <Form signingUp={true} />
    </div>
  );
};
export default SignUpPage;
