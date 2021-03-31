var Userdb = require('../module/model');

//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.tatus(400).send({ message: "Content can not be empty!" })
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the database
    user.save(user).then(data => {
        // res.send(data)
        res.redirect('/add-user');
    }).catch(err => {
        res.staus(500).send({
            message: err.message || "Some error occurred while creating a create operation."
        });
    });
}

//retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`User with id ${id} not found.`});
            }else{
                res.send(data);
            }
        }).catch(err=>{
            res.status(500).send({message:"Error retreiving user with id " + id})
        })
    }else{
        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retreiving user info." });
            })
    }
}

//update a new identified user by user id
exports.update = (req, res) => {
    
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with ${id}. User wasn't found.` })
            }else{
                res.send(data);
            }
        }).catch(err=>{
            res.status(500).send({message: "Error updating user information."});
        })
}

//delete a user with specified use id in the request 
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndRemove({_id:id})
    .then(function(data){
        if(!data){
            res.status(404).send({message: `Cannot delete with id ${id}. Please check the id.`})
        }else{
            res.send({
                message: "User was deleted successfully!"
            })
            // res.send({type:'DELETE'})
        } 
    }).catch(err=>{
        res.status(500).send({
            message: "Could not delete user with id=" + id
        });
    }); 
};