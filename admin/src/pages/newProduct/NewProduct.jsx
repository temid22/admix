import "./newProduct.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [perc, setPerc] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPerc(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: cat,
            size: size,
            color: color,
          };
          const successfull = addProduct(product, dispatch);
          if (successfull) {
            navigate("/products");
          } else return;
        });
      }
    );
  };

  return (
    <div className="lists">
      <Sidebar />
      <div className="listsContainer">
        <Navbar />
        <div className="newParcel">
          <h1 className="addParcelTitle">New Product</h1>
          <form className="addParcelForm">
            <div className="addParcelItem">
              {perc}% uploaded
              <label htmlFor="file">Image</label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="addParcelItem">
              <label>Title</label>
              <input
                name="title"
                type="text"
                placeholder="title..."
                onChange={handleChange}
              />
            </div>
            <div className="addParcelItem">
              <label>Description</label>
              <input
                name="desc"
                type="text"
                placeholder="description..."
                onChange={handleChange}
              />
            </div>
            <div className="addParcelItem">
              <label>Price</label>
              <input
                name="price"
                type="number"
                placeholder="000"
                onChange={handleChange}
              />
            </div>
            <div className="addParcelItem">
              <label>Categories</label>
              <input
                type="text"
                placeholder="e.g skirts, women"
                onChange={handleCat}
              />
            </div>
            <div className="addParcelItem">
              <label>Color</label>
              <input
                type="text"
                placeholder="e.g violet,red"
                onChange={handleColor}
              />
            </div>
            <div className="addParcelItem">
              <label>Size</label>
              <input
                type="text"
                placeholder="e.g XL,M,S"
                onChange={handleSize}
              />
            </div>
            <div className="addParcelItem">
              <label>Stock</label>
              <select name="inStock" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <button onClick={handleClick} className="addParcelButton">
              create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
