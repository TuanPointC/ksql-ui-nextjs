import { ClipLoader } from "react-spinners";

const Loader = ({ loading, color }) => {
  return (
    <ClipLoader
      className="loader"
      color={color ? color : 'white'}
      loading={loading}
      size={70}
      aria-label="Loading Spinner"
      dataestid="loader"
    />
  );
}

export default Loader;