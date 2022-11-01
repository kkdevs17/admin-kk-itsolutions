import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import ROUTES from "../../common/routes";
import { Link } from "react-router-dom";

const columns = [
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
    name: <b>Email</b>,
    selector: (row) => row.email,
    sortable: true,
    reorder: true,
    width: "250px",
  },
  {
    name: <b>Designation</b>,
    selector: (row) => row.designation,
    sortable: true,
    reorder: true,
    width: "110px",
  },
  {
    name: <b>Pin</b>,
    selector: (row) => row.pin,
    sortable: true,
    reorder: true,
    width: "100px",
  },

  {
    name: <b>Action</b>,
    button: true,
    cell: (row) => (
      <Link to={`${ROUTES.EMPLOYEES.UPDATE.BASE}/${row._id}`}>
        <IconButton color="primary">
          <Edit />
        </IconButton>
      </Link>
    ),
  },
];
export default columns;
