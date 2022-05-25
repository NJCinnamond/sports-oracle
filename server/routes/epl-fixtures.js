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
    const query = { fixture_id: parseInt(req.params.id) };

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
    //TODO: Generate fixture id from hash of home team id and away team id and season
    console.log(req.body);
    const matchDocument = {
        fixture_id: req.body.fixture_id,
        last_modified: new Date(),
        home_team_id: req.body.home_team_id,
        away_team_id: req.body.away_team_id,
        season: req.body.season,
        ko_time: req.body.ko_time,
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

// Endpoint for updating premier league teams records
fixturesRoutes.route('/premier-league/fixtures/:id').patch(function (req, res) {
    const dbConnect = dbo.getDb();
    const query = { fixture_id: parseInt(req.params.id) };

    const newFields = {};
    if (req.body.ko_time) {
        newFields['ko_time'] = req.body.ko_time;
    };
    if (req.body.result) {
        newFields['result'] = req.body.result;
    };
    newFields['last_modified'] = new Date();

    const updates = {
        $set: newFields,
    };

    dbConnect
        .collection('epl-fixtures')
        .updateOne(query, updates, function (err, _result) {
            if (err) {
                res
                    .status(400)
                    .send(`Error updating team document with id ${query.team_id}`);
            } else {
                console.log(`Updated team document with id ${query.team_id}`);
                res.status(200).send();
            }
        });
});

// Endpoint for deleting premier league fixture record
fixturesRoutes.route('/premier-league/fixtures/:id').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const query = { fixture_id: parseInt(req.params.id) };

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