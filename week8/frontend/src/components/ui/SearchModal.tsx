
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import FollowersFollowingList from "../users/FollowersFollowingList";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  z-index: 999;
`;

const Modal = styled.div`
  width: 500px;
  background: white;
  border-radius: 12px;
  padding: 20px;
`;

type Props = {
  onClose: () => void;
};

const SearchModal = ({ onClose }: Props) => {
  const { searchResults } = useAppSelector(
    (state) => state.users
  );

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <FollowersFollowingList
          type="all"
          users={searchResults}
        />
      </Modal>
    </Overlay>
  );
};

export default SearchModal;