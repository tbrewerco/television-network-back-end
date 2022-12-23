import pg from 'pg'
const { Client } = pg
import dbConfig from '../config/dbConfig.js';

class Show {
    constructor(show) {
        this.show_id = show.showId;
        this.title = show.title;
        this.imdb_rating = show.imdbRating;
    };

    static async getAll(networkId, packageId, result) {
        const client = new Client(dbConfig);
        try {
            await client.connect();
            let res;
            let query = `
            SELECT s.show_id, s.title, s.imdb_rating
            FROM show s
            INNER JOIN show_network sn ON sn.show_id = s.show_id`;
            if (networkId) {
                // get all shows on a specific network
                res = await client.query({
                    text: query + ` WHERE sn.network_id = $1;`,
                    values: [networkId]
                });
            } else if (packageId) {
                // get all shows on networks in a specific package
                res = await client.query({
                    text: query + ` INNER JOIN package_network pn ON pn.network_id = sn.network_id WHERE pn.package_id = $1;`,
                    values: [packageId]
                });
            } else {
                // get all shows
                res = await client.query('SELECT * FROM show;');
            };
            result(null, res.rows);
        } catch (err) {
            result(err);
        }
        await client.end();
    };

    static async findById(id, result) {
        const client = new Client(dbConfig);
        const text = 'SELECT * FROM show WHERE show_id = $1';
        const values = [id];
        try {
            await client.connect();
            const show = await client.query(text, values);
            if (show.error) result(show.error);
            else result(null, show);
        } catch (err) {
            result(err, null);
        };
        client.end();
    };

};

export default Show;