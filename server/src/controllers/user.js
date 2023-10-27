const client = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
const userRegistration = async (req, res) => {
    const {
        first_name,
        last_name,
        email_address,
        contact_number,
        password,
        role,
    } = req.body;

    try {
        // Check if the user already exists
        const existingUserQuery = 'SELECT user_id FROM user_logins WHERE email_address = $1';
        const existingUserResult = await client.query(existingUserQuery, [email_address]);

        if (existingUserResult.rows.length > 0) {
            // A user with the same email address already exists
            return res.status(400).json({ error: 'User with this email address already exists' });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO user_logins (first_name, last_name, email_address, contact_number, password, role, status, created_on, updated_on, created_by, updated_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING user_id
        `;
        const values = [
            first_name,
            last_name,
            email_address,
            contact_number,
            hashedPassword,
            role,
            'ACTIVE',
            new Date(),
            new Date(),
            null,
            null,
        ];

        const result = await client.query(query, values);
        res.status(201).json({ message: 'User registered successfully', user_id: result.rows[0].user_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
};


const userLogin = async (req, res) => {
    const { email_address, password } = req.body;

    try {
        const query = 'SELECT * FROM user_logins WHERE email_address = $1';
        const { rows } = await client.query(query, [email_address]);

        if (rows.length !== 1) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const user = rows[0];

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // User authenticated, create a token with role
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, 'your-secret-key');

        res.header('x-auth-token', token).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const query = 'SELECT * FROM user_logins';
        const result = await client.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



// Get a user by id
const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const query = 'SELECT * FROM user_logins WHERE user_id = $1';
        const result = await client.query(query, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Update user by user_id
const updateUserById = async (req, res) => {
    const id = req.params.id;
    const {
        first_name,
        last_name,
        email_address,
        contact_number,
        password,
        role,
    } = req.body;

    const updatedOn = new Date().toISOString(); 

    try {
        // Check if the user already exists (excluding the current user's ID)
        const existingUserQuery = 'SELECT user_id FROM user_logins WHERE email_address = $1 AND user_id <> $2';
        const existingUserResult = await client.query(existingUserQuery, [email_address, id]);

        if (existingUserResult.rows.length > 0) {
            // A user with the same email address already exists
            return res.status(400).json({ error: 'User with this email address already exists' });
        }

        // Build the query to update the user's information
        const queryParams = [
            `first_name = '${first_name}'`,
            `last_name = '${last_name}'`,
            `contact_number = '${contact_number}'`,
            `password = '${password}'`,
            `role = '${role}'`,
            `status = 'ACTIVE'`,
            `updated_on = '${updatedOn}'`,
            `updated_by = 1`,
        ];

        // Include email update in the query only if it has changed
        if (email_address) {
            queryParams.push(`email_address = '${email_address}'`);
        }

        const query = `
            UPDATE user_logins
            SET
            ${queryParams.join(', ')}
            WHERE
            user_id = $1;
        `;

        const result = await client.query(query, [id]);

        res.send('User updated successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a user by user_id
const deleteUserById = async (req, res) => {
    const id = req.params.id

    try{
        const userQuery = 'SELECT * FROM user_logins WHERE user_id = $1';
        const userResult = await client.query(userQuery, [id])

        if (userResult.rows.length === 0){
            return res.status(404).json({error:'User not found'})
        }

        const deleteQuery = 'DELETE FROM user_logins WHERE user_id = $1';
        await client.query(deleteQuery, [id])
        res.status(204).json({message:'User deleted successfully'})
        
    }catch(error){
        console.log('Error', error)
        res.status(500).json({error:'Internal Server Error'})
    }
}


function validatePassword(password) {
    // password validation logic here
    return password.length >= 8;
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    userRegistration,
    userLogin
};
