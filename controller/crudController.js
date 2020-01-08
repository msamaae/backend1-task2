const controller = {};

// READ 
controller.read = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM restaurant', (err, restaurants) => {
            if (err) {
                res.json(err);
            }
            // throw err
            res.render('crud', {
                data: restaurants
            });
        });
    });
};

// CREATE 
controller.create = (req, res) => {
    // get inputs
    const data = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO restaurant SET ?', data, (err, restaurant) => {
            res.redirect('/crud');
        });
    });
};

// EDIT
controller.edit = (req, res) => {
    // get id
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM restaurant where id = ?', [id], (err, rows) => {
            res.render('crud-edit', {
                data: rows[0]
            });
        });
    });
};

// UPDATE
controller.update = (req, res) => {
    const { id } = req.params;
    const updateRestaurant = req.body;
    
    req.getConnection((err, conn) => {
        conn.query('UPDATE restaurant SET ? WHERE id = ?', [updateRestaurant, id], (err, rows) => {
            res.redirect('/crud');
        });
    });
};

// DELETE     
controller.delete = (req, res) => {
    const { id } = req.params; 

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM restaurant WHERE id = ?', [id], (err, rows) => {
            if (err) throw err;
            res.redirect('/crud');
        });
    });
};

module.exports = controller;