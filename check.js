const bcrypt = require("bcryptjs");

const hash = "$2b$10$LyN3KFWladD4wtVZILvCbeoPj1v4nap08vFV6nc9N.3N9gg/EJOQe";

// replace this with the password you want to test
const guess = "1234";

bcrypt.compare(guess, hash).then((isMatch) => {
  if (isMatch) {
    console.log("✅ The guess matches the hash");
  } else {
    console.log("❌ The guess does NOT match");
  }
});
