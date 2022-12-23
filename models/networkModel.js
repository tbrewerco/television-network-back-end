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
            if (packages.error) result(packages.error)
            else result(null, packages);
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
            if (pkg.error) result(pkg.error);
            else result(null, pkg);
        } catch (err) {
            result(err, null);
        };
        client.end();
    };

    static async create(networkName, result) {
        const client = new Client(dbConfig);
        const text = 'INSERT INTO network (network_name) VALUES ($1) RETURNING *';
        const values = [networkName];
        try {
            await client.connect();
            const pkg = await client.query(text, values);
            if (pkg.error) result(pkg.error);
            else result(null, pkg);
        } catch (err) {
            result(err, null);
        };
        client.end();
    };

    static async update(name, id, result) {
        const client = new Client(dbConfig);
        const text = 'UPDATE network SET network_name = $1 WHERE networK_id = $2 RETURNING *;';
        const values = [name, id];
        try {
            await client.connect();
            const pkg = await client.query(text, values);
            if (pkg.error) result(pkg.error);
            else result(null, pkg);
        } catch (err) {
            result(err, null);
        };
        client.end();
    };

    static async delete(id) {
    };

};

export default Network;