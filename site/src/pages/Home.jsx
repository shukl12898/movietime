import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieResult from '../components/MovieResult';
import SearchBox from '../components/SearchBox';
import SearchFilter from '../components/SearchFilter';

// This page provides a button with a redirect to "/other"
function Home() {
  // // fetchResponse is a constant in this component's state. Use handleFetchResponse(newValue)
  // // to update the value of fetchResponse
  const [fetchResponse, handleFetchResponse] = useState();



  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

  //empty array for movie results
  const [movies, assignMovies] = useState([]);
  const [query, setQuery]= useState('');
  const [resultCount, setResultCount] = useState(10);
  const [selectedFilter, setSelectedFilter]= useState("movie");

  const options=[
      {label: "Movie Title", value: "movie"},
      {label: "Keyword", value: "keyword"},
      {label: "Actor/Actress", value: "person"}];
  const handleSelectFilter = (selectedOption) => {
      setSelectedFilter(selectedOption);
  };


  const getMoreResults = () => {
      setResultCount((resultCount+10));
  }

  const getSearchResults = async(query,selectedFilter) => {

      const API_URL= 'https://api.themoviedb.org/3/search/' + selectedFilter + '?api_key=f0a2d3c27e0522ee834ad2e76ceeebb1&query='+ query;

      try{
          const response = await fetch(API_URL);

          const responseJson = await response.json();

          console.log(responseJson.results);

          if (responseJson.results) {
              assignMovies(responseJson.results)
          }
      }
      catch (e) {
          console.log(e);
      }


  };

  useEffect(()=>{
      getSearchResults(query,selectedFilter)
  },[query,selectedFilter]);

  // Anything returned will be rendered in React
  return (
    <div>
        <h1>Search</h1>
        <div className = "row">
            <div className="col">
                <SearchFilter options = {options} onSelect={handleSelectFilter}/>
            </div>
            <div className = "col">
                <SearchBox query ={query} setQuery = {setQuery}/>
            </div>

        </div>
        <MovieResult movies = {movies} filter = {selectedFilter} numResults = {resultCount}/>
        <button onClick={getMoreResults}>Load More</button>
    </div>
  );
}

export default Home;