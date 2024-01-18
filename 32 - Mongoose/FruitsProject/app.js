const mongoose = require("mongoose");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

    const fruitSchema = new mongoose.Schema ({
        name: {
            type: String,
            required: 'Please check your data entry, {PATH} is required'
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });

    const Fruit = mongoose.model("Fruit", fruitSchema);

    // const fruit = new Fruit ({
    //     name: "Apple",
    //     rating: 34,
    //     review: "Pretty solid as a fruit."
    // });

    // sends an error because name is required,
    const fruit = new Fruit({
        rating: 10,
        review: "Tenbirr are so yummy!"
    })


    // console.log(fruit.name);
    // await fruit.save();


    const personSchema = new mongoose.Schema ({
        name: String,
        age: Number,
        favouriteFruit: fruitSchema
    })

    const Person = mongoose.model("Person", personSchema)

    const pineapple = new Fruit ({
        name: "Pineapple",
        score: 9,
        review: "Great fruit"
    })

    // await pineapple.save();

    const avocado = new Fruit({
        name: "Avocado",
        score: 8,
        review: "Healthy and sweet!"
    })

    // await avocado.save();

    // await Person.updateOne({name: "John"}, {favouriteFruit: avocado});

    const person = new Person({
        name: "Any",
        age: 12,
        favouriteFruit: pineapple
    })

    // console.log(person.name);
    // await person.save();




    // const kiwi = new Fruit({
    //     name: "Kiwi",
    //     score: 10,
    //     review: "The best fruit!"
    // });

    // const orange = new Fruit({
    //     name: "Orange",
    //     score: 4,
    //     review: "Too sour for me"
    // });

    // const banana = new Fruit({
    //     name: "Banana",
    //     score: 3,
    //     review: "Weird texture"
    // });

    // Fruit.insertMany([kiwi, orange, banana]);
    // console.log(kiwi.name);
    // console.log(orange.name);
    // console.log(banana.name);



    // fruits.forEach((fruit) => {
    //     console.log(fruit.name)
    // })

    // await Fruit.updateOne({_id: "65a85c99c17a52198d74a94f"}, {name: "Peaches"})

    // const deleteOne = await Fruit.deleteOne({_id: '65a85c99c17a52198d74a94f'});
    // console.log(deleteOne);


    // const fruits = await Fruit.find({});
    // console.log(fruits)

    // await Person.deleteMany({name: "John"});

    const people = await Person.find({});
    console.log(people)
    mongoose.connection.close();
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }




