import React, { useState } from 'react'
import SearchProfile from './SearchProfile';

const SearchSuggestion = (props) => {
  const [viewProfile , setViewProfile] = useState(false);
  const {name,username,profileImg,setSearch} = props;

  const handleSearchSuggestionClick = () => {
    setViewProfile(!viewProfile);
  }



  return (
    <>
    {viewProfile && <SearchProfile {...props} setSearch={setSearch} setViewProfile={setViewProfile}/>}
    <div className="searchResult flex gap-4 items-center py-1 w-full " onClick={handleSearchSuggestionClick}>
          <div className="profilePart h-16 w-16 rounded-full bg-gray-400 overflow-hidden">
            <img src={`http://localhost:3000/${profileImg}`} className='w-full h-full object-cover object-center' alt="" />
          </div>
          <div className="info dark:text-white">
            <p className='text-lg font-md'>{username}</p>
            <p className='capitalize text-sm'>{name}</p>
          </div>
    </div>
    </>
  )
}

export default SearchSuggestion