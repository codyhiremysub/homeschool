import alabamaCities from '../constants/cities/alabama-cities';
import arkansasCities from '../constants/cities/arkansas-cities';
import connecticutCities from '../constants/cities/connecticut-cities';
import delawareCities from '../constants/cities/delaware-cities';
import floridaCities from '../constants/cities/florida-cities';
import georgiaCities from '../constants/cities/georgia-cities';
import idahoCities from '../constants/cities/idaho-cities';
import illinoisCities from '../constants/cities/illinois-cities';
import indianaCities from '../constants/cities/indiana-cities';
import kentuckyCities from '../constants/cities/kentucky-cities';
import louisianaCities from '../constants/cities/louisiana-cities';
import marylandCities from '../constants/cities/maryland-cities';
import massachusettsCities from '../constants/cities/massachusetts-cities';
import michiganCities from '../constants/cities/michigan-cities';
import minnesotaCities from '../constants/cities/minnesota-cities';
import mississippiCities from '../constants/cities/mississippi-cities';
import missouriCities from '../constants/cities/missouri-cities';
import northCarolinaCities from '../constants/cities/north-carolina-cities';
import ohioCities from '../constants/cities/ohio-cities';
import oklahomaCities from '../constants/cities/oklahoma-cities';
import pennsylvaniaCities from '../constants/cities/pennsylvania-cities';
import rhodeIslandCities from '../constants/cities/rhode-island-cities';
import southCarolinaCities from '../constants/cities/south-carolina-cities';
import tennesseeCities from '../constants/cities/tennessee-cities';
import texasCities from '../constants/cities/texas-cities';
import virginiaCities from '../constants/cities/virginia-cities';
import westVirginiaCities from '../constants/cities/west-virginia-cities';
import iowaCities from '../constants/cities/iowa-cities';
import maineCities from '../constants/cities/maine-cities';
import wisconsinCities from '../constants/cities/wisconsin-cities';
import vermontCities from '../constants/cities/vermont-cities';
import newHampshireCities from '../constants/cities/new-hampshire-cities';
import newJerseyCities from '../constants/cities/new-jersey-cities';
import newYorkCities from '../constants/cities/new-york-cities';

/**
 * The getCities function returns an array of cities based on the input state, sorted alphabetically.
 * @param state - The state parameter is a string representing the name of a US state for which the
 * function will return an array of cities.
 * @returns returns an array of objects with `label` and `value` properties,
 * representing the cities in the specified state. If the `state` argument is not provided or is not
 * found in the `cities` map, an empty array is returned.
 */
const getCities = (state) => {
  const cities = new Map([
    ['Texas', texasCities],
    ['Florida', floridaCities],
    ['Alabama', alabamaCities],
    ['Arkansas', arkansasCities],
    ['North Carolina', northCarolinaCities],
    ['South Carolina', southCarolinaCities],
    ['Tennessee', tennesseeCities],
    ['Oklahoma', oklahomaCities],
    ['Georgia', georgiaCities],
    ['Virginia', virginiaCities],
    ['Mississippi', mississippiCities],
    ['Louisiana', louisianaCities],
    ['Ohio', ohioCities],
    ['Kentucky', kentuckyCities],
    ['West Virginia', westVirginiaCities],
    ['Indiana', indianaCities],
    ['Illinois', illinoisCities],
    ['Missouri', missouriCities],
    ['Idaho', idahoCities],
    ['Pennsylvania', pennsylvaniaCities],
    ['Rhode Island', rhodeIslandCities],
    ['Connecticut', connecticutCities],
    ['Maryland', marylandCities],
    ['Delaware', delawareCities],
    ['Massachusetts', massachusettsCities],
    ['Iowa', iowaCities],
    ['Maine', maineCities],
    ['Michigan', michiganCities],
    ['Minnesota', minnesotaCities],
    ['Wisconsin', wisconsinCities],
    ['New Hampshire', newHampshireCities],
    ['Vermont', vermontCities],
    ['New Jersey', newJerseyCities],
    ['New York', newYorkCities],
  ]);
  const citiesInState = cities.get(state);
  return state && citiesInState
    ? citiesInState
        .map((city) => ({ label: city, value: city }))
        .sort((state) => state.label)
    : [];
};

export default getCities;
