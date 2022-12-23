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

export { getShows };