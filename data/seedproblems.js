const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sahilashar21:LOBqKPV3GcmxNEsJ@cluster0.qbnh7lv.mongodb.net/dev-agent?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const problemSchema = new mongoose.Schema({
  id: String,
  topic: String,
  title: String,
  statement: String,
  input: String,
  output: String,
});

const Problem = mongoose.model("Problem", problemSchema);

const problems = [
  {
    id: "1",
    topic: "DSA",
    title: "Find Maximum Number",
    statement: "Write a function that returns the maximum number in an array.",
    input: "[1, 5, 3, 9, 2]",
    output: "9",
  },
  {
    id: "2",
    topic: "DSA",
    title: "Sum of Array",
    statement: "Write a function that returns the sum of all numbers in an array.",
    input: "[1, 2, 3, 4]",
    output: "10",
  },
];

Problem.insertMany(problems)
  .then(() => {
    console.log("Problems inserted successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
