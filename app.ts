import express from "express";
import cors from "cors";
import route from "./routes";

const app = express();

app.use(express.json());

app.use(cors());
app.get("/getData",(req,res)=>{
    res.send("Hello");
});

app.use(route);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});