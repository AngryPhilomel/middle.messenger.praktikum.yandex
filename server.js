import express from "express";
import * as path from "path";

const app = express();
const PORT = 3000;
const __dirname = path.resolve(path.dirname(""));
app.use(express.static("./dist"));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${PORT}!`);
});
