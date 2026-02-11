import styled from "styled-components";

export const AuthContainer = styled.div`
  max-width: 420px;
  margin: 70px auto;
  background: white;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

export const AuthTitle = styled.h1`
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: 700;
  color: #111827;
`;

export const AuthForm = styled.form`
  input {
    width: 100%;
    padding: 12px;
    margin-bottom: 14px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    outline: none;
    font-size: 15px;
  }

  input:focus {
    border-color: #2563eb;
    box-shadow: 0px 0px 0px 3px rgba(37, 99, 235, 0.2);
  }
`;

export const AuthButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  color: white;

  background: ${(props) =>
    props.$variant === "login"
      ? "linear-gradient(120deg, #16a34a, #15803d)"
      : "linear-gradient(120deg, #2563eb, #1d4ed8)"};

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }
`;

export const AuthFooter = styled.p`
  margin-top: 18px;
  text-align: center;
  font-size: 14px;
  color: #374151;

  a {
    color: #2563eb;
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
