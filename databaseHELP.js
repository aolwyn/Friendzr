import db from './database.js'; // Import the database.

//Random User
let user = {
    uid: 'UID',
    email: 'email',
    video_uri: 'video_uri',
    photo_uri: 'photo_uri',
    bio: 'bio',
    is_online: true
}

//insert user
db('users').insert(user).returning('*').into('users').then(function(data) {
    console.log(data);
    res.send(data);
});

//delete user
db('users').where('uid', '=', user.uid).del().then(function(data) {
    if(data == 0) {
        res.send("User deleted");
    } else {
        res.send("User not deleted");
    }
});

//appends user
db('users').where({uid: user.uid}).update({
    email: 'email',
    video_uri: 'video_uri',
    photo_uri: 'photo_uri',
    bio: 'bio',
    is_online: true
}).returning('*').then(function(data) {
    res.send(data);
});

//get user by uid
db.select().from('users').where({uid: user.uid}).then(function(data) {
    res.send(data)
});



