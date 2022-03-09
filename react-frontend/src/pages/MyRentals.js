import { useNavigate } from "react-router-dom";
import axios from "axios";
import ItemList from "./ItemList";

async function getRentalsByUser(userEmail) {
  const id = {
    email: userEmail,
  };
  console.log(id);
  try {
    const response = await axios.post("http://localhost:5000/rentals", id);
    console.log(response);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function MyRentals(props) {
  const navigate = useNavigate();
  const user = props.getUser();

  return (
    <div className="container">
      {user ? (
        <>
          <h1 className="pb-5 display-3">My Rentals</h1>
          <div className="row">
            <ItemList
              getResponse={getRentalsByUser(user)}
              error="You currently have no rentals!"
            />
          </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}

export default MyRentals;
