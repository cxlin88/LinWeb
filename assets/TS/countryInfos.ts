import * as populations from '../JSON/country-by-population.json';
import * as abbreviations from '../JSON/country-by-abbreviation.json';
import * as capitals from '../JSON/country-by-capital-city.json';
import * as geos from '../JSON/country-by-geo-coordinates.json';
import * as govTypes from '../JSON/country-by-government-type.json';
import * as independences from '../JSON/country-by-independence-date.json';
import * as areas from '../JSON/country-by-surface-area.json';
import * as languages from '../JSON/country-by-languages.json';
import { countries, regions } from 'typed-countries';

export class CountryInformation {
    region: string;
    name: string;
    capital: string;
    iso: string;
    population: string;
    gdp: number;
    govType: string;
    independence: string;
    area: number;
    languages: string[];
    north: string;
    south: string;
    west: string;
    east: string;

    constructor()
    {
    }
}

class LanguageData{
    country: string;
    languages: string[];
}

class AreaData{
    country: string;
    area: number;
}

class IndependenceData{
    country: string;
    independence: string;
}

class PopulationData{
    country: string;
    population: string;
}

class IsoData{
    country: string;
    iso: string;
}

class CapitalData{
    country: string;
    capital: string;
}

class GovTypeData{
    country: string;
    govType: string;
}

class GeoData{
    country: string;
    north: string;
    south: string;
    west: string;
    east: string;
}

var PopulationList: PopulationData[];
var IsoList: IsoData[];
var CapitalList: CapitalData[];
var GovTypeList: GovTypeData[];
var GeoList: GeoData[];
var IndependenceList: IndependenceData[];
var AreaList: AreaData[];
var LanguageList: LanguageData[];

export declare var  CountryInformations: Array<CountryInformation>;

export function getCountryInfo()
{  
    getPopulationList();
    getIsoList();
    getCapitalList();
    getGeoList();
    getGovTypeList();
    getIndependenceList();
    getAreaList();
    getLanguageList();
    
    CountryInformations = new Array<CountryInformation>();
    regions.forEach(regionChild => {    
        const children = $.grep(countries, function(element, i) 
        { 
            return element.region === regionChild; 
        }); 

        children.forEach(countryData => {
            const countryInfo = new CountryInformation();  
            const abbreviation = IsoList.find(data => {
                return data.iso === countryData.iso.toLocaleUpperCase();
            });
      
            if (abbreviation == null)
            {
                return;
            }
            countryInfo.region = regionChild;
            countryInfo.name = abbreviation.country;  
            countryInfo.iso = abbreviation.iso;

            const population = PopulationList.find(populationData => {
                return populationData.country === countryInfo.name;
            });  
            countryInfo.population = population.population;

            const capital = CapitalList.find(capitalData => {
                return capitalData.country === countryInfo.name;
            });
            if (capital != null)
            {
                countryInfo.capital =  capital.capital;
            }

            const geo = GeoList.find(geoData => {
                return geoData.country === countryInfo.name;
            });
            if (geo != null)
            {
                countryInfo.north =  geo.north;
                countryInfo.south =  geo.south;                
                countryInfo.west =  geo.west;                
                countryInfo.east =  geo.east;            
            }

            const govType = GovTypeList.find(govTypeData => {
                return govTypeData.country === countryInfo.name;
            });
            if (govType != null)
            {
                countryInfo.govType =  govType.govType;         
            }

            const independence = IndependenceList.find(independenceData => {
                return independenceData.country === countryInfo.name;
            });
            if (independence != null)
            {
                countryInfo.independence =  independence.independence;         
            }

            const area = AreaList.find(areaData => {
                return areaData.country === countryInfo.name;
            });
            if (area != null)
            {
                countryInfo.area =  area.area;         
            }

            const language = LanguageList.find(languagesData => {
                return languagesData.country === countryInfo.name;
            });
            if (language != null)
            {
                countryInfo.languages =  language.languages.slice();         
            }

            CountryInformations.push(countryInfo);   
        }); 
      }); 
}

function getLanguageList()
{
    LanguageList = new Array<LanguageData>();
    languages.countries.forEach(element => {
        var languageData = LanguageList.find(data => {
            return data.country === element.country;
        });
        if (languageData == null)
        {
            languageData  = new LanguageData();
            languageData.languages = new Array<string>();
            LanguageList.push(languageData);
        }
        languageData.country = element.country;
        languageData.languages.push(element.language);        
    });
}

function getAreaList()
{
    AreaList = new Array<AreaData>();
    areas.countries.forEach(element => {
        const areaData  = new AreaData();
        areaData.country = element.country;
        areaData.area = element.area;        
        AreaList.push(areaData);
    });
}

function getIndependenceList()
{
    IndependenceList = new Array<IndependenceData>();
    independences.countries.forEach(element => {
        const independenceData  = new IndependenceData();
        independenceData.country = element.country;
        independenceData.independence = element.independence;        
        IndependenceList.push(independenceData);
    });
}

function getGovTypeList()
{
    GovTypeList = new Array<GovTypeData>();
    govTypes.countries.forEach(element => {
        const govTypeData  = new GovTypeData();
        govTypeData.country = element.country;
        govTypeData.govType = element.government;        
        GovTypeList.push(govTypeData);
    });
}

function getGeoList()
{
    GeoList = new Array<GeoData>();
    geos.countries.forEach(element => {
        const geoData  = new GeoData();
        geoData.country = element.country;
        geoData.north = element.north;   
        geoData.south = element.south;   
        geoData.west = element.west;           
        geoData.east = element.east;           
        GeoList.push(geoData);
    });
}

function getCapitalList()
{
    CapitalList = new Array<CapitalData>();
    capitals.countries.forEach(element => {
        const capitalData  = new CapitalData();
        capitalData.country = element.country;
        capitalData.capital = element.city;   
        CapitalList.push(capitalData);
    });
}

function getPopulationList()
{
    PopulationList = new Array<PopulationData>();
    populations.countries.forEach(element => {
        const populationData  = new PopulationData();
        populationData.country = element.country;
        populationData.population = element.population;   
        PopulationList.push(populationData);
    });
}

function getIsoList()
{
    IsoList = new Array<IsoData>();
    abbreviations.countries.forEach(element => {
        const abbreviationData  = new IsoData();
        abbreviationData.country = element.country;
        abbreviationData.iso = element.abbreviation;   
        IsoList.push(abbreviationData);
    });
}

