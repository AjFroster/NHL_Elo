import json 

with open('view.json','r') as file:
     data = json.load(file)

for team in data:
     data[team]['elo'] = 1500

with open('view.json', 'w') as file:
     json.dump(data,file, indent=4)

print(data)