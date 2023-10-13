export const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500);
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized oi" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input oi" });
  } else {
    res.status(500).json({ message: "ops that's on us oi" });
  }
};
