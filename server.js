const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }))

function getAllAccounts() {
    return db('accounts');
  }

  










  // API endpoints
  server.get('/accounts', async(req, res) => {
      const accounts = await getAllAccounts();
      return res.json(accounts);
  });

 

module.exports = server;