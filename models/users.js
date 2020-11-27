const db = require('../db')();
const COLLECTION = 'users';
const nodemailer = require("nodemailer");
const dropanEmail = process.env.EMAIL;
const dropPassword = process.env.PASSWORD;
const bcrypt = require('bcrypt');

const salt  = 10;

module.exports = () => {
    // getting one and all users

    const get = async (email = null) => {
        try {
            if (!email) {
                const user = await db.get(COLLECTION);
                return { user };
            }
            const user = await db.get(COLLECTION, {
                email: email,
            });
            return { user };
        } catch (err) {
            console.log(err);
            return {
                error: err
            }
        }
    };

    const add = async (name, email, usertype, userKey) => {
        if(!name || !email || !usertype || !userKey) {
            return {
                error: 'fill in all fields',
            };
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: dropanEmail, // generated ethereal user
              pass: dropPassword, // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false,
            }   
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"CBWA PROJECT" <reis.cct@gmail.com>', // sender address
            to: email , // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Welcome", // plain text body
            html: "<b>Welcome to reis's bug tracker</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);


        try {
            const user = await db.get(COLLECTION, { email, });

            if(user.length > 0) {
                return {
                    results: 'user already exist',
                };
            }

            const key = bcrypt.hashSync(userKey, salt);
            const results = await db.add(COLLECTION, {
                name,
                email,
                usertype,
                key,
            });

            return {results};
            } catch (err) {
            console.log(err);
            return {
                error: err
            };
        }
    };

    const getByKey = async (email, supliedkey) => {
        if (!supliedkey || !email) {
            return {
                error: 'Missing key or email',
            };
        }

        try {
            const users = await db.get(COLLECTION, {
                email: email
            });
            const verify = bcrypt.compareSync(supliedkey, users[0].key);

            if (!verify) {
                return {
                    error: 'password error',
                };
            }
            return users[0];
        } catch (e) {
            return {
                error: e.message,
            };
        }
    };
    return {
        get,
        add,
        getByKey,

    };
};