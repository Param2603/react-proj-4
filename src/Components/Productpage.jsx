import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`https://server-1e6o.onrender.com/Products/${id}`)
      setProduct(res.data)
    }
    fetchData()
  }, [id])

  if (!product) return <p>Loading...</p>

  return (
    <div className="max-w-md flex flex-col justify-center  mx-auto p-6 bg-white rounded-[10px] mt-10">
      <h2 className="text-[30px] text-black font-bold mb-4 text-center">Single Product Page</h2>

      <div className="space-y-2">
        <p className="text-gray-700"><span className="font-semibold">ID:</span> {product.id}</p>
        <p className="text-gray-700"><span className="font-semibold">Name:</span> {product.name}</p>
        <p className="text-gray-700"><span className="font-semibold">Price:</span> ₹{product.price}</p>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className=" bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-[5px]"
        >Back to Cart Page
       </Link>
      </div>
    </div>
  )
}

export default ProductPage