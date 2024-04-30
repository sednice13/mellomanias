import React from "react";
import { useParams } from "react-router-dom";

const Topics = () => {
  let { topic } = useParams(); 

  return (
    <div>
      <h1>{topic}</h1>  {/* Visa vilket ämne som valts */}
    </div>
  );
}

export default Topics;