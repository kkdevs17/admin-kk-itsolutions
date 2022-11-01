import React from "react";
const ExpandComponent = (props) => {
  console.log(props);
  return <div>{JSON.stringify(props, null, 2)}</div>;
};
export default ExpandComponent;
