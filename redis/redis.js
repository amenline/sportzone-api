const redis = require('redis');

const client = redis.createClient();

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

// getAsync.then(console.log).catch(console.error);

client.on('connect', () => console.log('Redis connectd'));
client.on('error', (error) => console.error(error));
