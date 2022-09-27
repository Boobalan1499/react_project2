import React from 'react'
import {useState, useEffect} from "react";
import SearchIcon from '@material-ui/icons/Search';
import './Searchbar.css'
import axios from "axios";
import Loader from "./Loader"

const SearchBar = () => {
  const [data, setData] = useState([])
  const [isloading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [search, setSearch] =useState("")
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try{
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key:"rLPpC82lCPcn9fLuYPfXEUluM6gFNuvD" 
        }
       });
       console.log(results);
       setData(results.data.data);
          
      } catch(err) {
         setIsError(true);
         setTimeout(() => setIsError(false),4000);

      }
      
      

       setIsLoading(false)
    };

    fetchData()
  }, []);

  const renderGifs = () => {
    if(isloading) {
      return <Loader/>;
    }
    return data.map(el => {
      return(
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url}></img>
        </div>
      )
    })
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "rLPpC82lCPcn9fLuYPfXEUluM6gFNuvD" ,
          q: search
        }
      });
      setData(results.data.data);
      setIsLoading(false);
     
  }
  return (
    <>
    <form className="form-inline justify-content-center m-2">
      <input value={search} onChange={handleSearchChange} type ="text" placeholder="search Gifs"
        className ="form-control"/>
        <div className="searchIcon">
        <SearchIcon onClick={handleSubmit}/>
      </div>
       
    </form>
    <div className="container gifs">{renderGifs()}

      
          </div>
          </>
  )
  }
export default SearchBar;