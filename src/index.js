import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
let name;

const input = document.querySelector('#search-box');
let list = document.querySelector('.country-list');
let card = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputListener, DEBOUNCE_DELAY));


function onInputListener(e) {
    name = e.target.value.trim();
    if (name === "") {
        cleanerListCountry();
        cleanerCardCountry();
        return;
    } else {
    // console.log(name);
        fetchCountries(name)
        .then(sarchAnswer)
        .catch(error => {
            console.log(error);
        });
}
}

function sarchAnswer(array) {
    if (array.length >= 10) {
        largeSarchResult(array);
    } else if (array.length >= 2 && array.length <= 10) {
        insertList(array);
    } else if (array.length == 1) {
        insertCountryCard(array);
    }
}      

function largeSarchResult(array) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    cleanerListCountry();
    cleanerCardCountry();
        return;}

function cleanerListCountry() {
    list.innerHTML = "";
}

function cleanerCardCountry() {
    card.innerHTML = "";
}

// Створює картку країни ---------------------------------------
function createCountryCard(array) {
    // console.log(array[0]);
    const countryInfo = array[0];
    const { flag, name, capital, population, languages, } = countryInfo;
    return `<div> <img src="${flag}" alt="Country flag" width="60"><h2>${name}</h2>
        <ul class="countries_atributes">
        <li>Capital: ${capital}</li>
        <li>Population: ${population} </li>
        <li>Languages: ${languages.map(language => {
            const languageItem = language.name;
            return languageItem;
            }).join(", ")}</li >
        </ul>
        </div>
`
};

function insertCountryCard(array) {
    const countryCard = createCountryCard(array);
    cleanerListCountry();
        card.innerHTML = countryCard;
}
// --------------------------------------------------------


// Создает рахметку списка поиска -----------
function createSarchItem(item) {
    return `
    <img src="${item.flag}" alt="Country flag" width="30"><li>${item.name}</li>`;
}

function createSarchList(array) {
return array.reduce((acc, item) => acc + createSarchItem(item), "")
}

function insertList(array) {
        cleanerCardCountry();
        const sarchList = createSarchList(array);
        list.innerHTML = sarchList;
}
// --------------------------------

