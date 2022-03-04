import axios from "axios";
import { useEffect, useState } from "react";
import ItemCardOwner from "./ItemCardOwner";

export function MyListings(props) {
  const userEmail = props.getUser();
  const [itemData, setItems] = useState("");

  async function getItemsByUser(userEmail) {
    const id = {
        email: userEmail,
      }
    try {
      const response = await axios.post(
        "http://localhost:5000/listings",
        id
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    getItemsByUser(userEmail).then((res) => {
      if (res) {
        console.log(res)
        setItems(res.data.result);
        console.log(res.data.result[0].values);
      }
    });
  }, []);

  //var items = JSON.stringify(itemData)

  const items = itemData
    ? itemData.map((data, i) => {
        return <ItemCardOwner key={i} user={userEmail} title={data.itemName} />;
      })
    : null;

  return (
    <div className="container">
      {userEmail ? (
        <>
          <h1 className="pb-3">My Listings</h1>
            <div className="row">
                {console.log(itemData)}
                {items}
            </div>
        </>
      ) : (
        <h2>You're not logged in!</h2>
      )}
    </div>
  );
}
export default MyListings;
