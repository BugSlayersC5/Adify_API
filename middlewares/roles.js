export const authorizeVendor = (req, res, next) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ message: "Access denied. Vendors only." });
  }
  next();
}