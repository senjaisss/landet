import bcrypt from "bcryptjs";

const run = async () => {
  const password = "";
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hash);
};

run();