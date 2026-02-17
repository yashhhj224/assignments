
import { LoaderWrapper, Spinner } from "../../styles/components/loaderStyles";

type LoaderProps = {
  size?: number;
};

const Loader = ({ size = 42 }: LoaderProps) => {
  return (
    <LoaderWrapper>
      <Spinner $size={size} />
    </LoaderWrapper>
  );
};

export default Loader;
