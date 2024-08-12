import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:8000/api/'});

/* export const retrieveData = API.get('/'); */
export const getReceipt = API.get('/receipts/');
export const getProducts = API.get('/products/');