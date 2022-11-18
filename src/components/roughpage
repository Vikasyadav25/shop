import React from "react";
import "../App.css";
import axios from "axios";
import { FaCartPlus, FaDollarSign } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";



function Home() {
  const [item, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const getItems = async () => {
    try {
      const response = await axios.get(
        "https://ampashopapi.herokuapp.com/service"
      );
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      name: "Image",
      selector: (row) => <img width={70} height={70} src={row.image} />,
    },
    {
      name: "Name",
      cell: (row) => <div className="name_color">{row.name}</div>,
      sortable: true,
    },
    {
      name: "Color",
      cell: (row) => <div className="name_color">{row.color}</div>,
      sortable: true,
    },
    {
      name: "Stock",
      cell: (row) => (
        <div className="stocklist">
          <div>
            <FaSmile />
          </div>
          <div>{row.stock}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => (
        <div className="price">
          <FaDollarSign className="pricetag" />
          {row.price}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Buy",
      cell: (row) => (
        <div className="buy">
          <input className="cartinput" />
          <button className="btn btn-primary" onClick={() => alert(row.id)}>
            <FaCartPlus className="cart" />
          </button>
          <input type="checkbox" id="" name="" value="button"></input>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getItems();
  }, []);


  return (
    <div className="homePage">
        <div className="toolbar">
          <div className="category_selector">
            <select name="Category" id="category" className="selector_category">
              <option value="all">-All</option>
              <option value="hoodies">-Hoodies</option>
              <option value="t-shirt">-T-shirt</option>
              <option value="shirt">-Shirt</option>
              <option value="shoes">-Shoes</option>
            </select>
            <select name="Size" id="size" className="selector_category">
              <option value="Size">-Size</option>
              <option value="xl">XL</option>
              <option value="l">L</option>
              <option value="sl">SL</option>
            </select>
            <div className="name_color reset">
              <BsArrowCounterclockwise />
              <p className="reset_text">Reset</p>
            </div>
          </div>
          <div className="search_list">
            <label className="lable">Search:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="searchlist"
            />
            <button className="btn_cart">Add To Cart</button>
          </div>
        </div>
      
      <DataTable
        columns={columns}
        data={item}
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderAlign="right"
      />
    </div>
  );
}
export default Home;
