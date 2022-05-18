const express = require('express');

// fixturesRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /premier-league/fixtures.
const fixturesRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// Endpoint for getting all Premier League fixture records
fixturesRoutes.route('/premier-league/fixtures').get(async function (_req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection('epl-fixtures')
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

// Endpoint for getting Premier League fixture record by id
fixturesRoutes.route('/premier-league/fixtures/:id').get((req, res) => {
    const dbConnect = dbo.getDb();
    const query = { id: parseInt(req.params.id) };

    dbConnect
        .collection('epl-fixtures')
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

// Endpoint for creating premier league fixture records
fixturesRoutes.route('/premier-league/fixtures').post(function (req, res) {
    const dbConnect = dbo.getDb();

    const matchDocument = {
        id: req.body.id,
        last_modified: new Date(),
        home: req.body.home_team,
        away: req.body.away_team,
        ko: req.body.kickoff_time,
        result: req.body.result,
    };

    dbConnect
        .collection('epl-fixtures')
        .insertOne(matchDocument, function (err, result) {
            if (err) {
                res.status(400).send('Error inserting record.');
            } else {
                console.log(`Added a new document with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
});

// Endpoint for deleting premier league fixture record
fixturesRoutes.route('/premier-league/fixtures/:id').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const query = { id: parseInt(req.params.id) };

    dbConnect
        .collection('epl-fixtures')
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

module.exports = fixturesRoutes;