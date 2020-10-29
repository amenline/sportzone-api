const express = require("express");
const fetch = require("node-fetch");
const { rapid_fetch, get_year, compare_dates } = require("../../helper");
const redis = require("redis");

const fetch_leagues = async () => {
  try {
    const leagues = await rapid_fetch(
      "https://api-football-v1.p.rapidapi.com/v2/leagues"
    );
    const result = filter_leagues(leagues.api.leagues);
    return result;
  } catch (error) {
    console.log(error);
    return { error };
  }
};

const filter_leagues = (leagues) => {
  const competitions = [];
  const filteredLeague = [];
  leagues.forEach((league) => {
    const year = get_year();
    // filter based on year
    if (league.season == year || league.season == year + 1) {
      // filter for 'World'
      if (league.country == "World") {
        if (
          league.name.includes("Africa Cup of Nations") ||
          league.name.includes("Euro Championship") ||
          league.name.includes("Friendlies") ||
          league.name.includes("UEFA Champions League") ||
          league.name.includes("UEFA Europa League") ||
          league.name.includes("World Cup")
        ) {
          filteredLeague.push(league);
        }
      }
      // filter for England
      if (
        league.country == "England" &&
        !league.name.includes("Women") &&
        !league.name.includes("U18")
      ) {
        if (
          league.name.includes("FA Cup") ||
          league.name.includes("Premier League") ||
          league.name.includes("Championship")
        ) {
          filteredLeague.push(league);
        }
      }
      // filter for Germany
      if (
        league.country == "Germany" &&
        !league.name.includes("Women") &&
        !league.name.includes("U19")
      ) {
        if (league.name.includes("Bundesliga")) {
          filteredLeague.push(league);
        }
      }
      // filter for Italy
      if (league.country == "Italy" && !league.name.includes("Women")) {
        if (league.name.includes("Serie A")) {
          filteredLeague.push(league);
        }
      }
      // filter for Spain
      if (league.country == "Spain" && !league.name.includes("Women")) {
        if (league.name.includes("Primera Division")) {
          filteredLeague.push(league);
        }
      }
      // filter for USA
      if (league.country == "USA" && !league.name.includes("Women")) {
        if (league.name.includes("Major League Soccer")) {
          filteredLeague.push(league);
        }
      }
    }
  });

  // remove all completed leagues
  filteredLeague.forEach((league) => {
    if (compare_dates(new Date(league.season_end))) {
      competitions.push(league);
    }
  });

  return {
    all: filteredLeague,
    ongoing: competitions,
  };
};

module.exports = fetch_leagues;

// world
// "Africa Cup of Nations"
// "Euro Championship"
// "Friendlies"
// "UEFA Champions League"
// "UEFA Europa League"
// "World Cup"

// England
// "FA Cup"
// "Premier League"
// "Championship"

// Germany
// "Bundesliga"

// Italy
// "Serie A"

// Spain
// "Primera Division"

// USA
// "Major League Soccer"
