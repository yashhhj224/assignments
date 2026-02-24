
import styled from "styled-components";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { FiHome, FiUsers, FiUser, FiPlusSquare } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;  
  padding: 12px 16px;
  border-radius: 12px;
  text-decoration: none;
  color: #374151;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  &.active {
    background: #ede9fe;
    color: #4338ca;
    font-weight: 600;
  }
`;

const ButtonItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;  
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active }) => ($active ? "#4338ca" : "#374151")};
  background: ${({ $active }) =>
    $active ? "#ede9fe" : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

const NewPostBtn = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  border-radius: 14px;
  background: linear-gradient(135deg,#4338ca,#6366f1);
  color: white;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 6px 14px rgba(67, 56, 202, 0.2);
  transition: all 0.2s ease;

  svg {
    font-size: 18px;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(67, 56, 202, 0.25);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 20px 0;
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

  const isProfileActive =
    location.pathname.startsWith("/profile");

  return (
    <Wrapper>
      <Section>
        <MenuItem to="/home">
          <FiHome />
          Home
        </MenuItem>

        <MenuItem to="/users">
          <FiUsers />
          Users
        </MenuItem>

        <ButtonItem
          onClick={handleProfileClick}
          $active={isProfileActive}
        >
          <FiUser />
          Profile
        </ButtonItem>
      </Section>

      <Divider />

      <NewPostBtn to="/create-post">
        <FiPlusSquare />
        New Post
      </NewPostBtn>
    </Wrapper>
  );
};

export default Sidebar;