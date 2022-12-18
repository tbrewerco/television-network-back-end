import pkg from 'pg';
const { Client } = pkg;
import dbConfig from '../config/dbConfig.js';

const createTables = async () => {

    const client = new Client(dbConfig);

    await client.connect();

    // create show table
    await client.query(`
        CREATE TABLE show (
            show_id serial PRIMARY KEY,
            title varchar(255) UNIQUE NOT NULL,
            imdb_rating decimal(3,1) NOT NULL
        );
    `);

    // create network table
    await client.query(`
        CREATE TABLE network (
            network_id serial PRIMARY KEY,
            network_name varchar(255) UNIQUE NOT NULL
        );
    `);

    // create package table
    await client.query(`
        CREATE TABLE package (
            package_id serial PRIMARY KEY,
            package_name varchar(255) UNIQUE NOT NULL,
            package_price decimal(6,2) NOT NULL
        );
    `);

    // create show_network table
    await client.query(`
        CREATE TABLE show_network (
            show_id integer REFERENCES show(show_id) ON DELETE CASCADE,
            network_id integer REFERENCES network(network_id) ON DELETE CASCADE,
            PRIMARY KEY (show_id, network_id)
        );
    `);

    // create package_network table
    await client.query(`
        CREATE TABLE package_network (
            package_id integer REFERENCES package(package_id) ON DELETE CASCADE,
            network_id integer REFERENCES network(network_id) ON DELETE CASCADE,
            PRIMARY KEY (package_id, network_id)
        );
    `);

    await client.end();
};

createTables();