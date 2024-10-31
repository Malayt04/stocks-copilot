"use server"

import axios from 'axios';
export const fetchStock  = async (stock : string) => {
    const apiKey = process.env.TWELVE_DATA_API_KEY
    try {
        const response = await axios.get(`https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(stock)}&interval=1min&apikey=${apiKey}&source=docs`);
        return response.data
    } catch (error) {
        console.log(error);
        return;
    }
}