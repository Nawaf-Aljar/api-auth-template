const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/user")

router.post("/sign-up", async (req, res) => {
    try {
        const { username, password } = req.body;
        // make sure the user does not exist
        const userInDatabase = await User.findOne({ username })

        if (userInDatabase) {
            return res.status(409).json({ err: "Invalid Username or Password" });
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        req.body.password = hashPassword;

        const user = await User.create(req.body)
        const payload = {
            username: user.username,
            _id: user._id,
        }
        const token = jwt.sign({payload}, process.env.JWT_SECRET)

        res.status(201).json({ token })

    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router