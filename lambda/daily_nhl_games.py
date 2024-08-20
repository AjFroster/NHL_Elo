import json
import requests

def calculate_elo(periods_played, team_1, team_2):
     # Team 1 will always be the Winner
     # Team 2 will always be the Loser

     with open('view.json','r') as file:
          data = json.load(file)

     elo_1 = data.get(team_1).get('elo')
     elo_2 = data.get(team_2).get('elo')

     K = 32

     R1 = 10 ** (elo_1 // 400)
     R2 = 10 ** (elo_2 // 400)

     E1 = R1 / (R1 + R2)
     E2 = R2 / (R1 + R2)

     if periods_played > 3:
          print("OVERTIME GAME!")
          S1 = 0.8
          S2 = 0.2
     else:
          S1 = 1
          S2 = 0      
     
     new_elo_1 = int(elo_1 + K*(S1-E1))
     new_elo_2 = int(elo_2 + K*(S2-E2))

     data[team_1]['elo'] = new_elo_1
     data[team_2]['elo'] = new_elo_2

     with open('view.json','w') as file:
          json.dump(data, file, indent=4)

     return new_elo_1, new_elo_2

def lambda_handler(month, day):
     
     # daily_nhl_games_response = requests.get("https://api-web.nhle.com/v1/score/now")
     year = 2023
     if month < 10:
          year = 2024
     
     daily_nhl_games_response = requests.get(f"https://api-web.nhle.com/v1/score/{year}-{month}-{day}")


     # daily_nhl_games_response = requests.get("https://api-web.nhle.com/v1/score/2023-11-10")
     if daily_nhl_games_response.status_code == 200: 
          
          data = daily_nhl_games_response.json()
          game_info = data.get('games')
          game_ids = []
          
          for game in game_info:
               game_ids.append(game.get('id'))
          
          for game_id in game_ids:
               box_score_response = requests.get(f"https://api-web.nhle.com/v1/gamecenter/{game_id}/boxscore")
               
               if box_score_response.status_code == 200:
                    
                    boxscore_data = box_score_response.json()
                    periods_played = boxscore_data.get('periodDescriptor').get('number')
                    # print(boxscore_data)

                    # Get Team Names
                    away_team = boxscore_data.get('awayTeam')
                    away_team_name = f"{away_team.get('placeName').get('default')} {away_team.get('name').get('default')}"
                    
                    home_team = boxscore_data.get('homeTeam')
                    home_team_name = f"{home_team.get('placeName').get('default')} {home_team.get('name').get('default')}"

                    if 'é' in away_team_name:
                         away_team_name = away_team_name.replace('é', 'e')
                    
                    if 'é' in home_team_name:
                         home_team_name = home_team_name.replace('é', 'e')

                    # Get Game Score Result
                    game_summary = boxscore_data.get('summary')

                    result = game_summary.get('linescore').get('totals')
                    
                    periods_played
                    # print(f"home: {home_team_name}")
                    # print(f"away: {away_team_name}")
                    # print(f"game: {game_id} == {result}, in: {periods_played} periods")

                    if result.get('home') > result.get('away'):
                         winner = home_team_name
                         loser  = away_team_name
                    else:
                         winner = away_team_name
                         loser  = home_team_name

                    print(f"{winner} beat {loser}\n")

                    res = calculate_elo(periods_played, winner, loser)
                    print(res)
                    # print("\n")
    
          print(f"2023-{month}-{day} = {game_ids}")
     
     return 

def sim_year():
     # month of november test
     months = [10, 11, 12, 1, 2, 3, 4]
     for month in months:
          for day in range(30):
               print(f"--------------Month: {month}------DAY: {day}----------------------")
               lambda_handler(month, day)
               print("\n")

sim_year()