---
title: Using PyMongo to Access MongoDB
author: Haijun (Navy) Su
layout: post
tags: [mongodb, mongo, python, pymongo]
---
### Install pymongo
```bash
pip install pymongo
```

### Connect to MongoDB
User name and password must be percent-escaped with urllib.parse.quote_plus() if they are from insternet.
```python
from pymongo import MongoClient
from urllib.parse
username = urllib.parse.quote_plus('user')
password = urllib.parse.quote_plus('pass/word') # 'pass%2Fword'
MongoClient('mongodb://%s:%s@127.0,0,1' % (username, password))
```

#### Mongodb URI example
```python
from pymongo import MongoClient
uri = "mongodb://user:password@example.com/the_database?authMechanism=SCRAM-SHA-1"
MongoClient(uri)
```

#### MongoClient Arguments example
```python
from pymongo import MongoClient
client = MongoClient(host='example.com',
                    username='user',
                    password='password',
                    authSource='the_database',
                    authMechanism='SCRAM-SHA-1')
db = client['database name']
```

#### Create you own MongoDB class
* ini file (mongodb.ini)
```ini
[mongodb]
DATABASE: userdb
USER: dbuser
PASSWORD: dbpassword
HOST: db.sample.com
PORT: 27017
AUTHSOURCE: userdb
```
* MongoDB class
    ```python
    import configparser
    from pymongo import MongoClient

    class MongoDB:
        """
        Connect to MongoDB. It opens connection and closes the connection when it is destroyed.
        """
        def __init__(self):
            self.config=configparser.ConfigParser()
            self.config.read_file(open('<your mongodb properties file name here>'))
            self.cnx = None

        def __enter__(self):
            print("enter")
            if self.cnx is not None:
                raise RuntimeError('Aready connected')
            self.cnx = MongoClient(host=self.config["mongodb"]["HOST"],
                        username=self.config["mongodb"]["USER"],
                        password=self.config["mongodb"]["PASSWORD"],
                        port=int(self.config["mongodb"]["PORT"]),
                        authSource=self.config["mongodb"]["AUTHSOURCE"] )
            return self.cnx[self.config["mongodb"]["DATABASE"]]

        def __exit__(self, exe_ty, exc_val, tb):
            self.cnx.close()
            self.cnx = None
    ```

#### Using MongoDB class
* Query and command
```python
mongo = MongoDB()
with mongo as db:
    result = db.campuses.find()
    for row in result:
        print(row)
    print(db.accounts.find({"firstName":"John"}).count())
    print(db.command("buildinfo"))
    print(db.command("usersInfo", "<username>"))
```
* bulk_write - Send a batch of write operations to the server.
Requests are passed as a list of write operation instances ( InsertOne, UpdateOne, UpdateMany, ReplaceOne, DeleteOne, or DeleteMany).

```python
from pymongo import InsertOne, DeleteOne, ReplaceOne

mongo = MongoDB()
with mongo as db:
    requests = [InsertOne({'y': 1}), DeleteOne({'x': 1}),
             ReplaceOne({'w': 1}, {'z': 1}, upsert=True)]
    result = db.test.bulk_write(requests)
    print("Inerted: %s, Deleted: %s, Modified: %s, Upserted_ids: %s" %
        (result.inserted_count, result.deleted_count, result.modified_count, result.upserted_ids))
```
* insert_one - insert a single document
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.insert_one({'x': 1})
    print(result.inserted_id)
```
* insert_many - insert an iterable of documents
```python
mongo = MongoDB()
with mongo as db:
   result = db.test.insert_many([{'x': i} for i in range(2)])
   print(result.inserted_ids)
```
* replace_one - replace a single document matching filter
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.replace_one({'x': 1}, {'y': 1})
    print("%s, %s" % (result.matched_account, result.modified_count))
```
The following operation will install a new document if a matching document does not exist.
```python
result = db.test.replace_one({'x': 1}, {'x': 1}, True)
```
* update_one - update a single document matching the filter
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.update_one({'x': 1}, {'$inc': {'x': 3}})
    print("%s, %s" % (result.matched_account, result.modified_count))
```
* update_many - update one or many documents that match the filter
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.update_many({'x': 1}, {'$inc': {'x': 3}})
    print("%s, %s" % (result.matched_account, result.modified_count))
```
* delete_one and delete_many
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.delete_one({'x': 1})
    print(result.deleted_count)
    result = db.test.delete_many({'x': 1})
    print(result.deleted_count)
```
* find_one - find a single document from database
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.find_one({'x': 1})
    print(result)
```
* find_one_and_delete
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.find_one_and_delete({'x': 1}, projection={'_id': False})
    print(result)
```
* find_one_and_update and find_one_and_replace
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.find_one_and_replace({'x': 1}, {'y': 1})
    print(result)
    result = db.test.find_one_and_update(
                {'_id': 'userid'},
                {'$inc': {'seq': 1}},
                {'$set': {'done': True}},
                projection={'seq': True, '_id': False},
                upsert=True,
                return_document=ReturnDocument.AFTER)
    print(result)
```
* Sorting
```python
mongo = MongoDB()
with mongo as db:
    result = db.test.find().sort({"serialNumber":1})
    for row in result:
        print(row)
    # sort multiple attributes
    result = db.test.find().sort((("serialNumber"),1,("Name",1)))
    for row in result:
        print(row)
```
* Find by ObjectId
```python
from bson.objectid import ObjectId
mongo = MongoDB()
with mongo as db:
    result = db.test.find_one("_id": ObjectId("59a86292134a7100144992c1"))
    print(result)
```

**Reference:**
[Collection level operations](http://api.mongodb.com/python/current/api/pymongo/collection.html)
[Database level operations](http://api.mongodb.com/python/current/api/pymongo/database.html)
[Database Commands](https://docs.mongodb.com/manual/reference/command/)
<https://www.mongodb.com/blog/post/getting-started-with-python-and-mongodb>
<http://api.mongodb.com/python/current/examples/authentication.html>
<http://api.mongodb.com/python/current/api/pymongo/mongo_client.html#pymongo.mongo_client.MongoClient>

