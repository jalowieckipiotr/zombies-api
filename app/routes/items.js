const express = require("express");
const router = express.Router();
const App = require("../controllers/controller.js");
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Returns the list of all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", App.findAllItems);

module.exports = router;