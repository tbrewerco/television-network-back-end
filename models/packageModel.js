import pg from 'pg'
const { Client } = pg
import dbConfig from '../config/dbConfig.js';

class Package {
    constructor(pkg) {
        this.package_id = pkg.packageId;
        this.package_name = pkg.packageName;
        this.package_price = pkg.packages;
        this.networks = pkg.networks;
    };

    static async getAll(params, result) {
        const client = new Client(dbConfig);
        try {
            await client.connect();
            // get all packages with included networks
            const res = await client.query(`
            SELECT p.package_id, p.package_name, p.package_price, n.network_id, n.network_name
            FROM package p
            INNER JOIN package_network pn ON p.package_id = pn.package_id
            INNER JOIN network n ON pn.network_id = n.network_id;
            `);
            if (res.error) result(res.error)
            else {
                const packages = [];
                res.rows.forEach(row => {
                    const pkgId = row.package_id;
                    // find index of a package with same id in packages array
                    const pkgIndex = packages.findIndex(pkg => pkg.package_id === pkgId);
                    // if package w same id not found, add new package to array
                    if (pkgIndex === -1) {
                        packages.push({
                            package_id: pkgId,
                            package_name: row.package_name,
                            package_price: row.package_price,
                            networks: []
                        });
                        // if package with same id was found, add current network to the package's 'networks' array
                    } else {
                        packages[pkgIndex].networks.push({
                            network_id: row.network_id,
                            network_name: row.network_name
                        })
                    }
                });
                result(null, packages);
            }
        } catch (err) {
            result(err, null);
        };
        await client.end();
    };

    static async findById(id, result) {
        // create a new database client
        const client = new Client(dbConfig);
        try {
            await client.connect();
            const res = await client.query(`
                SELECT p.package_id, p.package_name, p.package_price, n.network_id, n.network_name
                FROM package p
                INNER JOIN package_network pn ON p.package_id = pn.package_id
                INNER JOIN network n ON pn.network_id = n.network_id
                WHERE p.package_id = $1;
            `, [id]);
            if (res.error) result(res.error)
            else {
                const pkg = {};
                res.rows.forEach(row => {
                    // get the package id for the current row
                    const pkgId = row.package_id;
                    // if the package does not yet have a property with the same id as the current package, add a new package
                    if (!pkg[pkgId]) {
                        pkg[pkgId] = {
                            package_id: pkgId,
                            package_name: row.package_name,
                            package_price: row.package_price,
                            networks: []
                        };
                    }
                    // add the current network to the package object's networks array
                    pkg[pkgId].networks.push({
                        network_id: row.network_id,
                        network_name: row.network_name
                    });
                });
                result(null, Object.values(pkg)[0]);
            }
        } catch (err) {
            result(err, null);
        };
        await client.end();
    };

    static insertPkgNetwork = async (packageId, networkId, client) => {
        const res2 = await client.query({
            text: 'INSERT INTO package_network (package_id, network_id) VALUES ($1, $2);',
            values: [packageId, networkId]
        });
        if (res2.error) {
            // roll back database transaction in case of error
            await client.query('ROLLBACK');
            result(res2.error);
        };
    };

    static async create(packageName, packagePrice, networks, result) {
        const client = new Client(dbConfig);
        try {
            await client.connect();
            // begin the transaction which will create package and add networks to package_network table
            await client.query('BEGIN');
            // insert a new package
            const res = await client.query({
                text: 'INSERT INTO package (package_name, package_price) VALUES ($1, $2) RETURNING *;',
                values: [packageName, packagePrice]
            });
            if (res.error) {
                await client.query('ROLLBACK');
                result(res.error);
            }
            if (networks.length) {
                // get the package id of the newly inserted package
                const packageId = res.rows[0].package_id;
                // function that inserts into package_network

                // insert into package_network
                await networks.forEach(async networkId => {
                    await this.insertPkgNetwork(packageId, networkId, client);
                });
            };
            // commit the transaction
            await client.query('COMMIT');
            result(null, res.rows[0]);
        } catch (err) {
            // rollback if error
            await client.query('ROLLBACK');
            result(err);
        };
        await client.end();
    };

};

export default Package;