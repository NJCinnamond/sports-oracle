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

    # TODO: Change ko_time to parse kickoff day, month, yr, hour, min, sec to datetime
    def createFixture(
        self, home_team_id: int, away_team_id: int, season: str, ko_time: str
    ):
        data = {
            "home_team_id": home_team_id,
            "away_team_id": away_team_id,
            "season": season,
            "ko_time": ko_time,
        }
        return requests.post(self.hostname + "/fixtures", json=data)

    def getFixture(self, fixture_id: int):
        return requests.get(self.hostname + "/fixtures/" + str(fixture_id))
