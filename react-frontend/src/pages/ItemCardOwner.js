import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DetailedView from "./DetailedView";
import axios from "axios";
import "./ItemCard.css";

async function handleClick(props) {
  try {
    const response = await axios.get("http://localhost:5000/items/" + props.id);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export default function ItemCard(props) {
  const navigate = useNavigate();
  var path = "/item/" + props.id;
  async function deleteItem(item, owner) {
    //console.log(item)
    //console.log(owner)
    const params = {
      owner: owner,
      item: item,
    };
    console.log(params);
    try {
      const response = await axios.post(
        "http://localhost:5000/deleteItem",
        params
      );
      navigate("/listings");
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return (
    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
      <div className = "card mb-5 box-shadow">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <button
            className="btn btn-danger mt-2"
            onClick={() => deleteItem(props.title, props.user)}
          >
            Delete
          </button>
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
