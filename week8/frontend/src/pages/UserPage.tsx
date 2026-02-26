
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchAllUsers } from "../redux/slices/usersSlice";
import FollowersFollowingList from "../components/users/FollowersFollowingList";

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 140px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: white;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  z-index: 5;
`;

const DropdownItem = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(
    (state) => state.users
  );

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "followers" | "following"
  >("all");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <Container>
      <TopBar>
        <h2>Users</h2>

        <DropdownWrapper>
          <DropdownButton onClick={() => setOpen(!open)}>
            <span>
              {filter === "all"
                ? "All"
                : filter === "followers"
                ? "Followers"
                : "Following"}
            </span>
            <span>▾</span>
          </DropdownButton>

          {open && (
            <DropdownMenu>
              <DropdownItem
                onClick={() => {
                  setFilter("all");
                  setOpen(false);
                }}
              >
                All
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setFilter("followers");
                  setOpen(false);
                }}
              >
                Followers
              </DropdownItem>

              <DropdownItem
                onClick={() => {
                  setFilter("following");
                  setOpen(false);
                }}
              >
                Following
              </DropdownItem>
            </DropdownMenu>
          )}
        </DropdownWrapper>
      </TopBar>

      <FollowersFollowingList
        type="all"
        users={users}
        filter={filter}
      />
    </Container>
  );
};

export default UsersPage;