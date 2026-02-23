
import styled from "styled-components";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const SidebarWrapper = styled.div`
  width: 240px;
  height: 100%;
  background: white;
  border-right: 1px solid #e5e7eb;
`;

const MenuItem = styled(NavLink)`
  display: block;
  padding: 14px 18px;
  margin-bottom: 12px;
  border-radius: 12px;
  text-decoration: none;
  color: #374151;
  font-weight: 500;

  &.active {
    background: #4338ca;
    color: white;
  }
`;

const ButtonItem = styled.div<{ $active?: boolean }>`
  display: block;
  padding: 14px 18px;
  margin-bottom: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "white" : "#374151")};
  background: ${({ $active }) =>
    $active ? "#4338ca" : "transparent"};
`;

const NewPostBtn = styled(NavLink)`
  display: block;
  margin-top: 20px;
  padding: 14px;
  text-align: center;
  border-radius: 12px;
  background: #4338ca;
  color: white;
  text-decoration: none;
  font-weight: 600;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const handleProfileClick = () => {
    if (user?._id) {
      navigate(`/profile/${user._id}`);
    }
  };

  const isProfileActive = location.pathname.startsWith("/profile");

  return (
    <SidebarWrapper>
      <MenuItem to="/home">Home</MenuItem>

      <MenuItem to="/users">Users</MenuItem>

      <ButtonItem
        onClick={handleProfileClick}
        $active={isProfileActive}
      >
        Profile
      </ButtonItem>

      <NewPostBtn to="/create-post">
        + New Post
      </NewPostBtn>
    </SidebarWrapper>
  );
};

export default Sidebar;