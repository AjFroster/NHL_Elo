import React, { useState, useEffect } from "react";

const Standings = () => {
  const [teams, setTeams] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "elo",
    direction: "descending",
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("./nhl_teams.json");
        const new_response = await fetch(
          "https://nznbw20r0m.execute-api.us-east-1.amazonaws.com/default/NHL_Info_S3_Access"
        );

        console.log(`new_response = ${new_response}`);

        var data1 = new_response[0];
        var data2 = new_response[1];

        // const data = await response.json();
        // const new_data = await new_response.json();

        console.log(`new_data = ${data1}`);

        // setTeams(data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    fetchTeams();
  }, []);

  // Function to handle the sorting of columns
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    const sortedData = Object.entries(teams).sort((a, b) => {
      // Correctly extracting valueA and valueB based on the sorting key
      const valueA = a[1][key];
      const valueB = b[1][key];
      if (valueA < valueB) return direction === "ascending" ? -1 : 1;
      if (valueA > valueB) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTeams(Object.fromEntries(sortedData)); // Convert the sorted array back to an object
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h1>NHL Elo Standings</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData("teamName")}>Team</th>
            <th onClick={() => sortData("elo")}>Elo Rating</th>
            <th>Logo</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(teams).map(([teamName, teamDetails]) => (
            <tr key={teamName}>
              <td>{teamName}</td>
              <td>{teamDetails.elo}</td>
              <td>
                <img
                  src={teamDetails.image}
                  alt={`${teamName} logo`}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
