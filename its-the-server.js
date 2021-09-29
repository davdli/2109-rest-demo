const express = require("express");
const app = express();

const smashSubRouter = require("./routers/smash-subrouter")


// Start middleware pipeline (HTTP request goes in).
app.use("/", (req, res, next) => {
    req.specialMessage = "Hello :)";
    next();
})

// body parser
// POST and PUT requests, parse the data attached to the request (JSON/urlencoded form)
// that data will be available on req.body in future middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use("/smash", smashSubRouter);
app.use("/characters", smashSubRouter);

app.get("/", (req, res,) => {
    res.send(req.specialMessage);
});

app.get("example-form", (req, res) => {
    res.send(
        `
        <form action="/my-name" method="POST">
            <input type="text" name="thename" />
            <button type="submit">Submit my name</button>
        </form>
        `
    )
})

app.post("/my-name", (req, res) => {
    console.log(req.body);
    res.send("Thanks for your name :)");
})

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Welcmone to the post route :)");
})

// End middleware pipeline.

const PORT = 8080;
app.listen(PORT, () => {
    console.log(
`
This process is now officially listening for HTTP messages!
It is listening for those signals on port ${PORT}. :)
Happy requesting!
`
    );
});
