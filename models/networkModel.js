import pg from 'pg'
const { Client } = pg
import dbConfig from '../config/dbConfig.js';

class Network {
    constructor(network) {
        this.network_id = network.networkId;
        this.network_name = network.networkName;
    };

    static async getAll(params, result) {
        const client = new Client(dbConfig);
        try {
            await client.connect();
            const packages = await client.query('SELECT * FROM network');
            result(null, packages);
        } catch (err) {
            result(err, null);
        };
        await client.end();
    };

    static async findById(id, result) {
        const client = new Client(dbConfig);
        const text = 'SELECT * FROM network WHERE network_id = $1';
        const values = [id];
        try {
            await client.connect();
            const pkg = await client.query(text, values);
            result(null, pkg);
        } catch (err) {
            result(err, null);
        };
        client.end();
    };

    static async create(network) {
    };

    static async update(id, network) {
    };

    static async delete(id) {
    };

};

export default Network;