### Right now this file mocks an API call to get EPL data (could be ESPN, or other)
### This file will be replaced with a real API call in the future
### As of now, the API returns data from .../data/epl_data.json

from datetime import datetime
import json
import os

dirname = os.path.dirname(__file__)

team_data_fname = "../../data/epl/teams.json"
fixture_data_fname = "../../data/epl/fixtures.json"


class SportsAPI:
    def get_epl_team_data(self):
        team_data_path = os.path.join(dirname, team_data_fname)
        f = open(team_data_path)
        data = json.load(f)
        return data

    def get_epl_fixtures_data(self, start_date: datetime, end_date: datetime):
        fixture_data_path = os.path.join(dirname, fixture_data_fname)
        f = open(fixture_data_path)
        data = json.load(f)
        return data
