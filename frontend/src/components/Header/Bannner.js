import React from 'react'
import { Link } from 'react-router-dom'
const Bannner = () => {
  return (
    <div>
      <section class="relative bg-[url(https://live.staticflickr.com/4240/35056952620_29a05ee356_b.jpg)] bg-cover bg-center rounded-3xl bg-no-repeat">
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-200/25 lg:from-slate-900/95 lg:to-slate-200/25 sm:from-slate-900/95 sm:to-slate-200/25 md:from-slate-900/95 md:to-slate-200/25"></div>

        <div class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div class="text-center sm:text-left">
            <h1 class="text-3xl font-extrabold sm:text-5xl text-gray-300">
              Discover the World
              <strong class="block font-extrabold text-green-600">
                One Stay at a Time.
              </strong>
            </h1>
            <p class="mt-4 max-w-lg sm:text-xl sm:leading-relaxed sm:text-gray-300 lg:text-gray-300 text-gray-300">
              Unwind in comfort and style with our unbeatable selection of hotels. Discover great deals and book your next adventure with ease.
            </p>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Bannner