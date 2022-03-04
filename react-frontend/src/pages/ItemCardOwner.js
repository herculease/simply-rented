import {Link} from "react-router-dom";
import axios from "axios";

export default function ItemCardOwner(props){
  const user = props.user;

  async function deleteItem(e, item) {
    const params = {
      email: user,
      item: item
    }
    console.log(params)
    try {
      const response = await axios.post(
        "http://localhost:5000/deleteItem",
        params
      ); 
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  return(
    <div className="col-6 col-sm-4 col-md-3 col-xl-2">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreesvg.org%2Fimg%2FPlaceholder.png&f=1&nofb=1" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <div>
          <button
              className="btn btn-lg btn-danger"
              onClick={() => deleteItem(props.title)}
            >
              Delete
            </button>
          </div>
        </div>
    </div>
  );
}