import "./userTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from "../../redux/userListRedux";
import { userRequest } from "../../httpService";

const UserTable = () => {
  const dispatch = useDispatch();
  // const users = useSelector((state) => state.userList.users);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      getUserStart();
      try {
        const res = await userRequest.get("user");
        getUserSuccess(res.data);
        setUsers(res.data);
      } catch (err) {
        getUserFailure();
      }
    };
    getUsers();
  }, []);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    setUsers(users.filter((user) => user._id !== id));
  };
  const UserColumn = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={
                params.row.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt="avatar"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "isAdmin", headerName: "Admin", width: 100 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/users/" + params.row._id}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/newUser" className="link">
          Add
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={UserColumn.concat(actionColumn)}
        getRowId={(row) => row._id}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default UserTable;
