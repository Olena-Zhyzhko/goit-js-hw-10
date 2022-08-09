const URL = 'https://restcountries.com/v2/name/';

function fetchCountries(name) {
    return fetch(`${URL}${name}?fields=name,capital,population,flag,languages`)
        .then(response => {
            if (!response.ok) {
                const error = new Error();
                error.code = response.status;
                return error;
            }
            return response.json();
        })


}
    
export { fetchCountries };
