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

    static async create(title, imdbRating, networkId, result) {
        const client = new Client(dbConfig);
        try {
            await client.connect();
            await client.query('BEGIN');
            // insert a new show
            const res = await client.query({
                text: 'INSERT INTO show (title, imdb_rating) VALUES ($1, $2) RETURNING *;',
                values: [title, imdbRating]
            });
            if (res.error) {
                await client.query('ROLLBACK');
                result(res.error);
            } else {
                const showId = res.rows[0].show_id;
                // insert into show_network
                const res2 = await client.query({
                    text: 'INSERT INTO show_network (show_id, network_id) VALUES ($1, $2);',
                    values: [showId, networkId]
                });
                if (res2.error) {
                    await client.query('ROLLBACK');
                    result(res2.error);
                };
            };
            await client.query('COMMIT');
            result(null, res.rows[0]);
        } catch (err) {
            await client.query('ROLLBACK');
            result(err);
        }
        await client.end();
    };

    static async update(showId, title, imdbRating, networkId, result) {
        const client = new Client(dbConfig);
        try {
          await client.connect();
          await client.query('BEGIN');
          const res = await client.query({
            text: 'UPDATE show SET title=$1, imdb_rating=$2 WHERE show_id=$3 RETURNING *;',
            values: [title, imdbRating, showId]
          });
          if (res.error) {
            await client.query('ROLLBACK');
            result(res.error);
          } else {
            const res2 = await client.query({
              text: 'UPDATE show_network SET network_id=$1 WHERE show_id=$2;',
              values: [networkId, showId]
            });
            if (res2.error) {
              await client.query('ROLLBACK');
              result(res2.error);
            };
          };
          await client.query('COMMIT');
          result(null, res.rows[0]);
        } catch (err) {
          await client.query('ROLLBACK');
          result(err);
        }
        await client.end();
      };

      static async delete(showId, result) {
        const client = new Client(dbConfig);
        try {
            await client.connect();
            await client.query('BEGIN');
            await client.query({
                text: 'DELETE FROM show_network WHERE show_id = $1;',
                values: [showId]
            });
            const res = await client.query({
                text: 'DELETE FROM show WHERE show_id = $1 RETURNING *;',
                values: [showId]
            });
            if (res.error) {
                await client.query('ROLLBACK');
                result(res.error);
            } else {
                await client.query('COMMIT');
                result(null, res.rows[0]);
            }
        } catch (err) {
            await client.query('ROLLBACK');
            result(err);
        }
        await client.end();
    };
    
};

export default Show;