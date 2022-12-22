import knex from 'knex';

const TABLE_NAME = 'network';

const getAllNetworks = () => {
    return knex(TABLE_NAME).select('*');
};

const getNetworkById = (id) => {
    return knex(TABLE_NAME).select('*').where({ id }).first();
};

const createNetwork = (network) => {
    return knex(TABLE_NAME).insert(network).returning('*');
};

const updateNetwork = (id, network) => {
    return knex(TABLE_NAME).update(network).where({ id }).returning('*');
};

const deleteNetwork = (id) => {
    return knex(TABLE_NAME).delete().where({ id });
};

export { getAllNetworks, getNetworkById, createNetwork, updateNetwork, deleteNetwork };
