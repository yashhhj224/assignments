
import AuthLayout from "../components/auth/AuthLayout";
import AuthLeftPanel from "../components/auth/AuthLeftPanel";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthLayout
      left={<AuthLeftPanel />}
      right={<LoginForm />}
    />
  );
};

export default LoginPage;