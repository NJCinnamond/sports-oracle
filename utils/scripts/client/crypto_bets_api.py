from datetime import datetime
import requests


class CryptoBetsAPIClient:
    def __init__(self, hostname: str):
        self.hostname = hostname

    def createTeam(self, team_id: int, short_name: str, long_name: str, crest_url: str):
        data = {
            "team_id": team_id,
            "short_name": short_name,
            "long_name": long_name,
            "crest_url": crest_url,
        }
        return requests.post(self.hostname + "/teams", json=data)

    def getTeam(self, team_id: int):
        return requests.get(self.hostname + "/teams/" + str(team_id))

    def createFixture(
        self, fixture_id: int, home_team: str, away_team: str, kickoff_time: datetime
    ):
        data = {
            "fixture_id": fixture_id,
            "home_team": home_team,
            "away_team": away_team,
            "kickoff_time": kickoff_time,
        }
        return requests.post(self.hostname + "/fixtures", data=data)

    def getFixture(self, fixture_id: int):
        return requests.get(self.hostname + "/fixtures/" + str(fixture_id))
