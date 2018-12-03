'use strict';

const md5 = require('md5');
const fs = require('fs');
const multer = require('multer');
const path = require('path');


module.exports = router => {

    router.get('/', (req, res) => {
        res.status(205).json({
            message: "Welcome to Envy Bank"
        });
    });

    router.get('/ppb', (req, res) => {
        res.status(210).json({
            pesan: "test node js"
        })
    });

    router.post("/register", (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        if(!email || !password || !username || !email.trim() || !password.trim() || !username.trim()){
            res.status(400).json({
                status: 400,
                message: "Lengkapi Field Yang Ada"
            })
        }
        else {
            global.connection.query('INSERT INTO ppb (email, username, password) values (?, ?, ?)',
            [username, email, md5(password)],
            (err, rows, field) => {
                if(err){
                    res.status(401).json({
                        status: 401,
                        message: "Email / Username telah terdaftar"
                    });
                }

                else {
                    res.status(200).json({
                        status: 200,
                        message: "Pendaftaran Berhasil."
                    });
                }
            })
        }
    });

    router.post('/login_user', (req, res) => {
        const username = req.body.username;
        const password = md5(req.body.password);

        if(!username || !password || !username.trim() || !password.trim()){
            res.status(450).json({
                status: 450,
                message: "Isikan Username dan Password Anda"
            });
        }
        else {
            global.connection.query('SELECT * FROM ppb WHERE username=? AND password=?',
            [username, password],
            (err, result, field) => {
                            if(err){
                                res.status(404).json({
                                    status: 400,
                                    message: err
                                });
                            } else {
                                res.status(200).json({
                                    status: 200,
                                    message: 'Login Success',
                                    results: result
                                });
                            }
                        });
                    }
                });
    
    // // UPLOAD USER IMAGE
    // const storageUserImage = multer.diskStorage({
    //     destination: path.join('./assets/user/'),
    //     filename: (req, file, cb) => {
    //         cb(null, req.body.username + path.extname(file.originalname));
    //     }
    // });

    // var uploadUserImage = multer ({
    //     storage: storageUserImage
    // }).single('picture_url');

    // REGIST NEW USER
    // router.post('/user', uploadUserImage, (req, res) => {
    //     const username = req.body.username;
    //     const name = req.body.name;
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     const phone = req.body.phone;
    //     const picture_url = req.file;

    //     console.log(username);
    //     console.log(picture_url.path);

    //     if(!username || !email || !password || !name || !phone 
    //         || !username.trim() || !email.trim() || !name.trim() || !password.trim() || !phone.trim()) {
    //             res.status(400).json({
    //                 status: 400,
    //                 message: 'Invalid Register'
    //             });
    //         } 
    //     else {
    //         uploadUserImage(req, res, err => {
    //             global.connection.query('INSERT INTO user (username, name, email, password, phone, picture_url, updated_at) values (?, ?, ?, ?, ?, ?, ?)',
    //             [username, name, email, md5(password), phone, picture_url.path, new Date()],
    //             (err, rows, field) => {
    //                 if(err){
    //                     res.status(401).json({
    //                         status: 401,
    //                         message: "User Already Registered",
    //                         results: {
    //                             email: email,
    //                             username, username
    //                         }
    //                     })
    //                 } else {
    //                     res.status(200).json({
    //                         status: 200,
    //                         message: "User Registered Successfully",
    //                         results: {
    //                             name: name,
    //                             email: email,
    //                             username: username,
    //                             profile_picture: picture_url.path,
    //                             created_at: new Date()
    //                         }
    //                     });
    //                 }
    //             })
    //         }) 
    //     }
    // });
    
    // // LOGIN USER
    // router.post('/authenticate', (req, res) => {
    //     const username = req.body.username;
    //     const password = md5(req.body.password);

    //     console.log(username);
    //     console.log(password);

    //     if(!username || !password || !username.trim() || !password.trim()){
    //         res.status(400).json({
    //             status: 400,
    //             message: 'Invalid Credentials'
    //         });
    //     } else {
    //         global.connection.query('SELECT * FROM user WHERE username=? AND password =?',
    //         [username, password],
            
    //         (err, result, field) => {
    //             if(err){
    //                 res.status(404).json({
    //                     status: 400,
    //                     message: err
    //                 });
    //             } else {
    //                 res.status(200).json({
    //                     status: 200,
    //                     message: 'Login Success',
    //                     results: result
    //                 });
    //             }
    //         });
    //     }
    // });

    // router.get('/user/:userid', (req, res) => {
    //     const userid = req.params.userid;

    //     console.log(userid);

       
    //         global.connection.query(`SELECT * FROM user WHERE userid = ${userid}`,
            
    //         (err, result, field) => {
    //             if(err){
    //                 res.status(404).json({
    //                     status: 400,
    //                     message: err
    //                 });
    //             } else {
    //                 res.status(200).json({
    //                     status: 200,
    //                     message: 'Get Profile',
    //                     results: result
    //                 });
    //             }
    //         });
        
    // });

    // //FETCH USER PROFILE

    // ///////////////////////////////////////////////////// SPACE HERE ////////////////////////////////////////////////////////

    // // UPLOAD BANK IMAGE
    // const storageBankImage = multer.diskStorage({
    //     destination: path.join('./assets/bank/'),
    //     filename: (req, file, cb) => {
    //         cb(null, req.body.bank_name + path.extname(file.originalname));
    //     }
    // });

    // var uploadBankImage = multer ({
    //     storage: storageBankImage
    // }).single('bank_image');

    // // REGIST NEW BANK SAMPAH
    // router.post('/bank', uploadBankImage, (req, res) => {
    //     const bank_name = req.body.bank_name;
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     const description = req.body.description;
    //     const phone = req.body.phone;
    //     const latitude = req.body.latitude;
    //     const longitude = req.body.longitude;
    //     const bank_image = req.file;

    //     if(!bank_name || !email || !password || !description || !phone || !latitude || !longitude
    //         || !bank_name.trim() || !email.trim() || !description.trim() || !password.trim() || !phone.trim() || !latitude.trim() || !longitude.trim()) {
    //             res.status(400).json({
    //                 status: 400,
    //                 message: 'Invalid Register'
    //             });
    //         } 
    //     else {
    //         uploadUserImage(req, res, err => {
    //             global.connection.query('INSERT INTO bank (email, password, bank_name, description, phone, bank_image, latitude, longitude, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //             [email, md5(password), bank_name, description, phone, bank_image.path, latitude, longitude, new Date()],
    //             (err, rows, field) => {
    //                 if(err){
    //                     res.status(401).json({
    //                         status: 401,
    //                         message: "Bank Sampah Already Registered",
    //                         results: {
    //                             email: email,
    //                             bank_name: bank_name
    //                         }
    //                     })
    //                 } else {
    //                     res.status(200).json({
    //                         status: 200,
    //                         message: "Bank Sampah Registered Successfully",
    //                         results: {
    //                             bank_name: bank_name,
    //                             email: email,
    //                             bank_image: bank_image.path,
    //                             description: description,
    //                             phone: phone,
    //                             latitude: latitude,
    //                             longitude: longitude,
    //                             created_at: new Date()
    //                         }
    //                     });
    //                 }
    //             })
    //         }) 
    //     }
    // });

    // // LOGIN BANK
    // router.post('/bank-auth', (req, res) => {
    //     const email = req.body.email;
    //     const password = md5(req.body.password);

    //     if(!email || !password || !email.trim() || !password.trim()){
    //         res.status(400).json({
    //             status: 400,
    //             message: 'Invalid Credentials'
    //         });
    //     } else {
    //         global.connection.query('SELECT * FROM bank WHERE email=? AND password =?',
    //         [email, password],
            
    //         (err, result, field) => {
    //             if(err){
    //                 res.status(404).json({
    //                     status: 400,
    //                     message: err
    //                 });
    //             } else {
    //                 res.status(200).json({
    //                     status: 200,
    //                     message: 'Login Success',
    //                     results: result
    //                 });
    //             }
    //         });
    //     }
    // });

    // ///////////////////////////////////////////////////// SPACE HERE ////////////////////////////////////////////////////////

    // // UPLOAD BANK IMAGE
    // const storageCatalogueImage = multer.diskStorage({
    //     destination: path.join('./assets/catalogue/'),
    //     filename: (req, file, cb) => {
    //         cb(null, req.body.product_name + path.extname(file.originalname));
    //     }
    // });

    // var uploadCatalogueImage = multer ({
    //     storage: storageCatalogueImage
    // }).single('product_image');

    // // ADD ITEM BANK SAMPAH
    // router.post('/bank/item', uploadCatalogueImage, (req, res) => {
    //     const bank_id = req.body.bank_id;
    //     const bank_name = req.body.bank_name;
    //     const product_name = req.body.product_name
    //     const price = req.body.price;
    //     const phone = req.body.phone;
    //     const category = req.body.category;
    //     const stock = req.body.stock;
    //     const description = req.body.description;
    //     const weight = req.body.weight;
    //     const product_image = req.file;

    //     if(!bank_name || !product_name || !price || !description || !phone || !stock 
    //         || !bank_name.trim() || !product_name.trim() || !price.trim() || !description.trim() || !phone.trim() || !stock.trim()) {
    //             res.status(400).json({
    //                 status: 400,
    //                 message: 'Please, fill the requirement field'
    //             });
    //         } 
    //     else {
    //         uploadUserImage(req, res, err => {
    //             global.connection.query('INSERT INTO product_catalogue (bank_id, bank_name, product_name, category, price, phone, stock, description, weight, product_image, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //             [bank_id, bank_name, product_name, category, price, phone, stock, description, weight, product_image.path, new Date()],
    //             (err, rows, field) => {
    //                 if(err){
    //                     res.status(401).json({
    //                         status: 401,
    //                         message: "Invalid Error",
    //                         results: {
    //                             err
    //                         }
    //                     })
    //                 } else {
    //                     res.status(200).json({
    //                         status: 200,
    //                         message: "Item Added to Database",
    //                         results: {
    //                             product_name: product_name,
    //                             bank_name: bank_name,
    //                             product_image: product_image.path,
    //                             description: description,
    //                             phone: phone,
    //                             price: price,
    //                             stock: stock,
    //                             created_at: new Date()
    //                         }
    //                     });
    //                 }
    //             })
    //         }) 
    //     }
    // });

    // router.get("/bank/:id/catalogue", (req, res) => {
    //     var id = req.params.id
    //     global.connection.query(`SELECT * FROM product_catalogue WHERE bank_id = ${id}`,
    //     (err, result, field) => {
    //         if(err){
    //             res.status(404).json({
    //                 status: 404,
    //                 message: err
    //             });
    //         } else {
    //             res.status(220).json({
    //                 status: 220,
    //                 message: 'Data Found',
    //                 results: result
    //             });
    //         }
    //     })
    // });


    // router.get("/bank/catalogue", (req, res) => {
    //     var id = req.params.id
    //     global.connection.query(`SELECT * FROM product_catalogue `,
    //     (err, result, field) => {
    //         if(err){
    //             res.status(404).json({
    //                 status: 404,
    //                 message: err
    //             });
    //         } else {
    //             res.status(220).json({
    //                 status: 220,
    //                 message: 'Data Found',
    //                 results: result
    //             });
    //         }
    //     })
    // });

    // router.get("/bank/catalogue/:category", (req, res) => {
    //     var category = req.params.category

    //     global.connection.query(`SELECT * FROM product_catalogue WHERE category = '${category}'`,
    //     (err, result, field) => {
    //         if(err){
    //             res.status(404).json({
    //                 status: 404,
    //                 message: err
    //             });
    //         } else {
    //             res.status(220).json({
    //                 status: 220,
    //                 message: 'Data Found',
    //                 results: result
    //             });
    //         }
    //     })
    // });

    // router.put('/bank/catalogue/:product_id', (req, res) => {
    //     const product_id = req.params.product_id;

    //     global.connection.query(`UPDATE product_catalogue SET stock WHERE product_id = ${product_id}`, )
    // })

    
}