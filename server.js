var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    mongo = require('mongodb').MongoClient,
    objectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser');
/*
mongo.connect('mongodb://localhost:27017/classting', function(error, db) {
    if (error) {
        console.log(error);
    } else {
        var dbo = db.db("mydb");

        dbo.createCollection("customers", function(err, res) {
            if (err) throw err;
            console.log("Collection created!");
            // 1. 입력할 document 생성
            var michael = {
                name: 'Michael3',
                age: 17,
                gender: 'M'
            };
            // 2. customers 컬렉션의 insert( ) 함수에 입력
            // dbo.collection('customers').insert(michael);
            // 3. insertMany( ) 함수에 배열 형태로 입력
            // db.collection('customers').insertMany([jordan,amanda,jessica,james,catherine]);
            var cursor = dbo.collection('customers').find({
            }).toArray(function(err, result){
                console.log(result);
            });

            db.close();
        });

        // db.close();
    }
});
*/

function StartDB(collectionName, sucFn, errFn){
    mongo.connect('mongodb://localhost:27017/classting', function(error, db) {
        if (error) {
            console.log(error);
            errFn();
            try {db.close();} catch (e) {}
        } else {
            var dbo = db.db("db");
            dbo.createCollection(collectionName, function(err, res) {
                if(err) throw err;

                sucFn(dbo.collection(collectionName), db);
            });
        }
    });
}


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))


app.get('/test', function(req, res) {
    console.log('test');
    // res.send('테스트!');
    res.sendFile('index.html', {
        root: path.join(__dirname, 'public')
    });

});

app.get('/classting', function(req, res) {

    res.sendFile('index.html', {
        root: path.join(__dirname, 'public')
    });

});


app.get('/api/activate', function(req, res) {
    var query = req.query;

    console.log('Activate 시도');
    console.log(query);

    if(query.id && query.pw){

        StartDB('user', function(collection, db){

            collection.find({id : query.id}).toArray(function(err, result){

                if(err){
                    res.status(400).end();
                }else if(result.length > 0){
                    if(result[0].pw === query.pw){
                        console.log('일치');
                        res.status(202).end();
                    }else{
                        console.log('불일치');
                        res.status(203).end();
                    }
                }else{
                    query.voteList = {};
                    collection.insertOne(query);
                    res.status(201).end();
                }

                db.close();

            });

        }, function(){
            res.status(400).end();
        });

    }else{
        res.status(400).end();
    }

});


app.post('/api/createVote', function(req, res) {
    console.log('투표지 저장');
    var query = JSON.parse(req.body.result);

    CheckIDPW(query.id, query.pw, function(){

        StartDB('vote', function(collection, db){
            delete query.pw;
            collection.insertOne(query);
            res.status(202).end();
            db.close();

        }, function(){
            res.status(400).end();
        })

    }, function(){
        res.status(400).end();
    });


});


app.get('/api/getVoteList', function(req, res) {

    StartDB('vote', function(collection, db){
        collection.find({}).toArray(function(err, result){
            if(err){
                res.status(400).end();
            }else{
                console.log(result);
                res.send(result).status(200).end();
            }
            db.close();
        });
    }, function(){
        res.status(400).end();
    })


});

app.get('/api/getMyVote', function(req, res) {

    var query = req.query;

    StartDB('vote', function(collection, db){
        collection.find({
            id : query.id
        }).toArray(function(err, result){
            if(err){
                res.status(400).end();
            }else{
                console.log(result);
                res.send(result).status(200).end();
            }
            db.close();
        });
    }, function(){
        res.status(400).end();
    })


});

app.get('/api/deleteVote', function(req, res) {

    var query = req.query;

    StartDB('vote', function(collection, db){

        collection.deleteOne({
            '_id' : objectId(query['_id'])
        }, function(err, result){
            if(err){
                res.status(400).end();
            }else{
                res.status(200).end();
            }
            db.close();
        });
    }, function(){
        res.status(400).end();
    })


});

