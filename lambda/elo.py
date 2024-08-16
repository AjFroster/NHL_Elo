# def calculate_elo(result, elo_1, elo_2):
#     K = 32

#     R1 = 10 ** (elo_1 // 400)
#     R2 = 10 ** (elo_2 // 400)

#     E1 = R1 / (R1 + R2)
#     E2 = R2 / (R1 + R2)

#     if result == "win":
#         S1 = 1
#         S2 = 0
#     elif result == "loss":
#         S1 = 0
#         S2 = 1
#     elif result == "ot_win":
#         S1 = 0.8
#         S2 = 0.2
#     elif result == "ot_loss":
#         S1 = 0.2
#         S2 = 0.8
    
#     new_elo_1 = int(elo_1 + K*(S1-E1))
#     new_elo_2 = int(elo_2 + K*(S2-E2))

#     return new_elo_1, new_elo_2

    
# def lambda_handler(event, context):
    
#         # result = event['result']
#         # elo_1 = event['elo_1']
#         # elo_2 = event['elo_2']
        
#         # new_elo_1, new_elo_2 = calculate_elo(result, elo_1, elo_2)
        
#         # return {
#         #     'new_elo_1': new_elo_1,
#         #     'new_elo_2': new_elo_2
#         # }
        
#     return {
#         'statusCode': 200,  # HTTP status code
#         'body': 'Hello, World!',  # Response body
#         'headers': {
#             'Content-Type': 'application/json'  # Set the content type of the response
#         }
#     } 

def lambda_handler(event, context):
    message = 'Hello {} {}!'.format(event['first_name'], event['last_name'])  
    return { 
        'message' : message
    }
  

# if __name__ == "__main__":
#     event = {
#         "result": "win",
#         "elo_1": 2100,
#         "elo_2": 2000
#     }
#     print(lambda_handler(event, None))
    
# if __name__ == "__main__":
#     possible_results = ["win", "loss", "ot_win", "ot_loss"]
#     player1, player2 = 2100, 2000
#     for res in possible_results:
        
#         player1, player2 = calculate_elo(res, player1, player2)
#         print(f"{res}: player1 = {player1}, player2 = {player2}")




