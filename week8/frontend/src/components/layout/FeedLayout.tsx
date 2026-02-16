
import styled from "styled-components";
import AppHeader from "../common/AppHeader";
import Sidebar from "../common/Sidebar";

const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: calc(100vh - 70px);
`;

type FeedLayoutProps = {
  children: React.ReactNode;
};

const FeedLayout = ({ children }: FeedLayoutProps) => {
  return (
    <LayoutWrapper>
      <AppHeader />
      <BodyWrapper>
        <Sidebar />
        <MainContent>{children}</MainContent>
      </BodyWrapper>
    </LayoutWrapper>
  );
};

export default FeedLayout;
