import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 100, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
