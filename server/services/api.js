const dbConnect = require('./../database/db_connect');

exports.put = (req, res) => {

    update(req.params.name, req.params.id).then(() => {
        console.log(`Added a ${req.params.name} to id:${req.params.id}`);
        res.end();
    });
};

const update = async (name, id) => {

    let columnName = '';
    if (name === 'dead')
        columnName = 'dead';
    else if (name === 'like')
        columnName = 'local_likes';
    else
        throw new error("Error : like/dead counts not updating. Database string doesn't match PUT parameter. Check api function.");

    const queryString = `UPDATE deals SET ${columnName} = ${columnName} + 1 WHERE id=${id} ;`;

    await dbConnect.connect();
    await dbConnect.query(queryString);
    dbConnect.disconnect();
};