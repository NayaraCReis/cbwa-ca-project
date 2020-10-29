const db = require('../db')();
const COLLECTION = 'users';

module.exports = () => {

    const get = async (email = null) =>{
        if(!email){
        const totalUser = await db.get(COLLECTION);
        return totalUser;
    }
    const uniqueUser = await db.get(COLLECTION, {email});
    return uniqueUser;
    };

    const add = async(name, email, usertype, key) => {
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
            key: key,
        });

        return results.result;
    };

    const getByKey = async (key) => {
    if(!key) {
        console.log('01: missing key')
        return null;
    }
    const users = await db.get(COLLECTION,{key});
    if(users.length !== 1) {
        console.log('02: Bad key')
    }
    return users[0];
    }
  return {
      get,
      add,
      getByKey,

    };
};