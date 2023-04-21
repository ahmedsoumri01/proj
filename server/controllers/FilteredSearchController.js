/*const express = require('express');
const { Op } = require('sequelize');
const { User, Ticket, Category , Project , Departement } = require('../models');

const app = express();

// Search endpoint
app.get('/search', async (req, res) => {
  const { q, category } = req.query;

  // Define the search criteria
  const where = {
    [Op.or]: [
     // { name: { [Op.like]: `%${q}%` } }, // Search by user name
      { title: { [Op.like]: `%${q}%` } }, // Search by ticket title
      { '$categories.name$': { [Op.like]: `%${q}%` } }, // Search by category name
    ],
  };

  // Add category filter if specified
  if (category) {
    where.categoryId = category;
  }

  // Execute the query
  const results = await Ticket.findAll({
    where,
    include: [{ model: User }, { model: Category }],
  });

  res.json(results);
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
*/

const { Op } = require('sequelize');

/** 
 * Search for items in a model.
  @param {Model} model The Sequelize model to search.
  @param {Array<string>} searchFields An array of fields to search by.
  @param {Object} queryParams Query parameters for filtering and pagination.
 @returns {Promise<Array>} A promise that resolves to an array of search results.
 */
async function search(model, searchFields, queryParams) {
  const { q, category, page = 1, limit = 10 } = queryParams;

  // Define the search criteria
  const where = {
    [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${q}%` } })),
  };

  // Add category filter if specified
  if (category) {
    where.categoryId = category;
  }

  // Execute the query
  const results = await model.findAndCountAll({
    where,
    include: [{ all: true }],
    offset: (page - 1) * limit,
    limit,
  });

  return results;
}

module.exports = {search};