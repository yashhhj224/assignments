
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

const SidebarWrapper = styled.aside`
  width: 260px;
  min-height: calc(100vh - 70px);
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SidebarButton = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  text-align: left;

  &:hover {
    opacity: 0.9;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { authUser } = useAuth();

  return (
    <SidebarWrapper>
      <SidebarButton onClick={() => navigate("/")}>Home Feed</SidebarButton>

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
