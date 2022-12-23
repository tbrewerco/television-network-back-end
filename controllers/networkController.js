import Network from '../models/networkModel.js';

const getNetworks = async (req, res) => {
    await Network.getAll(req, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data?.rows?.length) res.sendStatus(404);
        else res.json(data.rows);
    });
};

const getSingleNetwork = async (req, res) => {
    const id = req.params.id;
    await Network.findById(id, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data?.rows?.length) res.sendStatus(404);
        else res.json(data.rows);
    });
};

const createSingleNetwork = async (req, res) => {
    const networkName = req.body.networkName;
    await Network.create(networkName, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data.rows.length) res.sendStatus(404);
        else res.json(data.rows);
    });
};

const updateSingleNetwork = async (req, res) => {
    const networkName = req.body.networkName;
    const networkId = req.params.id;
    await Network.update(networkName, networkId, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data.rows.length) res.sendStatus(404);
        else res.json(data.rows);
    });
};

const deleteSingleNetwork = async (req, res) => {
    const id = req.params.id;
    await Network.delete(id, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (data === 0) res.sendStatus(404);
        else res.json(`Network with id ${id} deleted.`);
    });
};

export { getNetworks, getSingleNetwork, createSingleNetwork, updateSingleNetwork, deleteSingleNetwork };
