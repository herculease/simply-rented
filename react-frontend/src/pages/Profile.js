import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile(props) {
  const navigate = useNavigate();
  const user = props.getUser();

  const [userData, setUser] = useState("");

  async function getUser(email) {
    try {
      const response = await axios.get("http://localhost:5000/users/" + email);
      console.log(user);
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  useEffect(() => {
    getUser(user).then((res) => {
      console.log(user);
      console.log(res.data.users_list);
      if (res.data.users_list) {
        setUser(res.data.users_list[0]);
      } else {
        setUser("null");
      }
    });
  }, []);

  function removeUser(e) {
    e.preventDefault();
    if (props.removeUser()) {
      navigate("/");
    }
  }

  async function deleteUser(e) {
    const id = {
      email: user,
    };
    console.log(id);
    try {
      const response = await axios.post("http://localhost:5000/delete", id);
      e.preventDefault();
      if (props.removeUser()) {
        navigate("/");
      }
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    <div className="container">
      {user ? (
        <>
          <h1 className="pb-3 display-3">My Profile</h1>
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Contact Information</h3>
              <br></br>
              <h4 class="card-text">First Name</h4>
              <p class="card-text" id="first" style={{ fontSize: 20 }}>
                {userData.firstName}
              </p>
              <h4 class="card-text">Last Name</h4>
              <p class="card-text" id="last" style={{ fontSize: 20 }}>
                {userData.lastName}
              </p>
              <h4 class="card-text">Email</h4>
              <p class="card-text" id="email" style={{ fontSize: 20 }}>
                {user}
              </p>
            </div>
          </div>
          <br></br>
          <div className="d-grid gap-2">
            <button className="btn btn-lg btn-danger" onClick={removeUser}>
              Log Out
            </button>
            <button
              className="btn btn-lg btn-outline-danger"
              onClick={deleteUser}
            >
              Delete Profile
            </button>
          </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}
