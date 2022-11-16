import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ConfirmSweetAlert } from "../../helpers/sweetAlert";
import ExpandComponent from "../../pages/time_table/ExpandComponent";

const DataTablePage = ({
  title,
  columns,
  rows,
  addBtnUrl,
  delFunction,
  expanded,
}) => {
  const [selectedData, setSelectedData] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (state) => {
    setSelectedData(state.selectedRows);
  };

  const actions = addBtnUrl ? (
    <Link to={addBtnUrl}>
      <IconButton color="primary">
        <Add />
      </IconButton>
    </Link>
  ) : (
    ""
  );

  const contextActions = (deleteHandler) => (
    <IconButton color="secondary" onClick={deleteHandler}>
      {loading ? <CircularProgress color="secondary" /> : <Delete />}
    </IconButton>
  );

  const deleteAll = async () => {
    const isConfirmed = await ConfirmSweetAlert("Yes, Delete It!");
    if (!isConfirmed) {
      return;
    }

    setLoading(true);
    const response = await delFunction(selectedData);
    if (response) {
      setLoading(false);
      setToggleCleared(!toggleCleared);
    } else {
      setLoading(false);
    }
  };

  return !expanded ? (
    <DataTable
      title={<h3>{title}</h3>}
      columns={columns}
      data={rows}
      defaultSortFieldId={1}
      sortIcon={<SortIcon className="ms-1" />}
      pagination
      highlightOnHover
      selectableRows
      actions={actions}
      contextActions={contextActions(deleteAll)}
      selectableRowsComponent={Checkbox}
      clearSelectedRows={toggleCleared}
      onSelectedRowsChange={handleChange}
    />
  ) : (
    <DataTable
      title={<h3>{title}</h3>}
      columns={columns}
      data={rows}
      defaultSortFieldId={1}
      sortIcon={<SortIcon className="ms-1" />}
      pagination
      highlightOnHover
      selectableRows
      actions={actions}
      contextActions={contextActions(deleteAll)}
      selectableRowsComponent={Checkbox}
      clearSelectedRows={toggleCleared}
      onSelectedRowsChange={handleChange}
      expandableRows={expanded}
      expandableRowsComponent={ExpandComponent}
    />
  );
};

export default DataTablePage;
