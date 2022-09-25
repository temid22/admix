import "./newUser.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import app from "../../firebase";
import FormInput from "./formInput/FormInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addUser } from "../../redux/apiCalls";

const NewUser = () => {
  const [file, setFile] = useState(null);
  const [perc, setPerc] = useState(0);
  const [DisplayPerc, setDisplayPerc] = useState("");
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "",
      autoComplete: "off",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      autoComplete: "off",
      placeholder: "",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
          const user = {
            ...values,
            img: downloadURL,
          };
          addUser(user, dispatch);
        });
      }
    );
    if (perc === 100) {
      setDisplayPerc("100%");
    } else return;
  };

  return (
    <div className="newUser">
      <Sidebar />
      <div className="newUserContainer">
        <Navbar />
        <div className="newNewUser">
          <h1 className="addNewUserTitle">New User</h1>
          <form className="addNewUserForm">
            <div className="addNewUserItem">
              <label htmlFor="file">Image</label>
              <p>{DisplayPerc}</p>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="addNewUserItem">
              <label>Admin</label>
              <select name="isAdmin" onChange={onChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <button onClick={handleClick} className="addNewUserButton">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
