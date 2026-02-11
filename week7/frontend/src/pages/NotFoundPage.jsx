import { Link } from "react-router-dom";
import { NotFoundContainer, NotFoundTitle, NotFoundText, NotFoundLink } from "../styles/NotFoundStyles";

export default function NotFoundPage() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Page not found</NotFoundText>

      <NotFoundLink>
        <Link to="/">Go to Login</Link>
      </NotFoundLink>
    </NotFoundContainer>
  );
}
