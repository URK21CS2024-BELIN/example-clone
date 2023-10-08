const db = require('../db');

module.exports.getCompletedTodos = async() => {
    const [records] = await db.query("SELECT * FROM todo_list where stat = 'complete'")
    return records;
}

module.exports.getPendingTodos = async() => {
    const [records] = await db.query("SELECT * FROM todo_list where stat = 'pending'")
    return records;
}

module.exports.getTodoById = async(id) => {
    const [record] = await db.query("SELECT * FROM todo_list WHERE id = ?",[id])
    return record;
}

module.exports.deleteTodo = async(id) => {
    const [{affectedRows}] = await db.query("DELETE FROM todo_list WHERE id = ?",[id])
    return affectedRows;
}

module.exports.addOrEditTodo = async(obj) => {
    const id=(obj.id)?obj.id:0;

    const [{affectedRows}] = await db.query("CALL todo_add_or_edit(?,?,?,?,?)",[id, obj.title, obj.descrip, obj.datetime_due, obj.stat])
    return affectedRows;
}