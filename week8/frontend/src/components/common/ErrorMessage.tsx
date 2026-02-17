
import { ErrorWrapper } from "../../styles/components/errorMessageStyles";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <ErrorWrapper>{message}</ErrorWrapper>;
};

export default ErrorMessage;
