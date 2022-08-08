const URL = 'https://restcountries.com/v2/name/';

function fetchCountries(name) {
    return fetch(`${URL}${name}?fields=name,capital,population,flag,languages`)
}
    
export { fetchCountries };
