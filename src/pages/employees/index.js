import { useEffect, useState } from "react";
import Datatable from "../../components/datatable";
import ROUTES from "../../common/routes";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_EMPLOYEES } from "../../reducers/employee/employeeSlice";
import { Toast } from "../../helpers/sweetAlert";
import { SERVER_BASE_URL } from "../../common/constants";
import { deleteDataFromBody } from "../../services/service";
import { CircularProgress } from "@material-ui/core";
import columns from "./employeeColumn";

const Employees = () => {
  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const [key, setkey] = useState(true);
  const { employees, updatedEmployee, success, loading } = useSelector(
    (state) => state.employee
  );
  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES());
    if (success === true) {
      manageState();
    }
  }, [employees.length]);
  const manageState = () => {
    const employees_data = employees.map((data, i) => {
      return {
        ...data,
        sr_no: i + 1,
      };
    });
    setEmployeesData(employees_data);
  };
  // const deleteMultiple = (data) => {
  //   deleteMultipleData(data, key);
  // };
  const deleteMultiple = (data) => {
    const employee_ids = data.map((dataItem) => {
      return dataItem._id;
    });
    const body = {
      employee_ids: employee_ids,
    };
    const url = `${SERVER_BASE_URL}/api/employee`;
    return deleteDataFromBody(url, body).then((response) => {
      if (response.success === true) {
        Toast.fire({
          icon: "success",
          title: response.message,
        });
        dispatch(GET_ALL_EMPLOYEES());
        return true;
      } else {
        Toast.fire({
          icon: "error",
          title: response.message,
        });
        return false;
      }
    });
  };
  return (
    <>
      {!loading ? (
        <Datatable
          columns={columns}
          rows={employeesData}
          addBtnUrl={ROUTES.EMPLOYEES.ADD}
          delFunction={deleteMultiple}
          selectable={true}
        />
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <CircularProgress color="primary" />
        </div>
      )}
    </>
  );
};

export default Employees;
