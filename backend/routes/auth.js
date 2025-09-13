// Admin Login
router.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "Sunday" && password === "Prince") {
    const token = jwt.sign({ isAdmin: true }, "secretkey", { expiresIn: "2h" });
    return res.json({ token, admin: true });
  } else {
    return res.status(401).json({ error: "Invalid Admin Credentials" });
  }
});
