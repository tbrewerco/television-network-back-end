import Show from '../models/showModel.js';

const getShows = async (req, res) => {
    const networkId = req?.query?.networkId || null;
    const packageId = req?.query?.packageId || null;
    await Show.getAll(networkId, packageId, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data) res.sendStatus(404);
        else res.json(data);
    });
};

const getSingleShow = async (req, res) => {
    const id = req.params.id;
    await Show.findById(id, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data?.rows?.length) res.sendStatus(404);
        else res.json(data.rows);
    });
};

const createSingleShow = async (req, res) => {
    const title = req.body.title;
    const imdbRating = req.body.imdbRating;
    const networkId = req.body.networkId;
    await Show.create(title, imdbRating, networkId, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data) res.sendStatus(404);
        else res.json(data);
    });
};

const updateSingleShow = async (req, res) => {
    const showId = req.params.id;
    const title = req.body.title;
    const imdbRating = req.body.imdbRating;
    const networkId = req.body.networkId;
    await Show.update(showId, title, imdbRating, networkId, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data) res.sendStatus(404);
        else res.json(data);
    });
};

const deleteSingleShow = async (req, res) => {
    const showId = req.params.id;
    await Show.delete(showId, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (data === 0) res.sendStatus(404);
        else res.sendStatus(200);
    });
};

export { getShows, getSingleShow, createSingleShow, updateSingleShow, deleteSingleShow };