import styled from "styled-components";

export const NotFoundContainer = styled.div`
  text-align: center;
  margin-top: 100px;
`;

export const NotFoundTitle = styled.h1`
  font-size: 60px;
  margin-bottom: 10px;
`;

export const NotFoundText = styled.p`
  font-size: 18px;
  font-weight: 800;
`;

export const NotFoundLink = styled.div`
  margin-top: 15px;

  a {
    color: #2563eb;
    font-weight: 800;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
