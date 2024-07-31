import React, { useState, useEffect } from "react";
import BetCard from "./BetCard";

const Bets = () => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    // Fetch the matchups data
    const fetchMatchups = async () => {
      try {
        const [matchupsResponse, teamsResponse] = await Promise.all([
          fetch("./matchups.json"),
          fetch("./nhl_teams.json"),
        ]);

        const matchupsData = await matchupsResponse.json();
        const teamsData = await teamsResponse.json();

        const matchupArray = Object.keys(matchupsData).map((key) => {
          const gameDetails = matchupsData[key];
          return {
            id: key,
            team1: {
              name: gameDetails.team1,
              logo: teamsData[gameDetails.team1]["image"],
              elo: teamsData[gameDetails.team1]["elo"],
            },
            team2: {
              name: gameDetails.team2,
              logo: teamsData[gameDetails.team2]["image"],
              elo: teamsData[gameDetails.team2]["elo"],
            },
          };
        });

        setMatchups(matchupArray);
      } catch (error) {
        console.error("Failed to fetch matchups:", error);
      }
    };

    fetchMatchups();
  }, []);

  return (
    <div>
      {matchups.map((game) => (
        <div key={game.id}>
          <BetCard key={game.id} game={game} />
        </div>
      ))}
    </div>
  );
};

export default Bets;
