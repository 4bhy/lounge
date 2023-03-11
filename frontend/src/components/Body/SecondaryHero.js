import React from 'react'
import { Link } from 'react-router-dom'
const SecondaryHero = () => {
    return (
        <div>
            <div class="relative z-20 flex items-center overflow-hidden bg-white dark:bg-white-800">
                <div class="container relative flex px-6 py-16 mx-auto">
                    <div class="relative z-20 flex flex-col sm:w-2/3 lg:w-2/5">
                        <span class="w-20 h-2 mb-12 bg-gray-800 dark:bg-white">
                        </span>
                        <h1 class="flex flex-col text-4xl font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-6 xl dark:text-gray-700">
                            Take Your Business
                            <span class="text-5xl sm:text-7xl">
                                ONLINE.
                            </span>
                        </h1>
                        <p class="text-sm text-gray-700 sm:text-base dark:text-gray-500">
                            Maximize your earning potential and reach a wider audience by listing your property with us. Host with us and receive seamless management tools, 24/7 support, and access to thousands of travelers.
                        </p>
                        <div class="flex mt-8">
                            <Link to="/host/register"> <a href="#" class="px-4 py-2 mr-4 text-black uppercase bg-green-500 border-2 border-transparent rounded-lg text-md hover:bg-green-400">
                                Get started
                            </a></Link>
                            <a href="#" class="px-4 py-2 text-blue-500 uppercase bg-transparent border-2 border-green-500 rounded-lg dark:text-black hover:bg-green-400 hover:text-white text-md">
                                Read more
                            </a>
                        </div>
                    </div>
                    <div class="relative hidden sm:block sm:w-1/3 lg:w-3/5">
                        <img src="https://p4.wallpaperbetter.com/wallpaper/814/350/568/spa-beach-hotel-infinity-pool-wallpaper-preview.jpg" alt="." class="max-w-xs m-auto md:max-w-sm rounded-3xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondaryHero