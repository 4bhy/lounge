import React, { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Header/Navbar";
import './Counter.css'
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [hotel, setHotel] = useState({
    name: "Luxury Hotel",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description:
      "Experience luxury like never before at our 5-star hotel, with breathtaking views and top-notch amenities.",
  });
  const [reservation, setReservation] = useState({
    type: "Standard Room",
    rooms: 1,
    guests: 2,
    price: 250,
  });

  return (

    <>
      <Navbar />
      <div className="flex p-4 flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6">
          <div className="bg-neutral-100 shadow-md rounded-3xl p-6">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-64 rounded-3xl object-cover"
            />
            <h2 className="text-xl font-bold mt-6">{hotel.name}</h2>
            <p className="text-gray-600 mt-2">{hotel.description}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <div className="bg-neutral-100 shadow-md rounded-3xl p-10">
            <h2 className="text-xl font-bold mb-4">Reservation Details</h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-bold">Type</td>
                  <td className="text-right">{reservation.type}</td>
                </tr>
                <tr>
                  <td className="font-bold">Rooms</td>
                  <td className=" text-right justify-items-end justify-end">
                    <div class="custom-number-input h-10 w-32 flex flex-col text-right ml-80 justify-items-end justify-end">
                      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                          <span class="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" class=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
                        <button data-action="increment" class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                          <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Guests</td>
                  <td className="text-right">
                    <div class="custom-number-input h-10 w-32 flex flex-col text-right ml-80 justify-items-end justify-end">
                      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button data-action="decrement" class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                          <span class="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input type="number" class=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input>
                        <button data-action="increment" class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                          <span class="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Price</td>
                  <td className="text-right">
                    ${reservation.price} per night
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to="/checkout-payment">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-3xl mt-4">
              Confirm Reservation
            </button></Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;