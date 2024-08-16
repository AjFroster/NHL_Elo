import json
import boto3

def lambda_handler(event, context):
     # Create an S3 client
     s3 = boto3.client('s3')

     try:
          # Get the nhl_teams from S3
          response1 = s3.get_object(Bucket='nhl-info', Key='nhl_teams.json')
          json_file_content = response1['Body'].read().decode('utf-8')
          nhl_teams = json.loads(json_file_content)


          # Get the matchups from S3
          response2 = s3.get_object(Bucket='nhl-info', Key='matchups.json')
          json_file_content2 = response2['Body'].read().decode('utf-8')
          matchups = json.loads(json_file_content2)

     except Exception as e:
          return {
                    'statusCode': 400,
                    'body':json.dumps(f"Failed loading S3 information: {e}")
               }

     # Continue processing the data as needed
     return {
          'statusCode': 200,
          'headers':{
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Headers": "Content-Type",
               "Access-Control-Allow-Methods": "GET"
          },
          'body': json.dumps([nhl_teams, matchups])
     }

    
print(lambda_handler(None, None))