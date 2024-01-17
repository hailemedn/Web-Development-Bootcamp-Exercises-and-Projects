const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const insertDocuments = (db, callback) => {
    const collection = db.collection('frutisDB');
    collection.insertMany([
        {
          name: "Apple",
          score: 8,
          review: "Great fruit"
        },
        {
          name: "Orange",
          score: 6,
          review: "Kinda sour"
        },
        {
          item: 'mousepad',
          qty: 25,
          tags: ['gel', 'blue'],
          size: { h: 19, w: 22.85, uom: 'cm' }
        }])
}
