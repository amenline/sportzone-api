const fetch = require("node-fetch");

/**
 * Fetch data from RapidApi
 * @param {string} url
 * @returns json object
 */
const rapid_fetch = async (url) => {
  try {
    const headers = {
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    };
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

/**
 * Gets the current year
 * @returns string
 */
const get_year = () => {
  const date = new Date();
  const year = date.getFullYear();
  return year;
};

module.exports = {
  rapid_fetch,
  get_year,
};
