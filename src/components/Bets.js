import React, { useState, useEffect } from "react";
import BetCard from "./BetCard";

const Bets = () => {
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    // Fetch the matchups data
    const fetchMatchups = async () => {
      try {
        const response = await fetch(
          "https://nznbw20r0m.execute-api.us-east-1.amazonaws.com/default/NHL_Info_S3_Access"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let contentBody = await response.text();
        const jsonArray = JSON.parse(contentBody);

        const matchupsData = jsonArray[1];
        const teamsData = jsonArray[0];

        const matchupArray = Object.keys(matchupsData).map((key) => {
          const gameDetails = matchupsData[key];
          return {
            id: key,
            team1: {
              name: gameDetails.team1,
              logo:
                process.env.PUBLIC_URL + teamsData[gameDetails.team1]["image"],
              elo: teamsData[gameDetails.team1]["elo"],
            },
            team2: {
              name: gameDetails.team2,
              logo:
                process.env.PUBLIC_URL + teamsData[gameDetails.team2]["image"],
              elo: teamsData[gameDetails.team2]["elo"],
            },
          };
        });

        setMatchups(matchupArray);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
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
