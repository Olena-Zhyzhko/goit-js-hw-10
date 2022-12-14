import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
let list = document.querySelector('.country-list');
let card = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputListener, DEBOUNCE_DELAY));


function onInputListener(e) {
    const name = e.target.value.trim();
    if (name === "") {
        return;
    } else {
        fetchCountries(name)
        .then(sarchAnswer)
            .catch(error => {
                if (error.code === 404) {
                    notFound();
                } else {
                    Notiflix.Notify.failure('Unknow error');
                }
                cleanerCountryResult();
        });
}
}

function sarchAnswer(array) {
    cleanerCountryResult();
    if (array.length >= 10) {
        largeSarchResult();
    } else if (array.length >= 2 && array.length <= 10) {
            insertList(array);
    } else {
        insertCountryCard(array);
    } 
}      

function largeSarchResult() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;}

function cleanerCountryResult() {
    list.innerHTML = "";
    card.innerHTML = "";
}

function createCountryCard(array) {
    const countryInfo = array[0];
    const { flag, name, capital, population, languages, } = countryInfo;
    return `<div> 
    <h2 class="country-name"><img class="country-flag"src="${flag}" alt="Country flag" width="40">${name}</h2>
        <ul class="country-list ">
        <li class="countries-param"><span class="param">Capital:</span> ${capital}</li>
        <li class="countries-param"><span class="param">Population:</span> ${population}</li>
        <li class="countries-param"><span class="param">Languages:</span> ${languages.map(language => {
            const languageItem = language.name;
            return languageItem;
            }).join(", ")}</li >
        </ul>
        </div>`
};

function insertCountryCard(array) {
    const countryCard = createCountryCard(array);
        card.innerHTML = countryCard;
}

function createSarchItem(item) {
    return `
    <li class="country-item"><img class="country-flag" src="${item.flag}" alt="Country flag" width="30"><span>${item.name}</span></li>`;
}

function createSarchList(array) {
    return array.reduce((acc, item) => acc + createSarchItem(item), "")
}

function insertList(array) {
    const sarchList = createSarchList(array);
    list.innerHTML = sarchList;
}

function notFound() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    cleanerCountryResult();
}