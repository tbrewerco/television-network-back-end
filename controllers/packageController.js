import Package from '../models/packageModel.js';

const getPackages = async (req, res) => {
    await Package.getAll(req, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data) res.sendStatus(404);
        else res.json(data);
    });
};

const getSinglePackage = async (req, res) => {
    const id = req.params.id;
    await Package.findById(id, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data) res.sendStatus(404);
        else res.json(data);
    });
};

const createSinglePackage = async (req, res) => {
    const packageName = req.body.packageName;
    const packagePrice = req.body.packagePrice;
    const networks = req.body.networks;
    await Package.create(packageName, packagePrice, networks, (err, data) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
            return;
        }
        if (!data) res.sendStatus(404);
        else res.json(data);
    });
};

export { getPackages, getSinglePackage, createSinglePackage };
