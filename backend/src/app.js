import express from "express";
import cors from "cors"
import session from "express-session";
import passport from "./config/passport.js"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({extended: true, limit: "32kb"}))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    res.send("working and basic setup done")
})

//routes declaration
import { authRouter } from "./routes/auth.routes.js";
app.use("/auth", authRouter)

export {app}