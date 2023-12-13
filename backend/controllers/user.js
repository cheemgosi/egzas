const AccountModel = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");

// Browser fingerprint utility functions
const checkFingerprints = (fp1, fp2) =>
    [...fp1].filter((char, index) => char === fp2[index]).length / Math.min(fp1.length, fp2.length) >= 0.8
        ? true
        : false;

const generateFingerprint = (req) => {
    const { headers, connection, ip } = req;
    const { 'user-agent': userAgent = '', 'accept-language': acceptHeaders = '', 'x-forwarded-for': xForwardedFor = '', 'accept-encoding': encoding = '', dnt: doNotTrack = '', platform = '' } = headers;

    const fingerprint = `${userAgent}${acceptHeaders}${xForwardedFor}${encoding}${connection}${doNotTrack}${platform}${ip}`;
    return crypto.createHash('sha256').update(fingerprint).digest('hex');
};

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await AccountModel.findOne({ email: email.trim() });

        const errors = {
            email: !email ? "Enter valid email" : "",
            username: !username ? "Enter valid username" : "",
            password: !password || password.length < 8 ? "Password should be a minimum of 8 characters" : "",
            existingUser: existingUser ? "An account with this email already exists" : "",
        };

        const errorMessage = Object.values(errors).find((err) => err);
        if (errorMessage)
            return res.status(existingUser ? 409 : 400).json({ errorMessage });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new AccountModel({ email, username, password: hashedPassword });
        await newUser.save();

        const token = JWT.sign({ user: newUser._id, username: newUser.username }, process.env.Secret);
        res.cookie("token", token, { httpOnly: true }).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Failed to register, try again later" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const browserFingerprint = generateFingerprint(req);
        const user = await AccountModel.findOne({ email });

        const errors = {
            email: !email ? "Enter valid email" : "",
            password: !password ? "Enter valid password" : "",
            user: !user ? "Incorrect authentication values, please try a different password or email." : "",
        };

        const errorMessage = Object.values(errors).find((err) => err);
        if (errorMessage)
            return res.status(!user ? 401 : 400).json({ errorMessage });

        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Incorrect authentication values, please try a different password or email." });

        const token = JWT.sign({ user: user._id, username: user.username }, process.env.Secret);

        const session = {
            jwtToken: token,
            ipAddress: req.ip,
            browserFingerprint
        };

        user.sessions.push(session);
        await user.save();

        res.cookie("token", token, { httpOnly: true }).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Failed to login, try again later." });
    }
};

exports.info = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ errorMessage: "Not logged in" });

        const decoded = JWT.verify(token, process.env.Secret);
        if (!decoded) return res.status(401).json({ errorMessage: "Invalid or expired token" });

        const user = await AccountModel.findById(decoded.user);
        if (!user) return res.status(404).json({ errorMessage: "User not found" });

        const { ipAddress, browserFingerprint } = user.sessions.slice(-1)[0];
        const match = req.ip === ipAddress && checkFingerprints(generateFingerprint(req), browserFingerprint);

        return res.status(match ? 200 : 403).json(match ? decoded : { errorMessage: "IP or fingerprint does not match" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Failed to fetch user information" });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await SessionModel.findOneAndDelete({ jwtToken: token });

        res.clearCookie("token", { httpOnly: true }).send({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error occurred during logout" });
    }
};