
import { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { hideToast } from "../../redux/slices/toastSlice";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(37, 99, 235, 0.25);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2147483647;
`;

const ModalBox = styled.div`
  background: #1e293b;
  padding: 40px 50px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
  text-align: center;
  animation: scaleIn 0.25s ease forwards;

  @keyframes scaleIn {
    from {
      transform: scale(0.85);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  animation: pop 0.3s ease;

  @keyframes pop {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const CheckMark = styled.div`
  color: white;
  font-size: 34px;
  font-weight: 900;
`;

const Message = styled.div`
  font-size: 18px;
`;

const GlobalToast = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.toast.message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <Overlay onClick={() => dispatch(hideToast())}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <CheckMark>✓</CheckMark>
        </IconWrapper>
        <Message>{message}</Message>
      </ModalBox>
    </Overlay>
  );
};

export default GlobalToast;
