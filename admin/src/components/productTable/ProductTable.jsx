import "./productTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../../redux/productRedux";
import { generalRequest } from "../../httpService";

const ProductTable = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.products);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      getProductStart();
      try {
        const res = await generalRequest.get("parcel");
        getProductSuccess(res.data);
        setProducts(res.data);
      } catch (err) {
        getProductFailure();
      }
    };
    getProducts();
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
    setProducts(products.filter((product) => product._id !== id));
  };
  const productColumn = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "parcel",
      headerName: "Product",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "InStock", width: 100 },
    {
      field: "price",
      headerName: "Price ($)",
      width: 120,
    },
    {
      field: "categories",
      headerName: "Categories",
      width: 160,
    },
    {
      field: "size",
      headerName: "Sizes",
      width: 120,
    },
    {
      field: "color",
      headerName: "Color",
      width: 160,
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
              to={"/products/" + params.row._id}
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
        Add New Product
        <Link to="/products/newProduct" className="link">
          Add
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={productColumn.concat(actionColumn)}
        getRowId={(row) => row._id}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductTable;
