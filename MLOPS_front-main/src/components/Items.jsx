import { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";

const Items = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/items`).then((res) => {
      const responseitems = res.data;
      setItems(responseitems);
    });
  }, []);
  return (
    <>
      {/* this is used like condition */}
      {items &&
        items.length > 0 &&
        items.map((item) => {
          const { id } = item;
          return <Item key={id} {...item} />;
        })}
    </>
  );
};

export default Items;
