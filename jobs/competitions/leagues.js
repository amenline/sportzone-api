const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");

const fetch_leagues = async () => {
  try {
    const headers = {
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    };
    const response = await fetch(
      "https://api-football-v1.p.rapidapi.com/v2/leagues",
      {
        method: "GET",
        headers,
      }
    );
    const leagues = await response.json();
    const result = filterLeagues(leagues.api.leagues);
    res.send({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
