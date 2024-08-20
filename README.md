Components and Workflow

    AWS Lambda:
        Purpose: To run a scheduled task that fetches NHL game results.
        Trigger: Use Amazon CloudWatch Events to trigger the Lambda function once a day.
        Code: The Lambda function will fetch the data from the NHL API, process it, and update the database.

    Database:
        Purpose: To store NHL game results and possibly ELO ratings.
        Options: You can use Amazon RDS (for relational databases like MySQL or PostgreSQL) or Amazon DynamoDB (for a NoSQL database).
        Access: The Lambda function will write to this database, and the React frontend will read from it.

    React Frontend:
        Purpose: To display the NHL game results and ELO ratings.
        Hosting: You can host the frontend on AWS Amplify, Amazon S3 with CloudFront, or any other web hosting service.
        API: The React app will make API calls to the backend to fetch the latest data.
