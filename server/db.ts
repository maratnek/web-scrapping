// connect to db and use models
import mongoose from 'mongoose';
import { Good } from './model/good.js';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });

// Warning use env for it
const dbUser = 'zm-first';
const dbPassword = process.env.PASSWORD;
const dbName = 'firstCluster';

const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@firstcluster.kd6iy.mongodb.net/${dbName}?retryWrites=true&w=majority`;
console.log('Password ', dbPassword, dbURI);

let showAllGoods = () => {
    Good.find({})
        .then((result:any) => {
            console.log(result)
        }).catch((err:any) => { console.log(err); });
}

// let insertData = () => {
//     const good = new Good({ index: 777, name: "beatyfull" })
//     good.save()
//         .then((result) => {
//             console.log(result);
//         })
//         .catch((err) => console.log(err));

// }

let delByName = (_name: string) => {
    Good.deleteMany({ name: _name })
        .then((result:any) => {
            console.log("DELETED", result);
        })
        .catch((err:any) => console.log(err));
}
// let createOrUpdate = (body) => {
//     Good.findOneAndUpdate({ name: body.name }, { index: body.index }, { upsert: true }, (err, res) => {
//         // if (!err) {
//         //     if (!res) {
//         //         console.log("create document")
//         //         res = new Good(body);
//         //     }
//         //     res.save((err) => {
//         //         if (!err) {
//         //             console.log("saving")
//         //         } else {
//         //             throw err;
//         //         }
//         //     })
//         // }
//     })
// }

let addGood = (prepared_good: any) => {
    console.log('Prepared good', prepared_good);
        Good.findOne({ name: prepared_good[1].name }).then((good : any) => {
            if (!good)
                throw good;
            console.log("Find: ", good);
            if (good.order_date === undefined) {
                let child = { order: prepared_good[1].order, stars: prepared_good[1].stars, req_count: 0 };
                good.order_date = [child];
            } else {
                let last_child = good.order_date[good.order_date.length - 1];
                let child2 = { 
                    order: prepared_good[1].order, 
                    stars: prepared_good[1].stars, 
                    price: prepared_good[1].price,
                    old_price: prepared_good[1].old_price,
                    req_count: good.order_date.length 
                };
                // let date = good.children[0].date;
                // console.log("time: ", date.getHours(), date.getMinutes(), date.getSeconds());
                if (last_child.order < child2.order) {
                    good.order_date.push(child2);
                }
            }
            console.log("Prepared: ", good);
            Good.findOneAndUpdate({ name: good.name },
                good, { upsert: true }, (err, res) => {
                    if (err) { console.log("Error findOneAndUpdate",err); }
                    if (res) { console.log("Success findOneAndUpdate",res); }
                });
        }).catch((err:any) => {
            // console.log(err);
            let child = { 
                order: prepared_good[1].order, 
                stars: prepared_good[1].stars, 
                price: prepared_good[1].price, 
                old_price: prepared_good[1].old_price, 
                req_count: 0 
            };
            let good = new Good({
                stock_id: prepared_good[1].stock_id,
                name: prepared_good[1].name,
                title: prepared_good[1].title,
                order_date: [child],
            });
            // if (prepared_good[1].order_date !== undefined) {
            // }
            console.log("Try to save", good, prepared_good[1]);
            // Good.findOneAndUpdate({ name: good.name },
            //     good, { upsert: true }, (err, res) => {
            //         if (err) { console.log("Error findOneAndUpdate",err); }
            //         if (res) { console.log("Success findOneAndUpdate",res); }
            //     });
            good.save()
                .then((result:any) => {
                    console.log(result);
                })
                .catch((err:any) => console.log("saving:  ", err));
        });
}

// connect to mongodb
let connect = async (callback:Function) => {
    let res = await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    if (!res) { 
        return;
    }
    console.log('Connect to DB!');
    callback();
};

export {addGood, connect};
    // .then((result) => {

    //     // delByName('beatyfull');
    //     showAllGoods();

    // })
    // .catch((err) => console.log(err));

