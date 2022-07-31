import express from "express";
import config from "config";
const cors = require('cors')
import courseRouter from "./routes/courseRoute";
import contentRouter from "./routes/contentRoute";
import mongoose, { connect } from "mongoose";

// import routes from "./routes";

const app = express();
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(courseRouter)
app.use(contentRouter)

const port = process.env.PORT || config.get<number>("port");
const uri = process.env.MONGODB_URI_PROD || config.get<string>("dbUri");




app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);

    connect(uri).then(res => {

        console.info(`database started on ${port}`);
    }).catch((e) => {
        console.error(`The following error occured ${e} `);
    })
    // routes(app);
})