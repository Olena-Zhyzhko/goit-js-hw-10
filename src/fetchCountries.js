import Notiflix from 'notiflix';

const URL = 'https://restcountries.com/v2/name/';

function fetchCountries(name) {
    return fetch(`${URL}${name}?fields=name,capital,population,flag,languages`)
        .then(response => {
            // if (!response.ok) {
            //     throw new Error(Notiflix.Notify.failure('Oops, there is no country with that name'));
            // }
            return response.json();
        })
}
    
export { fetchCountries };
