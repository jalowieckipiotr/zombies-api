const express = require("express");
const router = express.Router();
const App = require("../controllers/controller.js");
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Id of the item
 *         name:
 *           type: string
 *           description: The name of item
 *         price:
 *           type: number
 *           description: Price of item
 *       example:
 *         id: 1
 *         title: Diamond Sword
 *         price: 100
 *     Zombie:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - creationDate
 *       properties:
 *         id:
 *           type: string
 *           description: autogenated Id of the zombie
 *         name:
 *           type: string
 *           description: The name of zombie
 *         creationDate:
 *           type: string
 *           description: Date of zombie creation
 *       example:
 *         id: 6231dbe5b44b11d13fb77be4
 *         name: Sample Zombie
 *         creationDate: 2022-03-16T12:45:25.982+00:00
 *     ZombieDetailed:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - creationDate
 *         - items
 *       properties:
 *         id:
 *           type: string
 *           description: autogenated Id of the zombie
 *         name:
 *           type: string
 *           description: The name of zombie
 *         sumPLN:
 *           type: string
 *           description: Value of all items in [PLN] currency
 *         sumEUR:
 *           type: string
 *           description: Value of all items in [EUR] currency
 *         sumUSD:
 *           type: string
 *           description: Value of all items in [USD] currency
 *         creationDate:
 *           type: string
 *           description: Date of zombie creation
 *         items:
 *           type: array
 *           description: id of item
 *           $ref: '#/components/schemas/Item'
 *       example:
 *         id: 6231dbe5b44b11d13fb77be4
 *         name: Sample Zombie
 *         sumPLN: 125.10
 *         sumEUR: 25.11
 *         sumUSD: 30.20
 *         creationDate: 2022-03-16T12:45:25.982+00:00
 *         items: [{ "id": 1, "name": "Diamond Sword", "price": 100 }]
 */

/**
 * @swagger
 * /zombies:
 *   get:
 *     summary: Returns the list of all zombies
 *     tags: [Zombies]
 *     responses:
 *       200:
 *         description: The list of the zombies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Zombie'
 */
router.get("/", App.findAll);

/**
 * @swagger
 * /zombies/{zombieId}:
 *   get:
 *     summary: Get zombie by id
 *     tags: [Zombies]
 *     parameters:
 *       - in: path
 *         name: zombieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The zombie id
 *     responses:
 *       200:
 *         description: The zombie description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ZombieDetailed'
 *       404:
 *         description: Zombie with id [zombieId] not found.
 */
router.get("/:zombieId", App.findOne);

/**
 * @swagger
 * /zombies:
 *   post:
 *     summary: Create a new zombie
 *     tags: [Zombies]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The zombie was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zombie'
 *       500:
 *         description: Some server error
 */
router.post("/", App.create);

/**
 * @swagger
 * /zombies/{zombieId}:
 *   put:
 *     summary: Update zombie
 *     tags: [Zombies]
 *     parameters:
 *       - in: path
 *         name: zombieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The zombie id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The zombie was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Zombie'
 *       404:
 *         description: Zombie not found
 *       500:
 *         description: Some server error
 */
router.put("/:zombieId", App.update);
/**
 * @swagger
 * /zombies/{zombieId}:
 *   delete:
 *     summary: Delete zombie
 *     tags: [Zombies]
 *     parameters:
 *       - in: path
 *         name: zombieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The zombie id
 *     responses:
 *       200:
 *         description: The zombie was successfully deleted
 *       404:
 *         description: Zombie not found
 *       500:
 *         description: Some server error
 */
router.delete("/:zombieId", App.delete);

/**
 * @swagger
 * /zombies/item/{zombieId}:
 *   post:
 *     summary: Add item to zombie
 *     tags: [Zombies]
 *     parameters:
 *       - in: path
 *         name: zombieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The zombie id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 format: int32
 *     responses:
 *       200:
 *         description: Item was succesfully added.
 *       404:
 *         description: Zombie not found
 *       500:
 *         description: Some server error
 */
router.post("/item/:zombieId", App.addItem);

/**
 * @swagger
 * /zombies/item/{zombieId}:
 *   delete:
 *     summary: Remove item from zombie
 *     tags: [Zombies]
 *     parameters:
 *       - in: path
 *         name: zombieId
 *         schema:
 *           type: string
 *         required: true
 *         description: The zombie id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *                 format: int32
 *     responses:
 *       200:
 *         description: Item was succesfully removed.
 *       404:
 *         description: Zombie or item not found
 *       500:
 *         description: Some server error
 */
router.delete("/item/:zombieId", App.deleteItem);

module.exports = router;
