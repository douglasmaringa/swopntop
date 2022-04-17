import React from 'react'

function CategoryCard() {
  return (
    <div className='mx-5'>
       <div class="relative w-40 h-28  overflow-hidden">
  <img src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="Avatar" class="object-cover w-full h-full" />
  <div class="cursor-pointer absolute w-full my-12 bottom-0 inset-x-0 py-2 bg-gray-900 hover:bg-black  text-white text-lg font-bold text-center leading-4">Laptops</div>
</div>
    </div>
  )
}

export default CategoryCard