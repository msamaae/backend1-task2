/* const controller = {};



controller.index = (req, res) => {
    res.render('index');
};

controller.logout = (req, res) => {
    req.logOut()
    res.redirect('/login')
};


controller.login = (req, res) => {
    res.render('login')
  }

  






controller.register = (req, res) => {
    res.render('register');
};



controller.postRegister =  (req, res) => {
    const bcrypt = require('bcryptjs')
    const users = [];
   
    try {
      const hashedPassword =  bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
      console.log(users);
      
    } catch(err) {
        if (err) throw err;
      res.redirect('/register')
      console.log(users);
      
    }
  }

module.exports = controller; */