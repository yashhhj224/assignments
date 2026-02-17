
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import {
  SidebarButton,
  SidebarWrapper
} from "../../styles/components/layoutStyles";

const Sidebar = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  return (
    <SidebarWrapper>
      <SidebarButton onClick={() => navigate("/")}>
        Home Feed
      </SidebarButton>

      <SidebarButton onClick={() => navigate("/create-post")}>
        Create Post
      </SidebarButton>

      {authUser ? (
        <SidebarButton onClick={() => navigate(`/profile/${authUser.id}`)}>
          My Profile
        </SidebarButton>
      ) : null}
    </SidebarWrapper>
  );
};

export default Sidebar;
