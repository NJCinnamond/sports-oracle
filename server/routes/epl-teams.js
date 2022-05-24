const express = require('express');

// teamsRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /premier-league/teams.
const teamsRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// Endpoint for getting all Premier League teams records
teamsRoutes.route('/premier-league/teams').get(async function (_req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('epl-teams')
        .find({})
        .limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send('Error fetching documents.');
            } else {
                res.json(result);
            }
        });
});

// Endpoint for getting Premier League teams record by id
teamsRoutes.route('/premier-league/teams/:id').get((req, res) => {
    const dbConnect = dbo.getDb();
    const query = { team_id: parseInt(req.params.id) };

    dbConnect
        .collection('epl-teams')
        .find(query)
        .toArray(function (err, result) {
            if (err) {
                res
                    .status(400)
                    .send(`Error deleting document with id ${query.id}!`);
            } else {
                res.json(result);
            }
        });
});

// Endpoint for creating premier league teams records
teamsRoutes.route('/premier-league/teams').post(function (req, res) {
    const dbConnect = dbo.getDb();
    console.log(req.body);
    const matchDocument = {
        team_id: req.body.team_id,
        last_modified: new Date(),
        short_name: req.body.short_name,
        long_name: req.body.long_name,
        crest_url: req.body.crest_url,
    };

    dbConnect
        .collection('epl-teams')
        .insertOne(matchDocument, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting record.');
            } else {
                console.log(`Added a new document with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
});

// Endpoint for deleting premier league teams record
teamsRoutes.route('/premier-league/teams/:id').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const query = { team_id: parseInt(req.params.id) };

    dbConnect
        .collection('epl-teams')
        .deleteOne(query, function (err, result) {
            if (err) {
                res
                    .status(400)
                    .send(`Error deleting document with id ${query.id}!`);
            } else {
                console.log('1 document deleted');
                res.json(result);
            }
        });
});

module.exports = teamsRoutes;