import { useState, useEffect } from "react";
import axios from "axios";
import Shop from "./Shop";

const Shops = () => {
  const [shops, setShops] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/shops`).then((res) => {
      const responseshops = res.data;
      setShops(responseshops);
    });
  }, []);
  return (
    <>
      {/* this is used like condition */}
      {shops &&
        shops.length > 0 &&
        shops.map((shop) => {
          const { id } = shop;
          return <Shop key={id} {...shop} />;
        })}
    </>
  );
};

export default Shops;
