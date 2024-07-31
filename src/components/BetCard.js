import React from "react";
import Card from "react-bootstrap/Card";

function BetCard({ game }) {
  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Body>
        <Card.Title>{game.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {game.team1.name} vs {game.team2.name}
        </Card.Subtitle>
        <img
          src={game.team1.logo}
          alt={`${game.team1.name} logo`}
          style={{ width: 50, height: 50 }}
        />
        <h4>vs</h4>
        <img
          src={game.team2.logo}
          alt={`${game.team2.name} logo`}
          style={{ width: 50, height: 50 }}
        />
        <Card.Text>
          ELO Ratings: {game.team1.name} {game.team1.elo} vs {game.team2.name}{" "}
          {game.team2.elo}
        </Card.Text>
        <Card.Link href="#">More Details</Card.Link>
        <Card.Link href="#">Place Bet</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default BetCard;
