import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProductPage = () => {

const individualProperty= useSelector((state)=>state.individualProperty)
const {individualPropertyData}= individualProperty;
console.log("propertypage;",individualPropertyData);
  return (
    <div>
<section>
  <div class="relative max-w-screen-xl px-4 py-8 mx-auto">
    <div class="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
        <img
          alt="Les Paul"
          src=             {individualPropertyData?.propertyInfo
            .pic[0]}
          class="object-cover w-full aspect-square rounded-xl"
        />

        <div class="grid grid-cols-2 gap-4 lg:mt-4">
          {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}

          {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}

          {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}

          {/* <img
            alt="Les Paul"
            src="https://img2.10bestmedia.com/Images/Photos/378649/Park-Hyatt-New-York-Manhattan-Sky-Suite-Master-Bedroom-low-res_54_990x660.jpg"
            class="object-cover w-full aspect-square rounded-xl"
          /> */}
        </div>
      </div>

      <div class="sticky top-0">
        <strong
          class="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600"
        >
          Pre Order
        </strong>

        <div class="flex justify-between mt-8">
          <div class="max-w-[35ch]">
            <h1 class="text-2xl font-bold">
              {individualPropertyData?.propertyInfo
.pname}
            </h1>

            <p class="mt-0.5 text-sm">Highest Rated Product</p>

            <div class="mt-2 -ml-0.5 flex">
              <svg
                class="w-5 h-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>

              <svg
                class="w-5 h-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>

              <svg
                class="w-5 h-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>

              <svg
                class="w-5 h-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>

              <svg
                class="w-5 h-5 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>

          <p class="text-lg font-bold">$119.99</p>
        </div>

        <details
          class="group relative mt-4 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary class="block">
            <div>
              <div class="prose max-w-none group-open:hidden">
                <p>
                            {individualPropertyData?.propertyInfo
.description}
                </p>
              </div>

              <span
                class="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0"
              >
                Read More
              </span>
            </div>
          </summary>

          <div class="pb-6 prose max-w-none">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              veniam dicta beatae eos ex error culpa delectus rem tenetur,
              architecto quam nesciunt, dolor veritatis nisi minus inventore,
              rerum at recusandae?
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              nam sapiente nobis ea veritatis error consequatur nisi
              exercitationem iure laudantium culpa, animi temporibus non! Maxime
              et quisquam amet. A, deserunt!
            </p>
          </div>
        </details>

        {/* <form class="mt-8">
          <fieldset>
            <legend class="mb-1 text-sm font-medium">Color</legend>

            <div class="flow-root">
              <div class="-m-0.5 flex flex-wrap">
                <label for="color_tt" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="color"
                    id="color_tt"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    Texas Tea
                  </span>
                </label>

                <label for="color_fr" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="color"
                    id="color_fr"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    Fiesta Red
                  </span>
                </label>

                <label for="color_cb" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="color"
                    id="color_cb"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    Cobalt Blue
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          <fieldset class="mt-4">
            <legend class="mb-1 text-sm font-medium">Size</legend>

            <div class="flow-root">
              <div class="-m-0.5 flex flex-wrap">
                <label for="size_xs" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_xs"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    XS
                  </span>
                </label>

                <label for="size_s" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_s"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    S
                  </span>
                </label>

                <label for="size_m" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_m"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    M
                  </span>
                </label>

                <label for="size_l" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_l"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    L
                  </span>
                </label>

                <label for="size_xl" class="cursor-pointer p-0.5">
                  <input
                    type="radio"
                    name="size"
                    id="size_xl"
                    class="sr-only peer"
                  />

                  <span
                    class="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                  >
                    XL
                  </span>
                </label>
              </div>
            </div>
          </fieldset>

          <div class="flex mt-8">
            <div>
              <label for="quantity" class="sr-only">Qty</label>

              <input
                type="number"
                id="quantity"
                min="1"
                value="1"
                class="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            <button
              type="submit"
              class="block px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500"
            >
              Add to Cart
            </button>
          </div>
        </form> */}
         <div className="flex flex-col items-center mt-5">
                <div className="text-3xl font-medium">$250</div>
                <div className="text-sm text-gray-600">per night</div>
                <div className="mt-5">
                    <button className="bg-gray-300 px-5 py-2 rounded-full">
                        Add to Wishlist
                    </button>
                    <Link to="/checkout"><button className="bg-green-500 text-white px-5 py-2 rounded-full ml-5">
                        Book Now
                    </button></Link>
                </div>
                <div className="mt-5">
                    <div className="text-sm text-gray-600">Availability:</div>
                    <div className="text-sm font-medium">In Stock</div>
                </div>
                <div className="mt-5">
                    <div className="text-sm text-gray-600">Amenities:</div>
                    <div className="flex">
                        <div className="w-16 h-16 bg-gray-300 mr-5 rounded-full"></div>
                        <div className="w-16 h-16 bg-gray-300 mr-5 rounded-full"></div>
                        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  </div>
</section>
 
    </div>
  )
}

export default ProductPage