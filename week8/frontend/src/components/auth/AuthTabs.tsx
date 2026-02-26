

import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const TabsWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
`;

const TabItem = styled.div<{ active?: boolean }>`
  font-weight: 600;
  cursor: pointer;
  color: ${({ active }) => (active ? "#4338ca" : "#94a3b8")};
  transition: color 0.3s ease;
`;

const Underline = styled.div<{ left: number; width: number }>`
  position: absolute;
  bottom: -6px;
  height: 3px;
  background: #4338ca;
  border-radius: 10px;
  transition: all 0.3s ease;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
`;

const AuthTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginRef = useRef<HTMLDivElement>(null);
  const registerRef = useRef<HTMLDivElement>(null);

  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const isLogin = location.pathname === "/login";

  useEffect(() => {
    const activeRef = isLogin ? loginRef.current : registerRef.current;
    if (activeRef) {
      setUnderline({
        left: activeRef.offsetLeft,
        width: activeRef.offsetWidth
      });
    }
  }, [isLogin]);

  return (
    <TabsWrapper>
      <TabItem
        ref={loginRef}
        active={isLogin}
        onClick={() => navigate("/login")}
      >
        Login
      </TabItem>

      <TabItem
        ref={registerRef}
        active={!isLogin}
        onClick={() => navigate("/register")}
      >
        Register
      </TabItem>

      <Underline left={underline.left} width={underline.width} />
    </TabsWrapper>
  );
};

export default AuthTabs;