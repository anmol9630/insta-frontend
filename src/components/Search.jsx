import React, { useEffect } from 'react'
import { IoMdSearch } from "react-icons/io";
import SearchSuggestion from './SearchSuggestion';
import axios from '../../axiosConfig';
import { useloginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigator = useNavigate();
  const {loggedIn} = useloginContext()

  useEffect(() =>{
    if(!loggedIn){
      navigator('/login')
    }
  },[])
  
  const [search, setSearch] = React.useState('')
  const [searchItems, setSearchItems] = React.useState([])
  const searchUser = async() => {
      const response = await axios.post('/search' , {search})
      const data = response.data
      console.log(data);
      setSearchItems(data);
  }

  useEffect(() => {
    searchUser();
  },[search])

  return (
    <div className="h-[calc(100vh-8vh)] w-full dark:bg-zinc-900">
      <div className="py-4 px-4">
        <div className="searchBox flex w-full border-[1px] rounded-lg px-2 items-center">
          <IoMdSearch size={25} className='dark:text-white'/>
          <input type="text" className='w-full h-10 dark:bg-zinc-900 px-2 rounded-md' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search username'/>
        </div>
      </div>
        <div className="suggestions px-4 py-4">
          {searchItems.length > 0 && searchItems.map((e) => {
            return (
              <SearchSuggestion key={e._id} {...e} setSearch={setSearch}/>
            )
          })}
      </div>
    </div>
  )
}

export default Search