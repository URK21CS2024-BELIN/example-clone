const express = require('express');
const router = express.Router();

const service = require('../services/todo_service');

router.get('/completed',async (req, res) => {
    const todos = await service.getCompletedTodos();
    res.send(todos)
})
router.get('/pending',async (req, res) => {
    const todos = await service.getPendingTodos();
    res.send(todos)
})
router.get('/:id',async (req, res) => {
    const todo = await service.getTodoById(req.params.id);
    if(todo.length == 0)
        res.status(404).json('no record with given id')
    else   
        res.send(todo)
})
router.delete('/:id',async (req, res) => {
    const affectedRows = await service.deleteTodo(req.params.id);
    if(affectedRows == 0)
        res.status(404).json('no record with given id')
    else   
        res.send("deleted")
})
router.post('/', async (req, res) => {
    console.log(req.body)
    const rows = await service.addOrEditTodo(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ message: 'Created Successfully.' });
})

module.exports = router;