import React from 'react'

import {Search} from 'lucide-react';
import AddCategory from '@/components/db/AddCategory';

function Home() {
  return (
    <div className='relative min-h-[100dvh]
      flex flex-col items-center
    '>

      <div className='flex w-[60%]'>

        <div className='flex relative w-full'>
          {/* Search Bar div */}
          <input type="text" name="search" id="search"
            placeholder='Search ( F )'
            className='border-b-[1px] border-white/20 px-5 py-2 pr-10 outline-none w-full'
            />
          <Search
            className='absolute right-2.5 top-1/2 -translate-y-1/2'
            size={20}
            />
        </div>

        <select name="gerne" id="gerne"
        className='outline-0 bg-black px-5 py-2'
        >
          <option value="any">Any</option>
          <option value="cat1">cat1</option>
          <option value="cat2">cat2</option>
          <option value="cat3">cat3</option>
        </select>

      </div>

      {/* <AddCategory/> */}


    </div>
  )
}

export default Home
