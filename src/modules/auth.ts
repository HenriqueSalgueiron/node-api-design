import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

//In sign-in, check if the password passed by the user = hashed password in the db.
export const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token; 
};

//middleware that will check the client's authorization
export const protect = (req, res, next) => { 
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not valid token (bearer)" });
  }

  // Verify the jwt
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } 
    // If the jwt doesn't verify, the server breaks. So, we do a catch.
    catch (e) {
      console.error(e);
      res.status(401);
      res.json({ message: "invalid token" });
      return;
    }
};
 
