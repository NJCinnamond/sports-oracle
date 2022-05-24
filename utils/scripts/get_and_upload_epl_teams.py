from client.crypto_bets_api import CryptoBetsAPIClient
from client.sports_api import SportsAPI

crypto_bets_api_host = "http://127.0.0.1:5000/premier-league"


def get_epl_teams():
    api = SportsAPI()
    return api.get_epl_team_data()


def upload_epl_teams(team_data: dict):
    api = CryptoBetsAPIClient(crypto_bets_api_host)

    for team in team_data:
        success = api.createTeam(
            team["team_id"], team["short_name"], team["long_name"], team["crest_url"]
        )
        print("Success creating team id ${team['id']}: ${success}")


def main():
    team_data = get_epl_teams()
    print(team_data)
    upload_epl_teams(team_data)


if __name__ == "__main__":
    main()
