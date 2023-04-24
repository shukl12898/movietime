import React, { useState, useEffect } from 'react';

function SearchBackend(props) {
    const [movies, assignMovies] = useState(null);
    let url;

    // console.log(props.filters);

    if (props.filters && props.filters.length > 1){
        console.log("FILTERS ARE:");
        // console.log(props.filters.size());
        url = 'search_multi/' + props.query + '/' + props.filters;
    }
    else{
        url = 'search_' + props.filters + '/' + props.query;
    }
    console.log("URL IS" + url);

    useEffect(() => {
        if (!props.query) return;
        fetch(url)

            .then(response => response.json())
            .then(data => assignMovies(data))
            .catch(error => console.error(error));
    }, [props.query]);
    console.log("MOVIES ARE: ")
    console.log(movies);

    // if (!movies) {
    //     return null;
    // }

    // return (
    //     <div>
    //         {movies.movieIDs.map((movie, index) => (
    //             <div key={index}>
    //                 <h1>{movie}</h1>
    //             </div>
    //         ))}
    //     </div>
    // );
}

export default SearchBackend;