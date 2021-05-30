const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser')
const util = require('util');
const uuidv4 = require('uuid/v4')

// Format:
// [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]

const client = redis.createClient('redis://redis-master:6379');

const rset = util.promisify(client.set).bind(client);
const rget = util.promisify(client.get).bind(client);

const rsadd = util.promisify(client.sadd).bind(client);
const rsmembers = util.promisify(client.smembers).bind(client);

client.select(1);
// client.keys('*', (...args) => console.log({ args }));

const rawParser = bodyParser.raw({
  limit: '1000kb',
  type: '*/*',
});

const app = express()

const collection = /\/$/;
const resource = /[^/]$/;

app.use(rawParser);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

app.get(collection, async (req, res) => {
  console.log(`get collection ${req.url}`);
  const data = await rsmembers(req.url);
  res.send(JSON.stringify(data));
});

app.get(resource, async (req, res) => {
  console.log(`get resource ${req.url}`);
  // await new Promise((resolve) => setTimeout(resolve, 10));
  const data = await rget(req.url);
  res.send(data);
});


app.post(collection, async (req, res) => {
  console.log(`posted to collection ${req.url}`);
  const id = uuidv4();
  await rsadd(req.url, id);
  await rset(req.url + id, req.body.toString('utf8'));
  res.send(id);
});

app.put(resource, async (req, res, next) => {
  console.log(`put to resource ${req.url}`);
  await rset(req.url, req.body);
  res.send('k');
});





app.listen(8080, (err) => {
  if (err) { throw err; }
  console.log('server ready on http://localhost:8080')
})

