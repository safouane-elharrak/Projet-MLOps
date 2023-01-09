const Shop = ({ id, shop_name }) => {
  return (
    <>
      <option value={id}>{shop_name}</option>
    </>
  );
};

export default Shop;
