import dbConfig from '../config/dbConfig.js';
import fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;

const seedDatabase = async () => {
  // connect to the database
  const client = new Client(dbConfig);
  await client.connect();

  // add additional single quote to single quotes in object values
  function addQuote(array) {
    return array.map(obj => {
      const newObj = {};
      for (const key in obj) {
        // check that the key belongs to the object itself, not its prototype
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          // if the value is a string, replace any single quotes with two single quotes
          if (typeof value === 'string') {
            newObj[key] = value.replace(/'/g, "''");
          }
          // if the value is not a string copy it over to the new object
          else {
            newObj[key] = value;
          };
        };
      };
      return newObj;
    });
  };

  // read and parse data from JSON files
  let showsData = JSON.parse(fs.readFileSync('../seedData/shows.json', 'utf8'));
  let packagesData = JSON.parse(fs.readFileSync('../seedData/packages.json', 'utf8'));

  // add single quotes as necessary because postgreSQL doesn't support single quotes in string
  showsData = addQuote(showsData);
  packagesData = addQuote(packagesData);

  async function insertShow(show) {
    const query = `
      INSERT INTO show (title, imdb_rating)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [show.title, show.imdbRating];
    const result = await client.query(query, values);
    return result.rows[0];
  };

  async function insertNetwork(network) {
    const query = `
      INSERT INTO network (network_name)
      VALUES ($1)
      RETURNING *
    `;
    const values = [network];
    const result = await client.query(query, values);
    return result.rows[0];
  };

  async function insertPackage(pk) {
    const query = `
      INSERT INTO package (package_name, package_price)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [pk.name, pk.price];
    const result = await client.query(query, values);
    return result.rows[0];
  };

  async function insertShowNetwork(showId, networkId) {
    const query = `
      INSERT INTO show_network (show_id, network_id)
      VALUES ($1, $2)
    `;
    const values = [showId, networkId];
    await client.query(query, values);
  };

  async function insertPackageNetwork(packageId, networkId) {
    const query = `
      INSERT INTO package_network (package_id, network_id)
      VALUES ($1, $2)
    `;
    const values = [packageId, networkId];
    await client.query(query, values);
  };

  // iterate through shows
  for (const show of showsData) {
    const insertedShow = await insertShow(show);

    // insert network doesn't already exist
    let insertedNetwork = await client.query(`SELECT * FROM network WHERE network_name = $1`, [show.network]);
    insertedNetwork = insertedNetwork.rowCount === 0 ? await insertNetwork(show.network) : insertedNetwork = insertedNetwork.rows[0];

    // insert into show_network junction table
    await insertShowNetwork(insertedShow.show_id, insertedNetwork.network_id);
  };

  // iterate through packages
  for (const pk of packagesData) {
    const insertedPackage = await insertPackage(pk);

    // iterate through networks in package
    for (const network of pk.networks) {
      // insert network if doesn't exist
      let insertedNetwork = await client.query(`SELECT * FROM network WHERE network_name = $1`, [network]);
      insertedNetwork = insertedNetwork.rowCount === 0 ? await insertNetwork(network) : insertedNetwork.rows[0];

      // insert into package_network junction table
      await insertPackageNetwork(insertedPackage.package_id, insertedNetwork.network_id);
    };
  };

  // close the connection to the database
  client.end();
};

seedDatabase();