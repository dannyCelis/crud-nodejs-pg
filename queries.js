const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '12345678',
    port: 5432
});

// obtener usuarios
const getUsers = (request, response) => {
    pool.query('SELECT * FROM api.users ORDER BY id ASC',
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
}

// obtener usuario
const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM api.users WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        });
}

// crear usuario
const createUser = (request, response) => {
    const { name, email } = request.body;

    pool.query('INSERT INTO api.users(name,email) VALUES ($1, $2) RETURNING *',
        [name, email],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`User added with ID: ${results.rows[0].id}`);
        });
}

// actualizar usuario
const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query('UPDATE api.users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        });
}

// eliminar usuario
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM api.users WHERE id = $1',
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User deleted with ID: ${id}`)
        });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}