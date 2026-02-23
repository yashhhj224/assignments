
import AuthLayout from "../components/auth/AuthLayout";
import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      left={<AuthLeftPanel />}
      right={<RegisterForm />}
    />
  );
};

export default RegisterPage;