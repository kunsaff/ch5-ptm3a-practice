import express from "express";
import router from "./router.js";
import morgan from "morgan";

const app = express();

//setting view engine, pastikan udah instal ejs di IDE
app.set('view engine','ejs');

//application middleware
app.use((req, res, next) => {
    const angka = req.query.angka;
    console.log(angka);
    console.log('Time:', Date.now());
    
    if (angka != 10) {
        next ();
        return;
    }
    //http://localhost:3300/auth/login?angka=10
    //http://localhost:3300/auth/login?angka=10&&email=qwe@mail.com
    res.status(400).send("Permintaan Salah");
});

//built in middleware
//http://localhost:3300/
//http://localhost:3300/?angka=1
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post("/", (req, res) => {
    res.send("Hello World ini Post");
});

//http://localhost:3300/withParam/9999
app.get("/withParam/:id", (req, res) => {
    res.send(req.params.id);
});

//route middleware
app.use('/auth',router);

//third party middleware
app.use(morgan("dev"));

app.get("/err", (req, res) => {
    iniErr;
});

app.post("/testBody", (req, res) => {
    res.json(req.body);
    //axios / fetch
});

//http://localhost:3300/html/Lee%20Hi
//ini panggil EJS
app.get("/html/:nama", (req, res) => {
    res.render("index", {
        nama: req.params.nama
    });
});

//http://localhost:3300/kl
app.get("*", (req, res) => {
    res.status(404).json({
        status: "Not Found",
    });
});

//http://localhost:3300/err
//error handling middleware
app.use((err, req, res, next) => {
        //console.error(err);
        res.status(500).json({
            status: "Internal Server Error",
        });
    });

app.listen(3300);
