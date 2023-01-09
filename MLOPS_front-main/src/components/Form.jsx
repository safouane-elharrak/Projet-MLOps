import React, { useState } from "react";
import axios from "axios";
import Shops from "./Shops";
import Items from "./Items";

function FormExample() {
  // Declare a state variable called "formData" and a function to update it
  const [formData, setFormData] = useState({
    id_shop: "",
    id_item: "",
  });

  const [responseData, setResponseData] = useState([]);

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the server
    const { id_shop, id_item } = event.target;

    console.log(id_shop.value);

    axios
      .get(
        `http://127.0.0.1:5000/predict?id_shop=${id_shop.value}&id_item=${id_item.value}`
      )
      .then((response) => {
        const { Result } = response.data;
        setResponseData(Result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="w-2/4 m-auto mt-5 border-separate border-spacing-2 border border-slate-500 p-5">
        <form onSubmit={handleSubmit}>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select an Shop
          </label>
          <select
            name="id_shop"
            id="id_shop"
            onChange={handleChange}
            value={formData.id_shop}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a shop</option>
            <Shops></Shops>
          </select>
          <br />

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select your item
          </label>
          <select
            name="id_item"
            id="id_item"
            onChange={handleChange}
            value={formData.id_item}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose an item</option>

            <Items></Items>
          </select>
          <br />

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Predict
          </button>
        </form>
      </div>

      {responseData && (
        <p class="w-1/4 m-auto mt-9">
          result of prediction is{" "}
          <span className="text-blue-700">{responseData}</span>
        </p>
      )}
    </>
  );
}

export default FormExample;
