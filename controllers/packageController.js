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

export { getPackages };
