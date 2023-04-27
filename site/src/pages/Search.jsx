import React, { useState } from "react";
import MovieResult from '../components/MovieResult';
import SearchBox from '../components/SearchBox';
import SearchFilter from '../components/SearchFilter';
import {
HStack, VStack,
Card, CardHeader, CardBody, Heading,
Flex, Spacer,StackDivider,
} from '@chakra-ui/react'
// import YearPicker from "../components/YearPicker";
import SearchBackend from "../components/SearchBackend";

// This page provides a button with a redirect to "/other"
function Search() {

  //empty array for movie results
  const [movies, setMovies] = useState([]);
  const [query, setQuery]= useState('');
  const [resultCount, setResultCount] = useState(10);
  // const [startYear, setStartYear] = useState("");
  // const [endYear, setEndYear] = useState("");
  const [selectedFilters, setSelectedFilters]= useState([]);

  const options=[
      {label: "Movie Title", value: "movie"},
      {label: "Keyword", value: "keyword"},
      {label: "Actor/Actress", value: "person"}];
  const handleSelectFilter = (selectedOptions) => {
      setSelectedFilters(selectedOptions);
  };

  // const handleStartYear = (start) =>{
  //     setStartYear(start);
  // }
  // const handleEndYear = (end) => {
  //     setEndYear(end);
  // }


  const getMoreResults = () => {
      setResultCount((resultCount+10));
  }

  const handleSearchResults = (resultantMovies) =>{
      console.log("HELLOOOOO");
      console.log(resultantMovies)
      setMovies(resultantMovies);

      console.log(movies);
  }

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }


    // sort by similarity to search result (string compare)
    // pseudorandom order
    // console.log(selectedFilters);
    // let moviesArray = [];
    // let yearURL = "";
    // if (startYear !== ""){
    //     yearURL += '&primary_release_year=' + startYear;
    // }
    // if (endYear !== ""){
    //     yearURL += '&year=' + endYear;
    // }

    // for (let i=0; i < selectedFilters.length; i++){
    //     console.log("Iteration is", i);
    //     console.log("current filter is", selectedFilters[i]);
    //     let API_URL = baseURL + selectedFilters[i] + APIkey+ '&query=' + query + yearURL;
    //     console.log(API_URL);
    //     try{
    //         const response = await fetch(API_URL);
    //         const responseJson = await response.json();
    //         console.log(responseJson.results);
    //
    //         if (responseJson.results){
    //             moviesArray = moviesArray.concat(responseJson.results);
    //         }
    //     } catch(error) {
    //         console.log(error);
    //     }
    // // }
    // console.log("MOVIES ARRAY", moviesArray);
    // assignMovies(shuffleArray(moviesArray));
    //
    // console.log("MOVIES ARE", movies);
    // console.log("Start Year: ");
    // console.log(startYear);
    // console.log("End Year: ");
    // console.log(endYear);

    //
    // useEffect(() => {
    //     fetch(`/search_movies/${query}`)
    //         .then(response => response.json())
    //         .then(data => assignMovies(data))
    //         .catch(error => console.error(error));
    //     console.log(movies);
    // }, [query]);

  const handleSearch = (query) => {
      setQuery(query);
  };
  return (

<div>
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
                {/*<YearPicker onStartYearSelect={handleStartYear} onEndYearSelect={handleEndYear}/>*/}
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
        <SearchBackend query = {query} filters = {selectedFilters} handleSearch = {handleSearchResults} />
        <MovieResult movies = {movies} numResults = {resultCount}/>
        <button onClick={getMoreResults}>Load More</button>

</VStack>

</div>
  );
}

export default Search;