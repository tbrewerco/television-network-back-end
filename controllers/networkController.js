import Network from '../models/networkModel.js';

const getNetworks = async (req, res) => {
    await Network.getAll(req, (err, data) => {
        err && res.sendStatus(500);
        res.json(data.rows);
    });
};

const getSingleNetwork = async (req, res) => {
    const id = req.params.id;
    const network = await Network.findById(id)
        .then((row) => {
            if (row) {
                res.json(row);
            } else {
                res.sendStatus(404);
            };
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
};

const createSingleNetwork = async (req, res) => {
    const network = req.body;
    Network.create(network)
        .then((row) => {
            res.status(201).json(row);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
};

const updateSingleNetwork = async (req, res) => {
    const id = req.params.id;
    const network = req.body;
    Network.update(id, network)
        .then((row) => {
            if (row) {
                res.json(row);
            } else {
                res.sendStatus(404);
            };
        });
};

const deleteSingleNetwork = async (req, res) => {
    const id = req.params.id;
    Network.delete(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
};

export { getNetworks, getSingleNetwork, createSingleNetwork, updateSingleNetwork, deleteSingleNetwork };
