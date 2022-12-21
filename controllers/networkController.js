import { getAllNetworks, getNetworkById, createNetwork, updateNetwork, deleteNetworks } from '../models/network';

const getAllNetworks = (req, res) => {
    getAllNetworks()
        .then((rows) => {
            res.json(rows);
        })
        .catch((error) => {
            console.error(error);
            res.sendStatus(500); Network
        });
};

const getNetworkById = (req, res) => {
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

const createNetwork = (req, res) => {
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

const updateNetwork = (req, res) => {
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

const deleteNetworks = (req, res) => {
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

export { getAllNetworks, getNetworkById, createNetwork, updateNetwork, deleteNetworks };
