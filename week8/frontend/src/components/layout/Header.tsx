
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { searchUsers } from "../../redux/slices/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import UserLink from "../common/UserLink";
import FollowButton from "../common/FollowButton";

const HeaderWrapper = styled.div`
  height: 70px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Brand = styled(Link)`
  font-weight: 700;
  color: #4338ca;
  text-decoration: none;
  font-size: 22px;
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 380px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border-radius: 25px;
  border: 1px solid #ddd;
  outline: none;
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 46px;
  width: 100%;
  background: #f9fafb;
  border-radius: 14px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  max-height: 300px;
  overflow-y: auto;
  padding: 8px 0;
  z-index: 50;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

const LeftPart = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Message = styled.div`
  padding: 20px;
  text-align: center;
  color: #6b7280;
  font-weight: 500;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAppSelector((state) => state.auth);
  const { searchResults, isLoading } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) return;

    debounceRef.current = setTimeout(() => {
      dispatch(searchUsers(query));
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <HeaderWrapper>
      <Brand to="/home">SocialGram</Brand>

      <CenterSection>
        <SearchWrapper ref={wrapperRef}>
          <SearchInput
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query.trim() && (
            <SearchDropdown>
              {isLoading && <Message>Searching...</Message>}

              {!isLoading && searchResults.length === 0 && (
                <Message>No users found</Message>
              )}

              {!isLoading &&
                searchResults.map((u) => (
                  <UserRow key={u._id}>
                    <LeftPart>
                      <UserLink user={u} size={35} />
                    </LeftPart>
                    <FollowButton userId={u._id} />
                  </UserRow>
                ))}
            </SearchDropdown>
          )}
        </SearchWrapper>
      </CenterSection>

      <RightSection>
        {user && <UserLink user={user} size={35} />}
        <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
      </RightSection>
    </HeaderWrapper>
  );
};

export default Header;