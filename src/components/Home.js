import React from "react";
import "../App.css";
import axios from "axios";
import { FaCartPlus, FaDollarSign } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Box } from "@mui/system";
import BasicMenu from "./CartTotal";

function Home() {
  const [item, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryVal, setCategoryVal] = useState('');
  const [arrCart, setArrCart] = useState([]);
  const [showAllData, setShowAllData] = useState(true)
  const [quantity, setQuantity] = useState()
  const [newItems, setNewItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const totalquan = arrCart.map(hh => Number(hh.cartQuan))
  const price = arrCart.map(hh => Number(hh.price))

  useEffect(() => {
    var sums = 0;
    for (var i = 0; i < totalquan?.length; i++) {
      sums += totalquan[i] * price[i];
      setTotalPrice(sums)
    }
  }, [arrCart, newItems])


  useEffect(() => {
    const data = item.filter(srch => srch?.name?.toLowerCase().includes(search.toLowerCase()))
      .filter(srchCat => categoryVal === 'all' ? '' : srchCat?.category?.toLowerCase().includes(categoryVal.toLowerCase()))
      .map(itm => ({
        "category": itm.category,
        "color": itm.color,
        "id": itm.id === undefined ? '15' : itm.id,
        "image": itm.image,
        "name": itm.name,
        "price": itm.price,
        "stock": itm.stock,
        "cartQuan": 1
      }))

    setNewItems(data)
  }, [item, search, categoryVal])


  const RowSelect = (e, id) => {
    setArrCart(current => [...current, newItems[id - 1]])
  }

  const CheckHandle = (isTrue, id) => {

    if (!isTrue) {
      const indexOfObject = arrCart.findIndex(object => {
        return object.id === Number(id);
      });
      arrCart.splice(indexOfObject, 1);
      setArrCart(arrCart)

    } else {
      setArrCart(current => [...current, newItems[id - 1]])

    }
  }

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


  const QuantityHandlePlus = (e, id) => {

    const newval = newItems?.map((itm, idx) => {
      if (Number(id - 1) === idx) {
        itm.cartQuan = e.target.value
      }
      return itm
    })
    setNewItems([...newItems])
  }

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
          <div className="cartinput" id={row.id}><span className="quantity-quan"></span><input type="number"
            placeholder={row.cartQuan} value={quantity} onChange={(e) => QuantityHandlePlus(e, row.id)}></input></div>
          <button className="btn btn-primary" onClick={(e) => RowSelect(e, row.id)}>
            <FaCartPlus className="cart" />
          </button>
          <FormControlLabel control={<Checkbox id={row.id} onChange={(e) => CheckHandle(e.target.checked, e.target.id)}
          // this.setState({ isTrue: e.target.checked });
          />} label="" />
          {/* <input type="checkbox" id={row.id} name="" value="button"></input> */}
        </div>
      ),
    },
  ];

  const QuantityHandle = (e, id) => {

    const newval = newItems?.map((itm, idx) => {
      if (Number(id - 1) === idx) {
        itm.cartQuan = e.target.value
      }
      return itm
    })
    setNewItems([...newItems])
  }


  const Dlt = (id, idx, row) => {
    let itemsArray = [...arrCart];
    itemsArray.splice(idx, 1);
    let newArray = [...itemsArray]
    setArrCart(newArray);
  }

  const columnsCart = [
    {
      name: "Remove",
      cell: (row, idx) => <Button className="name_color" id={idx} onClick={() => Dlt(row.id, idx, row)}>X</Button>
    },
    {
      name: "Product",
      selector: (row) => (<Box sx={{ display: 'flex', padding: '10px' }}><img width={70} height={70} src={row.image} /><p>{row.name}</p></Box>),
    },
    {
      name: "Price",
      cell: (row) => <div className="name_color">${row.price}.00</div>,
      sortable: true,
    },
    {
      name: "Quantity",
      cell: (row) => <div className="quantity-cell" id={row.id}><span className="quantity-quan"></span><input type="number" placeholder={row.cartQuan} value={quantity} onChange={(e) => QuantityHandle(e, row.id)}></input></div>,
      sortable: true,
    },
    {
      name: "Subtotal",
      cell: (row) => (
        <div>{row.price * row.cartQuan}</div>
      ),
      sortable: true,
    }
  ];

  const dataClean = () => {
    const uniqueIds = [];

    const unique = arrCart?.filter(element => {
      const isDuplicate = uniqueIds.includes(element.id);

      if (!isDuplicate) {
        uniqueIds.push(element.id);

        return true;
      }

      return false;
    });
    setArrCart(unique)
  }




  useEffect(() => {
    getItems();
  }, []);


  return (
    <div className="homePage">

      <div className="toolbar">
        {showAllData ?
          <>
            <div className="category_selector">
              <select name="Category" id="category" className="selector_category" onChange={(e) => {
                if (e.target.value === 'all') { setCategoryVal('') } else setCategoryVal(e.target.value);
              }}>
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
                <p className="reset_text" onClick={() => {
                  setCategoryVal('');
                }}>Reset</p>
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
              <button className="btn_cart" onClick={(e) => { e.preventDefault(); setShowAllData(arrCart.length > 0 ? !showAllData : showAllData); dataClean() }}>Add To Cart</button>
            </div>
          </>
          :
          <div className="cart-header">
            <Button variant="contained" onClick={() => setShowAllData(!showAllData)}>Back</Button>
          </div>
        }
      </div>
      {showAllData ?
        <DataTable
          columns={columns}
          data={newItems}
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          subHeader
          subHeaderAlign="right"
        />


        :
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <DataTable
                columns={columnsCart}
                data={arrCart}
                fixedHeader
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderAlign="right"
              />
            </Grid>
            <Grid item xs={4}>
              <BasicMenu totalPrice={totalPrice} />
            </Grid>
          </Grid>

        </>

      }


    </div>
  );

}
export default Home;
