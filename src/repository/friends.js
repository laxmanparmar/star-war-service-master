const db = require('../db');
const FRIENDS_SCHEMA = 'friends';

const getFriendsTotalCount = (characterId) => {
    return db(FRIENDS_SCHEMA).where({ character_id: characterId })
        .orWhere({ friend_id: characterId })
        .count('* as total').first()
}

const getFriendsById = (characterId, limit) => {
    const query = db(FRIENDS_SCHEMA).where({ character_id: characterId })
        .orWhere({ friend_id: characterId });
    if (limit) {
        query.limit(limit);
    }
    return query;
};

const addFriend = (friendsList) => {
    return db(FRIENDS_SCHEMA).insert(friendsList).returning('*')
}
module.exports = {
    getFriendsTotalCount,
    getFriendsById,
    addFriend
};
