exports.IsAdmin = async (req, res, next) => {
    if (req.oprator.level === "admin") {
      next();
    }
    return res.status(401).send("Forbidden! You are Not Admin");   
}
exports.IsOwner = async (req, res, next) => {
  if (req.oprator.level === "owner") {
    next();
  }
  return res.status(401).send("Forbidden! You are Not Owner");   
}
exports.IsKasir = async (req, res, next) => {
  if (req.oprator.level === "kasir") {
    next();
  }
  return res.status(401).send("Forbidden! You are Not Kasir");   
}