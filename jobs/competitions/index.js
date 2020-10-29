const redis = require("redis");
const fetch_leagues = require("./leagues");
const { promisify } = require("util");

// redis client
let client = redis.createClient();
client.on("error", function (error) {
  console.error(error);
});
const setAsync = promisify(client.set).bind(client);

// set fetched news to Redis
const fetch_and_save_competitions = async (redis_key = "competitions") => {
  try {
    const competitions = await fetch_leagues();
    const response = await setAsync(redis_key, JSON.stringify(competitions));
    console.log(`${redis_key} :`, response);
  } catch (error) {
    console.log(error);
    // exit
    process.exit(1);
  }
};

module.exports = fetch_and_save_competitions;