app.post('/api/updateVote', function(req, res) {

    var query = JSON.parse(req.body.result);


    CheckIDPW(query.id, query.pw, function(){

        StartDB('vote', function(collection, db){
            // console.log(query);
            query['_id'] = objectId(query['_id']);
            delete query.pw;
            // delete query['_id'];

            collection.updateOne({
                '_id' : query['_id']
            }, {
                $set : query
            }, function(err){
                if(err){
                    console.log(err);
                    res.status(400).end();
                }else{
                    console.log('수정완료');
                    res.status(200).end();
                }
                db.close();
            });

        }, function(){
            res.status(400).end();
        })

    }, function(){
        res.status(400).end();
    });

});

// 투표하기
app.get('/api/vote', function(req, res){

    var query = req.query;

    StartDB('vote', function(collection, db){

        collection.updateOne({
            '_id' : objectId(query.voteId)
        }, {
            $inc : {
                ['vote.'+query.voteIndex+'.value']: 1
            }
        }, function(err){
            if(err){
                console.log('212');
                console.log(err);
                res.status(400).end();
            }else{
                console.log('수정완료1');

                StartDB('user', function(collection, db){

                    collection.updateOne({
                        'id' : query.id
                    }, {
                        $set : {
                            ['voteList.'+query.voteId] : true
                        }
                    }, function(err){
                        if(err){
                            console.log('213');
                            console.log(err);
                            res.status(400).end();
                        }else{
                            console.log('수정완료2');
                            res.status(200).end();
                        }
                        db.close();
                    });
                }, function(){
                    res.status(400).end();
                })

            }
            db.close();
        });
    }, function(){
        res.status(400).end();
    })

})

app.post('/api/checkVote', function(req, res) {

    var query = JSON.parse(req.body.result);

    StartDB('user', function(collection, db){

        collection.find({id:query.userId}).toArray(function(err, result){

            if(err){
                console.log('err2');
                res.status(400).end();
            }else if(result.length > 0){

                var voteList = result[0].voteList,
                isVote = voteList[query['_id']];

                StartDB('vote', function(collection, db){
                    collection.find({
                        '_id' : objectId(query['_id'])
                    }).toArray(function(err, result){

                        res.status(isVote ? 200 : 201).send(result).end();

                        db.close();
                    });
                }, function(){
                    res.status(400).end();
                });

            }else{
                console.log('err3');
                res.status(400).end();
            }

            db.close();
        });

    }, function(){
        console.log('err1');
        res.status(400).end();
    })


});


app.get('/api/master/vote/drop', function(req, res){
    StartDB('vote', function(collection, db){
        collection.drop(function(){
            db.close();
            res.status(200).end();
        });
    }, function(){
        res.status(400).end();
    })
});

app.get('/api/master/user/drop', function(req, res){
    StartDB('user', function(collection, db){
        collection.drop(function(){
            db.close();
            res.status(200).end();
        });
    }, function(){
        res.status(400).end();
    })
});

app.get('/api/master/all/drop', function(req, res){
    StartDB('vote', function(collection, db){
        collection.drop(function(){
            db.close();
            res.status(200).end();
        });
    }, function(){
        res.status(400).end();
    })
    StartDB('user', function(collection, db){
        collection.drop(function(){
            db.close();
            res.status(200).end();
        });
    }, function(){
        res.status(400).end();
    })
});

// StartDB('vote', function(collection, db){
//     collection.drop(function(){
//         db.close();
//     });
// }, function(){
//     res.status(400).end();
// })


// 올바른 유저 체크
function CheckIDPW(id, pw, suc, err){

    StartDB('user', function(collection, db){

        collection.find({
            id : id, pw : pw
        }).toArray(function(err, result){

            if(err){
                err();
            }else if(result.length > 0){
                suc();
            }

            db.close();

        });

    }, function(){
        err();
    });

}


app.listen(9091, function() {
    console.log('Example app listening on port 9091!');
});
