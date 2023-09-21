import React from "react";
import { TailSpin, ThreeDots } from "react-loader-spinner";

const LoadingScreen: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TailSpin
        height="80"
        width="80"
        color="#334155"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingScreen;
