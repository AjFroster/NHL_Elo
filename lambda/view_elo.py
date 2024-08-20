import json

with open('view.json','r') as file:
     data = json.load(file)

# Extract teams and their Elo ratings into a list and sort it
sorted_teams = sorted(data.items(), key=lambda x: x[1]['elo'], reverse=True)

# Print the sorted teams and their Elo ratings
for team, info in sorted_teams:
    print(f"{team}: {info['elo']}")