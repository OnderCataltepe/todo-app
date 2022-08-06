import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div>
      <ClipLoader />
      <h4 style={{ fontSize: "2rem", marginTop: "1rem" }}>Loading...</h4>
    </div>
  );
};

export default Loading;
