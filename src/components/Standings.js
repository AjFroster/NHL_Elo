import React, { useState, useEffect } from "react";

const Standings = () => {
  const [teams, setTeams] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "elo",
    direction: "descending",
  });

  useEffect(() => {
    console.log("Component mounted or updated.");

    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://nznbw20r0m.execute-api.us-east-1.amazonaws.com/default/NHL_Info_S3_Access"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let contentBody = await response.text();
        const jsonArray = JSON.parse(contentBody);
        const teams = jsonArray[0];
        const matches = jsonArray[1];

        // console.log(
        //   `Response Status: ${response.status}\nBody: ${contentBody}`
        // );

        setTeams(teams);
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

  console.log(teams);

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
                  src={process.env.PUBLIC_URL + teamDetails.image}
                  alt={`${teamName} logo`}
                  style={{ width: "30px", height: "30px" }}
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
