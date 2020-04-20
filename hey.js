const { Parser } = require('json2csv');

let myCars = {
    "car":
    {
        name: "Audi",
        price: "40000",
        color: "blue"
    }
};

let fields = ["car.name", "car.price", "car.color"];

const parser = new Parser({
    fields,
    // unwind: ["car.name", "car.price", "car.color"]
});

const csv = parser.parse(myCars);

console.log('output',csv);