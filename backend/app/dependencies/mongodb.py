from pymongo import MongoClient
from pymongo.collection import Collection

class MongoDB:
    def __init__(self):
        self.client = MongoClient("mongodb+srv://mongo:mongo@cluster0.0qmac.mongodb.net/")  # Update with your MongoDB URI
        self.db = self.client["patient-report"]  # Replace with your MongoDB database name

    def get_collection(self, name: str) -> Collection:
        return self.db[name]


mongodb = MongoDB()