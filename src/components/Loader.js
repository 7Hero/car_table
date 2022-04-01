import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#F9F9FC",
      }}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
