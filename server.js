const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }))

function getAllAccounts() {
    return db('accounts');
  }

  function getAccountById(id) {
    return db('accounts').where({ id });
  }

  function createNewAccount({ name, budget }) {
    return db('accounts').insert({ name, budget });
  }

  function deleteAccountById(id) {
    return db('accounts').where({ id }).del();
  }

  function updateAccountById(id, { name, budget }) {
    return db('accounts').where({ id }).update({ name, budget });
  }






  // API endpoints
  server.get('/accounts', async(req, res) => {
      const accounts = await getAllAccounts();
      return res.json(accounts);
  });

  server.get('/accounts/:id', async(req, res, next) => {
    try {
        const account = await getAccountById(req.params.id);
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
  });

  server.delete('/accounts/:id', async(req, res, next) => {
      try {
          const budget = await deleteAccountById(req.params.id);
          if (!budget) {
            return res.status(404).json({
                errorMessage: 'The account with the specified ID does not exist'
            })
          }
          return res.status(200).json({
              message: 'Budget successfully deleted'
          })
      } catch (error) {
        return res.status(500).json({
            errorMessage: error,
        });
      }
  });

  server.put('/accounts/:id', validatebudgetId, validateBudgetBody, async(req, res, next) => {
    const budgetUpdates = { 
        name: req.body.name,
        budget: req.body.budget
     } 
      try {
        const updatedBudget = await updateAccountById(req.budget.id, budgetUpdates);
        const [ updatedBudgetData ] = await getAccountById(req.budget.id);
        return res.status(200).json(updatedBudgetData)
        return res.status(200).json(updatedBudget)
      } catch (error) {
        return res.status(500).json({
            errorMessage: error,
        });
      }
  })

  async function validatebudgetId(req, res, next) {
    const id = req.params.id;
    if (Number.isNaN(id) || id % 1 !== 0 || id < 0) {
        return res.status(400).json({
            errorMessage: "Invalid budget id supplied"
        });
    }
    try {
        const [budget] = await getAccountById(id);
        if (!budget) {
            return res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            })
        }
        req.budget = budget;
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
    return next();
};

function validateBudgetBody(req, res, next) {
    if (!Object.keys(req.body).length) {
        return res.status(400).send({
          message: 'missing budget data',
        });
      }
      if (!req.body.name || !req.body.budget) {
        return res.status(400).send({
          message: 'missing required name and budget field',
        });
      }
      return next()
};

module.exports = server;

