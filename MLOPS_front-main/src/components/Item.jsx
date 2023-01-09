const Item = ({ id, item_name }) => {
  return (
    <>
      <option value={id}>{item_name}</option>
    </>
  );
};

export default Item;
