
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  width: 240px;
  background: white;
  border-right: 1px solid #e5e7eb;
`;

const BodyWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 40px 60px;
  background: #f3f4f6;
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
          <Outlet />
        </BodyWrapper>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default FeedLayout;