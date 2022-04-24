import React from 'react'
import Nav from '../components/Nav'
import Map from '../components/Map'

function Instructions() {
  return (
    <div>
        <Nav/>
        <div className='flex flex-col'>
            <div className='mx-auto mt-10 font-semibold'>
                <h1 className='text-center font-bold'>Instructions</h1>
                <p className='mt-2 mb-4'>1.Make Sure the item you bring to us is the item you put on the site.</p>
            <p className=' mb-4'>2.Come to our offices in Town (our address) below is our location</p>
            <p className=' mb-4'>3.To successfully complete trade come to our offices within the next 72 hours</p>
            <p className='text-center mb-4'>we are open 8-4 mon-sat</p>

            <div className='mt-10 mb-10'>
            <Map lat={-17.834175} long={31.044081}/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Instructions