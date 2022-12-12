import { Toast } from "../helpers/sweetAlert";
import { deleteDataFromBody } from "../services/service";
import { SERVER_BASE_URL } from "./constants";
export const deleteMultipleData = (data, key, name, date) => {
  const ids = data.map((dataItem) => {
    return dataItem._id;
  });
  let url, body;
  if (key) {
    body = {
      employee_ids: ids,
    };
    url = `${SERVER_BASE_URL}/api/employee`;
  } else {
    body = {
      timeTable_ids: ids,
    };
    url = `${SERVER_BASE_URL}/api/timeTable`;
  }
  return deleteDataFromBody(url, body).then((response) => {
    if (response.success === true) {
      Toast.fire({
        icon: "success",
        title: response.message,
      });
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
export const manageStates = (
  internee,
  developer,
  name,
  date,
  employeesTimeTable
) => {
  let internees, developers, employees_data;
  if (internee) {
    if ((name && date) || name) {
      internees = employeesTimeTable.filter(
        (item) => item?.designation == "internee"
      );
    } else if (date || (!date && !name)) {
      internees = employeesTimeTable.filter(
        (item) => item?.employeeId?.designation == "internee"
      );
    }
    employees_data = internees.map((data, i) => {
      return {
        ...data,
        sr_no: i + 1,
      };
    });
  } else if (developer) {
    if ((name && date) || name) {
      developers = employeesTimeTable.filter(
        (item) => item?.designation != "internee"
      );
    } else if (date || (!date && !name)) {
      developers = employeesTimeTable.filter(
        (item) => item?.employeeId?.designation != "internee"
      );
    }
    employees_data = developers.map((data, i) => {
      return {
        ...data,
        sr_no: i + 1,
      };
    });
  }
  return employees_data;
};
