import client from './db.js';

class Network {
    constructor(network) {
        this.network_id = network.networkId;
        this.network_name = network.networkName;
    };

    static async getAll(params, result) {
        try {
            await client.connect();
            const packages = await client.query('SELECT * FROM network');
            await client.end();
            result(null, packages);
        } catch (err) {
            result(err, null);
        };
    };

    static async findById(id) {
    };

    static async create(network) {
    };

    static async update(id, network) {
    };

    static async delete(id) {
    };

};

export default Network;