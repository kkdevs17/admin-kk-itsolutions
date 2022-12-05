import Datatable from "../../components/datatable";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchBar";
import { useEffect, useState } from "react";
import { GET_ALL_EMPLOYEES_TIME_TABLE } from "../../reducers/timeTable/timeTableSlice";
import { CircularProgress } from "@material-ui/core";
import { mainColumns, serchedColumns } from "./timeTableColumns";
import { deleteMultipleData, manageStates } from "../../common/adminFunctions";
// import ExpandComponent from "./ExpandComponent";

const TimeTable = ({
  developer,
  internee,
  checkInNotifications,
  checkOutNotifications,
}) => {
  const dispatch = useDispatch();
  const [employeesData, setEmployeesData] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [columns, setColumns] = useState([]);
  const [key, setKey] = useState(false);

  const { employeesTimeTable, loading, success } = useSelector(
    (state) => state.employeeTimeTable
  );
  console.log(employeesTimeTable);
  useEffect(() => {
    dispatch(GET_ALL_EMPLOYEES_TIME_TABLE({ name, date }));
    if (success === true) {
      manageState();
    }
  }, [
    checkOutNotifications,
    employeesTimeTable.length,
    checkInNotifications,
    date,
    name,
  ]);
  const manageState = () => {
    // manageStates(
    //   internee,
    //   developer,
    //   name,
    //   date,
    //   employeesTimeTable,
    // );

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
    setEmployeesData(employees_data);
  };

  const deleteMultiple = (data) => {
    deleteMultipleData(data, key);
    dispatch(GET_ALL_EMPLOYEES_TIME_TABLE({ name, date }));
  };
  useEffect(() => {
    if ((name && date) || name) {
      setColumns(serchedColumns);
    } else if (date || (!date && !name)) {
      setColumns(mainColumns);
    }
  }, [
    serchedColumns,
    mainColumns,
    name,
    date,
    checkInNotifications,
    checkOutNotifications,
  ]);
  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  const handleDaysChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <>
      <SearchBar
        handleNameInput={handleNameInput}
        name={name}
        handleDaysChange={handleDaysChange}
        date={date}
      />
      {!loading ? (
        <Datatable
          columns={columns}
          rows={employeesData}
          delFunction={deleteMultiple}
          expanded={true}
        />
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <CircularProgress color="primary" />
        </div>
      )}
    </>
  );
};

export default TimeTable;
