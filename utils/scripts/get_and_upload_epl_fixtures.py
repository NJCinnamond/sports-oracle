from client.crypto_bets_api import CryptoBetsAPIClient
from client.sports_api import SportsAPI

crypto_bets_api_host = "http://127.0.0.1:5000/premier-league"


def get_epl_fixtures():
    api = SportsAPI()
    return api.get_epl_fixtures_data()


def upload_epl_fixtures(fixture_data: dict):
    api = CryptoBetsAPIClient(crypto_bets_api_host)

    for fixture in fixture_data:
        success = api.createFixture(
            fixture["home_team_id"],
            fixture["away_team_id"],
            fixture["season"],
            fixture["ko_time"],
        )
        print("Success creating fixture: ", success)


def main():
    fixture_data = get_epl_fixtures()
    print(fixture_data)
    upload_epl_fixtures(fixture_data)


if __name__ == "__main__":
    main()
