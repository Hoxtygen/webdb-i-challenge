const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }))

function getAllAccounts() {
    return db('accounts');
  }

  function getAccountById(id) {
    // SELECT * FROM users WHERE id = id;
    return db('accounts').where({ id });
  }

  function createNewAccount({ name, budget }) {
    return db('accounts').insert({ name, budget });
  }








  // API endpoints
  server.get('/accounts', async(req, res) => {
      const accounts = await getAllAccounts();
      return res.json(accounts);
  });

  server.get('/accounts/:id', async(req, res, next) => {
    try {
        const account = await getAccountById(req.params.id);
        //console.log(account)
        if (!account.length) {
            return res.status(404).json({
                errorMessage: 'The account with the specified ID does not exist'
            })
        }
        return res.status(200).json(account[0])
    } catch (error) {
      return res.status(500).json({
          errorMessage: error,
      })
    }
})

server.post('/accounts', async(req, res, next) => {
    try {
        const newBudget = await createNewAccount(req.body)
        const newBudgetData = await getAccountById(newBudget[0]);
        return res.json(newBudgetData)
    } catch (error) {
        return res.status(500).json({
            errorMessage: error,
        })
    }
  })

module.exports = server;