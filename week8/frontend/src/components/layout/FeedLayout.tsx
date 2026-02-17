
import AppHeader from "../common/AppHeader";
import Sidebar from "../common/Sidebar";

import {
  BodyWrapper,
  LayoutWrapper,
  MainContent
} from "../../styles/components/layoutStyles";

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
