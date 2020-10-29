const fetch = require("node-fetch");
const redis = require("redis");
const { promisify } = require("util");

/**
 * Sets data to redis
 * @param {string} redis_key
 * @param {any} value
 * @returns null
 */
const set_data_to_redis = async (redis_key, value) => {
  try {
    let client = redis.createClient();
    client.on("error", function (error) {
      console.error(error);
    });
    const setAsync = promisify(client.set).bind(client);

    const response = await setAsync(redis_key, JSON.stringify(value));
    console.log(`${redis_key} :`, response);
  } catch (error) {
    console.log(error);
    // exit
    process.exit(1);
  }
};

/**
 * Fetch data from RapidApi
 * @param {string} url
 * @returns object
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

/**
 * Compares to determine which of two dates is past
 * Returns false if the first date is past compared to the second
 * @param {Date} firstDate
 * @param {Date} secondDate
 * @returns boolean
 */
const compare_dates = (firstDate, secondDate = new Date()) => {
  return firstDate.setHours(0, 0, 0, 0) >= secondDate.setHours(0, 0, 0, 0);
};

module.exports = {
  rapid_fetch,
  get_year,
  compare_dates,
  set_data_to_redis,
};
