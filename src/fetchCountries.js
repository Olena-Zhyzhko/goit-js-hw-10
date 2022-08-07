import Notiflix from 'notiflix';

function fetchCountries(name) {
    // console.log(name);
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flag,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error(Notiflix.Notify.failure('Oops, there is no country with that name'));
            }
            return response.json();
        })
}
    
export { fetchCountries };
