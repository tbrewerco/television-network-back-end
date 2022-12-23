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
