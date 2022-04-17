import React,{useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';
import {Link} from "react-router-dom"

function SideNav() {
   const[show,setShow]=useState(false)

  return (
    <div>
        <div class="hidden md:flex  w-60 h-full shadow-md bg-white px-1 absolute">
  <ul class="relative">
    <li class="relative">
      <Link to="/profile" class="flex mt-5 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"  data-mdb-ripple="true" data-mdb-ripple-color="dark"><span className='mr-2'><AccountCircleIcon/></span> Account</Link>
    </li>
    <li class="relative">
      <Link to="/profileinventory" class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"  data-mdb-ripple="true" data-mdb-ripple-color="dark"><span className='mr-2'><FavoriteIcon/></span>Inventory</Link>
    </li>
    <li class="relative">
      <Link to="/profilefavourite" class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"  data-mdb-ripple="true" data-mdb-ripple-color="dark"><span className='mr-2'><InventoryIcon/></span>Favourites</Link>
    </li>
  </ul>
</div>

<div class="md:hidden flex items-center">
	<button onClick={()=>{if(show){setShow(false)}else{setShow(true)}}} class="outline-none mobile-menu-button">
		<svg
			class="w-6 h-6 text-gray-500"
			x-show="!showMenu"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
		<path d="M4 6h16M4 12h16M4 18h16"></path>
		</svg>
	</button>
</div>
{
show?(<>
<div class="mobile-menu">
	<ul class="">
		<li class="active"><Link to="/profile" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold"><AccountCircleIcon/>Account</Link></li>
		<li><Link to="/profileinventory" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"><InventoryIcon/>Inventory</Link></li>
		<li><Link to="/profilefavourite" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300"><FavoriteIcon/>Favourites</Link></li>
			</ul>
</div>
</>):(<>

</>)
}

    </div>
  )
}

export default SideNav