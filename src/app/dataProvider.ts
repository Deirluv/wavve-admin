import jsonServerProvider from 'ra-data-json-server';

export const dataProvider = jsonServerProvider('http://localhost:5000/api');