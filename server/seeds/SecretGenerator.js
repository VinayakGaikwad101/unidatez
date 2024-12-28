import crypto from "crypto";

const secretGenerator = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

const secret = secretGenerator(64);

console.log("Secure JWT Secret: ", secret);
