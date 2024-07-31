import React, { useState } from "react";
import Standings from "./Standings";
import Bets from "./Bets";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("elo");

  return (
    <div>
      <div className="tab-headers">
        <button
          onClick={() => setActiveTab("elo")}
          className={activeTab === "elo" ? "active" : ""}
        >
          Elo Rating
        </button>

        <button
          onClick={() => setActiveTab("bets")}
          className={activeTab === "bets" ? "active" : ""}
        >
          Bets
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "elo" && <Standings sortKey="elo" />}
        {activeTab === "bets" && <Bets />}
      </div>
    </div>
  );
};

export default Tabs;
