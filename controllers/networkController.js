import { getAllNetworks, getNetworkById, createNetwork, updateNetwork, deleteNetwork } from '../models/networkModel.js';

const getNetworks = (req, res) => {
    getAllNetworks()
        .then((rows) => {
            res.json(rows);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500); Network
        });
};

const getSingleNetwork = (req, res) => {
    const id = req.params.id;
    getNetworkById(id)
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

const createSingleNetwork = (req, res) => {
    const network = req.body;
    createNetwork(network)
        .then((row) => {
            res.status(201).json(row);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
};

const updateSingleNetwork = (req, res) => {
    const id = req.params.id;
    const network = req.body;
    updateNetwork(id, network)
        .then((row) => {
            if (row) {
                res.json(row);
            } else {
                res.sendStatus(404);
            };
        });
};

const deleteSingleNetwork = (req, res) => {
    const id = req.params.id;
    delete (id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500);
        });
};

export { getNetworks, getSingleNetwork, createSingleNetwork, updateSingleNetwork, deleteSingleNetwork };
