import { ErrorBox } from "../styles/CommonStyles";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <ErrorBox>{message}</ErrorBox>;
}
