import React, {useState} from "react";
import MovieResult from '../components/MovieResult';
import SearchBox from '../components/SearchBox';
import SearchFilter from '../components/SearchFilter';
import {
HStack, VStack,
Card, CardHeader, CardBody, Heading,
Flex, Spacer,StackDivider,
} from '@chakra-ui/react'
import YearPicker from "../components/YearPicker";
import SearchBackend from "../components/SearchBackend";

// This page provides a button with a redirect to "/other"
function Search() {

  //empty array for movie results
  const [movies, setMovies] = useState([]);
  const [query, setQuery]= useState('');
  const [resultCount, setResultCount] = useState(10);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [selectedFilters, setSelectedFilters]= useState([]);
  const [fetchData, setFetchData] = useState(false);

    const options=[
  {label: "Movie Title", value: "movie"},
  {label: "Keyword", value: "keyword"},
  {label: "Actor/Actress", value: "person"}];


  const handleSelectFilter = (selectedOptions) => {
      setSelectedFilters(selectedOptions);
  };

  const handleCastClick = (newQuery) =>{
      setSelectedFilters(["person"]);
      setQuery(newQuery);
      setFetchData(true);
  }

  const handleGenreClick = (newQuery) => {
      setSelectedFilters(["keyword"]);
      setQuery(newQuery);
      setFetchData(true);
  }


  const handleSearchSubmitted = (submitted) => {
      setFetchData(submitted);
  };

  const handleStartYear = (start) =>{
      setStartYear(start);
  }
  const handleEndYear = (end) => {
      setEndYear(end);
  }


  const getMoreResults = () => {
      setResultCount((resultCount+10));
  }

  const handleSearchResults = (resultantMovies) =>{
      setMovies(resultantMovies);
  }

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
              <Heading id="searchHeading" size='md'>Search</Heading>
          </CardHeader>
          <CardBody>
            <HStack>
                <YearPicker onStartYearSelect={handleStartYear} onEndYearSelect={handleEndYear}/>
              <SearchFilter options = {options} onSelect={handleSelectFilter}/>
              <SearchBox onSearch ={handleSearch} onSubmitted = {handleSearchSubmitted}/>
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
        <SearchBackend query = {query} filters = {selectedFilters} startYear = {startYear} endYear = {endYear} handleSearch = {handleSearchResults} fetchData = {fetchData} onFetchDataChange = {handleSearchSubmitted}/>
        <MovieResult movies = {movies} numResults = {resultCount} handleCast = {handleCastClick} handleGenre = {handleGenreClick}/>
        <button onClick={getMoreResults}>Load More</button>

</VStack>

</div>
  );
}

export default Search;
