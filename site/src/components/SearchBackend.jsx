import {useEffect } from 'react';

function SearchBackend(props) {

    let url;


    // console.log(props.filters);

    if (props.filters && props.filters.length > 1){
        // console.log("FILTERS ARE:");
        // console.log(props.filters.size());
        url = 'search_multi/' + props.query + '/' + props.filters;
    }
    else{
        url = 'search_' + props.filters + '/' + props.query;
    }

    if (props.startYear){
        url +=  '/' + props.startYear;
    }
    else{
        url += '/0';
    }
    if (props.endYear){
        url += '/' + props.endYear;
    }
    else{
        url += '/0';
    }

    // console.log("URL IS" + url);
    console.log("FIlters are: " + props.filters);
    console.log("QUery is:" + props.query);
    useEffect(() => {
        console.log("useEffect is being called");

        if (!props.query) return;
        if (!props.fetchData) return;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const moviesArray = data.movieIDs;
                props.handleSearch(moviesArray);
                props.onFetchDataChange(false);
            })
            .catch(error => console.error(error));
    }, [props.query, props.filters, props.startYear, props.endYear, props.fetchData]);
    // console.log("MOVIES ARE: ")
    // console.log(movies);

}

export default SearchBackend;