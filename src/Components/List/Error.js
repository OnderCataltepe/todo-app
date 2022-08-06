// eslint-disable-next-line react/prop-types
const Error = ({ errorMessage }) => {
  return (
    <h3 style={{ color: "red", fontSize: "2rem" }}>Error: {errorMessage}</h3>
  );
};

export default Error;
