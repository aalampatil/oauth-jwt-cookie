import "./config/env.js"
import { app } from "./app.js";
import { connectDB } from "./db/db.js";

const port = process.env.PORT;

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.error("\n index.js connectDB on error", error);      
    })
    app.listen(port , () => {
      console.log(`\n server is running on http://localhost:${port}`);
    });
})
.catch(() => {
    console.log("\n catch connectDB error index.js", error);   
})

