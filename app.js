import express from 'express';
const app = express();
import bodyParser from 'body-parser';

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ info: 'test' })
})

export default app;