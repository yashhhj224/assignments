
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f3f4f6;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const SidebarWrapper = styled.div`
  width: 260px;
  background: white;
  border-right: 1px solid #e5e7eb;

  @media (max-width: 1024px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    padding-bottom: 70px;
  }
`;

const CenterContainer = styled.div`
  width: 100%;
  max-width: 760px;
  padding: 40px 0 80px 0;

  @media (max-width: 768px) {
    padding: 20px 16px 80px 16px;
  }
`;

const FeedLayout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <ContentWrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        <BodyWrapper>
          <CenterContainer>
            <Outlet />
          </CenterContainer>
        </BodyWrapper>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default FeedLayout;