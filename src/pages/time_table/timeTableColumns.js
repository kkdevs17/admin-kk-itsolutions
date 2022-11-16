import moment from "moment";

export const serchedColumns = [
  {
    name: <b>Sr No</b>,
    selector: (row) => row.sr_no,
    sortable: true,
    reorder: true,
    width: "90px",
  },
  {
    name: <b>Name</b>,
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
  },
  {
    name: <b>Date</b>,
    selector: (row) => moment(row.employeeId.createdAt).format("L"),
    sortable: true,
    reorder: true,
  },
  {
    name: <b>CheckIn Time</b>,
    selector: (row) => row.employeeId.checkInTime,
    sortable: true,
    reorder: true,
    width: "130px",
  },
  {
    name: <b>CheckOut Time</b>,
    selector: (row) => (row.checkOutTime ? row.checkOutTime : "At office"),
    sortable: true,
    reorder: true,
    width: "130px",
  },
  {
    name: <b>Total time</b>,
    selector: (row) =>
      row.employeeId.totalTime ? row.employeeId.totalTime : "...",
    sortable: true,
    reorder: true,
    width: "230px",
  },
];
export const mainColumns = [
  {
    name: <b>Sr No</b>,
    selector: (row) => row.sr_no,
    sortable: true,
    reorder: true,
    width: "90px",
  },
  {
    name: <b>Name</b>,
    selector: (row) => row.employeeId.name,
    sortable: true,
    reorder: true,
    width: "150px",
  },
  {
    name: <b>Date</b>,
    selector: (row) => moment(row.createdAt).format("L"),
    sortable: true,
    reorder: true,
  },
  {
    name: <b>CheckIn Time</b>,
    selector: (row) => row?.checkInTime,
    sortable: true,
    reorder: true,
    width: "110px",
  },
  {
    name: <b>CheckOut Time</b>,
    selector: (row) => (row.checkOutTime ? row.checkOutTime : "At office"),
    sortable: true,
    reorder: true,
    width: "110px",
  },
  {
    name: <b>Total time</b>,
    selector: (row) => (row.totalTime ? row.totalTime : "pending..."),
    sortable: true,
    reorder: true,
    width: "145px",
  },
];
