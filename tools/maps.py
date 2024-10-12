import pandas as pd
from sqlalchemy import create_engine

# Define the CSV file path and the PostgreSQL connection URL
csv_file_path = 'image.csv'  # Path to your CSV file
database_url = 'postgresql+psycopg2://postgres:KvbKnO42KCnRjbiERsAk@localhost:5432/postgres'

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(csv_file_path)

#Create a database engine using SQLAlchemy
engine = create_engine(database_url)

# Write the DataFrame to the PostgreSQL table
df.to_sql(image, engine, if_exists='replace', index=False)

