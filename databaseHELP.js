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

//initalize the database
db.sync({ force: true }).then(() => {
    console.log('Database synced');
    db.insert(user).into('users').then(function(data) {
        console.log(data);
    });
});

db.schema.hasTable('users').then(function(exists) {
    if (!exists) {
        db.schema.createTable('users', function(user) {
            user.string('uid');
            user.string('email');
            user.string('first_name');
            user.string('last_name');
            user.string('video_uri');
            user.string('photo_uri');
            user.string('bio');
            user.boolean('is_online');
            user.string('created_at');
            user.string('updated_at');
        }).then(function(table) {
            console.log('Created Table', table);
        });
    }
});

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



