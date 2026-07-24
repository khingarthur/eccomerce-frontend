import { Header } from "../components/Header";
import { useState, useEffect} from "react";
import axios from "axios";
import { formatMoney } from "../utils/money";

export const HomePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() =>{
    axios.get("http://localhost:3000/api/products")
      .then((response =>{
        console.log(response.data)
        setProducts(response.data)
      }));
  }, []);



  return (
    <>
      <title>KOBBYCommerce</title>

      <main className="bg-gray-200 w-full min-h-screen gap-2 flex-wrap flex justify-center items-center py-15">
        {/* card */}
        {products.map((product) => {
          return (
            <div key={product.id} className="w-50 mb-3 flex flex-col transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
              <img
                src={product.image}
                className=" object-fill rounded-xl"
                alt=""
              />
              <div className="pl-2 mt-8">
                <p className="flex items-center justify-center mb-2 font-bold">
                  {product.name}
                </p>

                <div className="flex gap-2 items-center">
                  <img src={`images/ratings/rating-${product.rating.stars * 10}.png`} className="w-30" />
               
                  <span className="w-30 pt-1">{product.rating.count}</span>
                </div>

                <div className="pl-1.5">
                  <p className="font- bold">${formatMoney(product.priceCents)}</p>
                  <label htmlFor="cars"></label>
                  <select name="cars" id="cars" className="border-2">
                    <option value="volvo">1</option>
                    <option value="saab">2</option>
                    <option value="mercedes">3</option>
                    <option value="audi">4</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center mb-4 mt-8 ">
                <button className="bg-green-500 px- w-2/3 h-8 rounded-sm text-sm  hover:bg-green-700 hover:text-amber-50">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};
