import { Link } from "react-router-dom";
import DetailedView from "./DetailedView";
import axios from "axios";

//const API_BASE_URL = 'http://localhost:5000';
const API_BASE_URL = "https://simply-rented-backend.herokuapp.com";

async function handleClick(props) {
  try {
    const response = await axios.get(API_BASE_URL + "/items/" + props.id);
    console.log("happy");
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function ItemCard(props) {
  var path = "/item/" + props.id;
  console.log("tires");
  console.log(props.id);

  function checkImage() {
    if (props.image == "" || props.image == null) {
      return "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png";
    } else {
      return props.image;
    }
  }

  return (
    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
      <div className="card mb-5 box-shadow">
        <img src={checkImage()} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <Link
            to={path}
            onClick={handleClick(props)}
            className="stretched-link"
          />
        </div>
      </div>
    </div>
  );
}
