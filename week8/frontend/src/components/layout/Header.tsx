
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { searchUsers } from "../../redux/slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchModal from "../ui/SearchModal";

const HeaderWrapper = styled.div`
  height: 70px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Brand = styled.h2`
  font-weight: 700;
  color: #4338ca;
`;

const SearchInput = styled.input`
  width: 350px;
  padding: 10px 16px;
  border-radius: 25px;
  border: 1px solid #ddd;
  outline: none;
`;

const LogoutBtn = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  background: #ef4444;
  color: white;
  border: none;
  cursor: pointer;
`;

const Header = () => {
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchUsers(query));
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [query, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <>
      <HeaderWrapper>
        <Brand>SocialGram</Brand>

        <SearchInput
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      </HeaderWrapper>

      {showModal && (
        <SearchModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Header;