const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Use body-parser middleware to parse incoming request bodies
app.use(bodyParser.json());

// In-memory store for teams
let teams = [
  {
    id: 1,
    name: 'Mumbai Indians',
    city: 'Mumbai',
    captain: 'Rohit Sharma',
    vice_captain: 'Kieron Pollard',
    players: [
      { id: 1, name: 'Jasprit Bumrah', role: 'Bowler' },
      { id: 2, name: 'Quinton de Kock', role: 'Wicket-keeper batsman' },
      { id: 3, name: 'Hardik Pandya', role: 'All-rounder' },
    ],
  },
  {
    id: 2,
    name: 'Chennai Super Kings',
    city: 'Chennai',
    captain: 'MS Dhoni',
    vice_captain: 'Suresh Raina',
    players: [
      { id: 4, name: 'Ravindra Jadeja', role: 'All-rounder' },
      { id: 5, name: 'Faf du Plessis', role: 'Batsman' },
      { id: 6, name: 'Deepak Chahar', role: 'Bowler' },
    ],
  },
];

// Delete Team API
app.delete('/api/teams/:team_id', (req, res) => {
  const team_id = parseInt(req.params.team_id);
  const teamIndex = teams.findIndex((team) => team.id === team_id);
  if (teamIndex !== -1) {
    teams.splice(teamIndex, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Update Team Info API
app.put('/api/teams/:team_id', (req, res) => {
  const team_id = parseInt(req.params.team_id);
  const teamIndex = teams.findIndex((team) => team.id === team_id);
  if (teamIndex !== -1) {
    teams[teamIndex] = { ...teams[teamIndex], ...req.body };
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Get Team with Players API
app.get('/api/teams/:team_id', (req, res) => {
  const team_id = parseInt(req.params.team_id);
  const include_players = req.query.include_players === 'true';

  const team = teams.find((team) => team.id === team_id);
  if (team) {
    if (include_players) {
      res.json(team);
    } else {
      const { players, ...teamWithoutPlayers } = team;
      res.json(teamWithoutPlayers);
    }
  } else {
    res.sendStatus(404);
  }
});

// Add Captain and Vice-Captain Attributes API
app.post('/api/teams/:team_id/attributes', (req, res) => {
  const team_id = parseInt(req.params.team_id);
  const teamIndex = teams.findIndex((team) => team.id === team_id);
  if (teamIndex !== -1) {
    teams[teamIndex] = { ...teams[teamIndex], ...req.body };
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
