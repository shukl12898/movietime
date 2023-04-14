import React, { useState, useEffect } from "react";
import MovieResult from '../components/MovieResult';
import SearchBox from '../components/SearchBox';
import SearchFilter from '../components/SearchFilter';
import NavBar from '../components/NavBar';
import {
HStack, VStack,
Card, CardHeader, CardBody, Heading,
Flex, Spacer,StackDivider,
} from '@chakra-ui/react'

// This page provides a button with a redirect to "/other"
function Search() {

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


  const getSearchResults = async(query, selectedFilter) => {
      const API_URL = 'https://api.themoviedb.org/3/search/' + selectedFilter + '?api_key=f0a2d3c27e0522ee834ad2e76ceeebb1&query='+ query;

      console.log(API_URL);
      try{
          const response = await fetch(API_URL);
          const responseJson = await response.json();
          console.log(responseJson.results);

          if (responseJson.results){
              assignMovies(responseJson.results)
          }
      } catch(error) {
          console.log(error);
      }
  };

  useEffect(()=>{
          getSearchResults(query,selectedFilter);
  },[query,selectedFilter]);


  const handleSearch = (query) => {
      setQuery(query);
  };
  return (

<div>
    <NavBar/>
    <br/>
    <br/>
 <Flex>
 <Spacer />
        <Card variant='elevated' size='md'>
          <CardHeader>
              <Heading size='md'>Search</Heading>
          </CardHeader>
          <CardBody>
            <HStack>
              <SearchFilter options = {options} onSelect={handleSelectFilter}/>
              <SearchBox onSearch ={handleSearch} />
            </HStack>

          </CardBody>
        </Card>
        <Spacer />
        </Flex>
<VStack
  divider={<StackDivider borderColor='gray.200' />}
  spacing={4}
  align='center'
>
        <MovieResult movies = {movies} filter = {selectedFilter} numResults = {resultCount}/>
        <button onClick={getMoreResults}>Load More</button>

</VStack>

</div>
  );
}

export default Search;