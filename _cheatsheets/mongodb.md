---
title: Mongodb
author: Haijun (Navy) Su
layout: page
---
## Quick commands
#### Show all databases
```
show dbs
```

#### Create a database
```
use <db name>
```

#### Add a collection
```
db.createCollection("<collection name>")
```

#### Show all collections in a database
```
show collections
show tables
db.getCollectionNames()
```

#### Show all users in a database
```
show users
```

## Enable authenticaication and authorization
* Create the user administrator (ex. userAdmin)
~~~
use admin
db.createUser(
{
   user: "userAdmin",
   pwd: "Your secret password",
   roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
~~~
* Create user for a database (ex. marketing)
~~~
use marketing
db.createUser(
{
   user: "marketingUser",
   pwd: "the secret",
   roles: [ { role: "readWrite", db: "marketing" } ]
})
~~~
* Restart MonogoDB instance with access control
~~~
mongod --auth
~~~
* Update docker-compose file to enable Mondodb auth in docker
~~~
mongodb:
  image: mongo:3
  container_name: mongodb-marketing
  restart: always
  command: mongod --auth
~~~
* Connect and authorization as the user administrator
~~~
mongo --port 27017 -u "userAdmin" -p "your secret" --authenticationDatabase "admin"
#: next command will ask for user password from console
mongo --port 27017 -u "userAdmin" --authenticationDatabase "admin"
~~~
* Connect and authorization as the database user
~~~
mongo --port 27017 -u "marketingUser" -p "your secret" --authenticationDatabase "marketing"
#: next command will ask for user password from console
mongo --port 27017 -u "marketingUser" --authenticationDatabase "marketing"
~~~

## User Management
* View a User's Role
~~~
use reporting
db.getUser("reportsUser")
~~~
* View a Roles Privileges
~~~
use products
db.getRole( "read", { showPrivileges: true } )
~~~
* Grant a role
~~~
use reporting
db.grantRolesToUser(
    "reportsUser",
    [
      { role: "read", db: "accounts" }
    ]
)
~~~
* Revoke a role
~~~
use reporting
db.revokeRolesFromUser(
    "reportsUser",
    [
      { role: "readWrite", db: "accounts" }
    ]
)
~~~
* Modify the Password for an Existing User
~~~
db.changeUserPassword("reporting", "SOh3TbYhxuLiW8ypJPxmt1oOfL")
~~~
* Change own password and custome data
    * Create a role
    ~~~
use admin
db.createRole(
   { role: "changeOwnPasswordCustomDataRole",
     privileges: [
        {
          resource: { db: "", collection: ""},
          actions: [ "changeOwnPassword", "changeOwnCustomData" ]
        }
     ],
     roles: []
   }
)
    ~~~
    * Add a user with this role
    ~~~
use test
db.createUser(
   {
     user:"user123",
     pwd:"12345678",
     roles:[ "readWrite", { role:"changeOwnPasswordCustomDataRole", db:"admin" } ]
   }
)
    ~~~
    * Change you own password and custom data
    ~~~
mongo --port 27017 -u user123 -p '12345678' --authenticationDatabase 'test'
use test
db.updateUser(
   "user123",
   {
      pwd: "KNlZmiaNUp0B",
      customData: { title: "Senior Manager" }
   }
)
    ~~~

## buildin Roles
* Database User Roles: *read, readWrite*
* Database Adminitration Roles: *dbAdmin, dbOwner, userAdmin*
* Roles in *admin* Database
    * Cluster Administration Roles: *clusterAdmin, ClusterManager, clusterMonitor, hostManger*
    * Backup and Restoration Roles: *backup, restore*
    * All Database Roles: *readAnyDatabase, readWriteAnyDatabase, userAdminAnyDatabase, dbAdminAnyDatabase*
    * Superuser Roles: *root*

For roles detail: <https://docs.mongodb.com/manual/core/security-built-in-roles/>

## Backup and Restore
* Backup database (database name is reporting)
```shell
mongodump -u backupUser -p <your secret> --authenticationDatabase admin --gzip --db reporting --archive=<filename>
```
* Restore database

```shell
mongorestore --gzip --archive=/tmp/reporting.mongo.2017-08-31.archive -u restoreUser -p <your secret>

mongorestore --drop --gzip --archive=/tmp/reporting.mongo.2017-08-31.archive -u restoreUser -p <your secret>

mongorestore --drop --gzip --db reporting --collection <collection name> --archive=/tmp/reporting.mongo.2017-08-31.archive -u restoreUser -p <your secret>
```

## Example commands
### Dataabase
~~~
use test # create test database if not exists
db.dropDatabase()
show dbs
~~~
### Collection
~~~
db.createCollection("mycol", { capped : true, autoIndexId : true, size :
   6142800, max : 10000 } )
show collections
db.mycol.drop()
~~~
### Insert document
~~~
db.mycol.insert({
   _id: ObjectId(7df78ad8902c),
   title: 'MongoDB Overview',
   description: 'MongoDB is no sql database',
   by: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
})
~~~
### Insert multiple documents
~~~
db.post.insert([
   {
      title: 'MongoDB Overview',
      description: 'MongoDB is no sql database',
      by: 'tutorials point',
      url: 'http://www.tutorialspoint.com',
      tags: ['mongodb', 'database', 'NoSQL'],
      likes: 100
   },

   {
      title: 'NoSQL Database',
      description: "NoSQL database doesn't have tables",
      by: 'tutorials point',
      url: 'http://www.tutorialspoint.com',
      tags: ['mongodb', 'database', 'NoSQL'],
      likes: 20,
      comments: [
         {
            user:'user1',
            message: 'My first comment',
            dateCreated: new Date(2013,11,10,2,35),
            like: 0
         }
      ]
   }
])
~~~
# Query document
~~~
db.mycol.find().pretty()

db.mycol.find({"by":"tutorials point"}).pretty()
db.mycol.find({"likes":{$lt:50}}).pretty()
db.mycol.find({"likes":{$lte:50}}).pretty()
db.mycol.find({"likes":{$gt:50}}).pretty()
db.mycol.find({"likes":{$gte:50}}).pretty()
db.mycol.find({"likes":{$ne:50}}).pretty()

db.mycol.find(
   {
      $and: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()

db.mycol.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
~~~
### Update docment
~~~
db.COLLECTION_NAME.update(SELECTION_CRITERIA, UPDATED_DATA)

db.mycol.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})
~~~
By default, MongoDB will update only a single document. To update multiple documents, you need to set a parameter 'multi' to true.
~~~
db.mycol.update({'title':'MongoDB Overview'},
   {$set:{'title':'New MongoDB Tutorial'}},{multi:true})
~~~
### Replace a existing document
The save() method replaces the existing document with the new document passed in the save() method.
~~~
db.mycol.save(
   {
      "_id" : ObjectId(5983548781331adf45ec7), "title":"Tutorials Point New Topic",
         "by":"Tutorials Point"
   }
)
~~~~
### Remove document
~~~
db.mycol.remove({'title':'MongoDB Overview'})
db.mycol.remove({'title':'MongoDB Overview'}, 1) # remove only one
db.mycol.remove({}) # remove all
~~~
### Projection
~~~
db.mycol.find({},{"title":1,_id:0}) # 1 - show, 0 - hide
~~~
### Limiting records
~~~
db.mycol.find({},{"title":1,_id:0}).limit(2)
db.mycol.find({},{"title":1,_id:0}).limit(1).skip(1) # only display the 2nd document
~~~
### Sorting records
~~~
db.mycol.find({},{"title":1,_id:0}).sort({"title":-1})
~~~
### Indexing
~~~
db.mycol.ensureIndex({"title":1,"description":-1})
~~~
### Aggregation
~~~
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : 1}}}])
{
   "result" : [
      {
         "_id" : "tutorials point",
         "num_tutorial" : 2
      },
      {
         "_id" : "Neo4j",
         "num_tutorial" : 1
      }
   ],
   "ok" : 1
}

db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])
db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])
db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])
db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])
~~~

### Enable rest api
Add a line in /etc/mongodb.conf
```
rest = true
```
