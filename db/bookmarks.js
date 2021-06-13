const bcrypt = require('bcrypt');
const knex = require('knex')({
    client: 'mssql',
    connection: {
        server: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        options: {
            port: 1433,
            instanceName: 'SQLEXPRESS'
        }
    }
});

const getbookmarks = async id => {
    return await knex('bookmarks').where('userId', id).select('*');
}

const addbookmark = async bookmark => {
    await knex('bookmarks').insert(bookmark);
}

const deleteBookmark = async id => {
    await knex('bookmarks').where('id', id).del();
}

const update = async (id, title) => {
    await knex('bookmarks').update('title', title).where('id', id);
}

const top5 = async () => {
   return await knex.from('bookmarks').select({url: 'url'}).count({count: 'url'}).groupBy('url').orderBy('count', 'desc').limit(5);

    // return await knex.from('bookmarks').select({url: 'bookmarks.url'})
    // .count({ count: 'bookmarks.url' }).groupBy('bookmarks.url')
    // .orderBy('count', 'desc').limit(5);
}

module.exports = {
    getbookmarks,
    addbookmark,
    deleteBookmark,
    update,
    top5
};