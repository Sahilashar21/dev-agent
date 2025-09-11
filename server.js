const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { NodeVM } = require("vm2");

const app = express();
app.use(express.json());
app.use(cors());

// --- MongoDB Setup ---
mongoose
  .connect(
    "mongodb+srv://sahilashar21:LOBqKPV3GcmxNEsJ@cluster0.qbnh7lv.mongodb.net/dev-agent?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// --- User Schema ---
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  solvedCount: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  solvedProblems: { type: [String], default: [] },
});

const User = mongoose.model("User", userSchema);

// --- Problem Schema ---
const problemSchema = new mongoose.Schema({
  id: String,
  topic: String,
  title: String,
  statement: String,
  input: String,
  output: String,
});

const Problem = mongoose.model("Problem", problemSchema);

// ✅ Signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        solvedCount: newUser.solvedCount,
        points: newUser.points,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        solvedCount: user.solvedCount,
        points: user.points,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const leaders = await User.find({}, "name solvedCount points")
      .sort({ solvedCount: -1, points: -1 })
      .limit(20);
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Problems by topic
app.get("/problems/:topic", async (req, res) => {
  try {
    const problems = await Problem.find({ topic: req.params.topic });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Profile
app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email solvedCount points solvedProblems");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Sandbox / Submit Route
app.post("/submit", async (req, res) => {
  const { userId, problemId, code } = req.body;

  try {
    const problem = await Problem.findOne({ id: problemId });
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    // Create a sandbox VM
    const vm = new NodeVM({
      console: 'redirect',
      sandbox: {},
      timeout: 2000, // 2 seconds max
      eval: false,
      wasm: false,
    });

    let userOutput = "";
    let errorOccurred = false;

    // Capture console.log
    vm.on('console.log', (msg) => {
      userOutput += msg + "\n";
    });

    try {
      // Wrap user code in a function that accepts input
      const wrappedCode = `
        const input = \`${problem.input}\`;
        ${code}
      `;

      vm.run(wrappedCode);
      userOutput = userOutput.trim();
    } catch (err) {
      errorOccurred = true;
      userOutput = err.message;
    }

    // Check output
    if (!errorOccurred && userOutput === problem.output.trim()) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      if (!user.solvedProblems.includes(problemId)) {
        user.solvedProblems.push(problemId);
        user.solvedCount += 1;
        user.points += 10;
        await user.save();
      }

      return res.json({
        success: true,
        message: "✅ Correct!",
        output: userOutput,
      });
    } else {
      return res.json({
        success: false,
        message: errorOccurred ? "❌ Runtime Error" : "❌ Incorrect Output",
        expected: problem.output.trim(),
        got: userOutput,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, "0.0.0.0", () => console.log("Server running on port 5000"));
