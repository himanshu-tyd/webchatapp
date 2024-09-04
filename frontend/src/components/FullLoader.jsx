import { RotateSpinner } from "react-spinners-kit";

const FullLoader = () => {
  return (
    <div className="w-full h-screen mx-auto z-10 absolute flex-center">
      <RotateSpinner />
    </div>
  );
};

export default FullLoader;
