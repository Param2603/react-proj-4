import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

const Cart = () => {
  const [data, setData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [inputData, setInputData] = useState({ name: "", price: "" })
  const [editData, setEditData] = useState(false)
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    let res = await axios.get("https://server-1e6o.onrender.com/Products")
    setData(res.data)
    setFilterData(res.data)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (editData) {
      await axios.put(`https://server-1e6o.onrender.com/Products/${editId}`, inputData)
      alert("Product updated successfully")
      setEditData(false)
      setEditId(null)
    } else {
      await axios.post("https://server-1e6o.onrender.com/Products", inputData)
      alert("Product added successfully")
    }

    setInputData({ name: "", price: "" })
    getData()
  }

  async function handleDelete(id) {
    await axios.delete("https://server-1e6o.onrender.com/Products/" +id)
    alert("Product deleted successfully")
    getData()
  }

  function handleEdit(item) {
    setEditData(true)
    setEditId(item.id)
    setInputData({ name: item.name, price: item.price })
  }

  function handleSearch(e) {
    let search = e.target.value.toLowerCase()
    let filter = filterData.filter(item =>
      item.name.toLowerCase().includes(search)
    )
    setData(filter)
  }

  function handleAsc() {
    let sorted = [...data].sort((a, b) => a.price - b.price)
    setData(sorted)
  }

  function handleDes() {
    let sorted = [...data].sort((a, b) => b.price - a.price)
    setData(sorted)
  }

  return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h2 className="text-[30px] text-black font-bold mb-4 text-center">Product Page</h2>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="space-x-2">
          <button onClick={handleAsc} className=" cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-[5px] hover:bg-blue-600">Ascending</button>
          <button onClick={handleDes} className=" cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-[5px] hover:bg-blue-600">Descending</button>
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="px-3 py-2 border rounded w-full"
        />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-[5px] shadow mb-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <input
            value={inputData.name}
            onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
            type="text"
            placeholder="Name"
            required
            className="flex-1 px-3 py-2 border rounded-[5px]"
          />
          <input
            value={inputData.price}
            onChange={(e) => setInputData({ ...inputData, price: e.target.value })}
            type="number"
            placeholder="Price"
            required
            className="flex-1 px-3 py-2 border rounded-[5px]"
          />
        </div>
        <button type="submit" className="w-full cursor-pointer bg-green-600 text-white py-2 rounded-[10px] hover:bg-green-700">
          {editData ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-[5px] shadow flex flex-col sm:flex-row items-center justify-between">
            <div className="space-y-1">
              <Link to={`/productpage/${item.id}`} className="text-[20px] font-semibold text-blue-600 hover:underline">
                Name: {item.name}
              </Link>
              <p className="text-gray-700 font-semibold">Price: ₹{item.price}</p>
            </div>

            <div className="mt-2">
              <button onClick={() => handleEdit(item)} className="px-4 cursor-pointer py-2 bg-yellow-400 text-white rounded-[5px] hover:bg-yellow-500 mr-2">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="px-4 cursor-pointer py-2 bg-red-500 text-white rounded-[5px] hover:bg-red-600 ">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart