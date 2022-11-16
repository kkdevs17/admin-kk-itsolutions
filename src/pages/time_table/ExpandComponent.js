import React from "react";
const ExpandComponent = (props) => {
  console.log(props);
  return (
    <div className="text-center font-extrabold">
      {props.data.checkOut || props.data.employeeId.checkOut ? (
        <div>
          <div>
            {props.data.reason
              ? props.data.reason
              : props.data.employeeId.reason}
          </div>
          <div>
            {props.data.totalTime
              ? props.data.totalTime
              : props.data.employeeId.totalTime}
          </div>
        </div>
      ) : (
        "In office"
      )}
    </div>
  );
};
export default ExpandComponent;
