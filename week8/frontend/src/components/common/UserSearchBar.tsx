
import { useEffect, useRef, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useFollow } from "../../hooks/useFollow";
import { resolveImageUrl } from "../../utils/url";
import {
  SearchWrapper,
  SearchInput,
  SearchDropdown,
  SearchItem,
  SearchAvatar,
  SearchInfo,
  SearchUsername,
  SearchButton
} from "../../styles/components/searchStyles";

const UserSearchBar = () => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { searchUsers, searchResults } = useUsers();
  const { followUser, unfollowUser, isFollowing } = useFollow();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length > 1) {
      searchUsers(trimmed);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFollowToggle = (userId: string, username: string) => {
    if (isFollowing(userId)) {
      const confirmUnfollow = window.confirm(
        `Do you want to unfollow: ${username}?`
      );

      if (!confirmUnfollow) return;

      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  return (
    <SearchWrapper ref={wrapperRef}>
      <SearchInput
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showDropdown && searchResults.length > 0 && (
        <SearchDropdown>
          {searchResults.map((user) => (
            <SearchItem key={user._id}>
              <SearchAvatar
                src={
                  user.profilePic
                    ? resolveImageUrl(user.profilePic)
                    : "https://via.placeholder.com/40"
                }
              />

              <SearchInfo>
                <SearchUsername>@{user.username}</SearchUsername>
              </SearchInfo>

              <SearchButton
                $isFollowing={isFollowing(user._id)}
                onClick={() =>
                  handleFollowToggle(user._id, user.username)
                }
              >
                {isFollowing(user._id) ? "Following" : "Follow"}
              </SearchButton>
            </SearchItem>
          ))}
        </SearchDropdown>
      )}
    </SearchWrapper>
  );
};

export default UserSearchBar;
