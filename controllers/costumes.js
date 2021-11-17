var Costumes = require('../models/costumes');
// List of all costumess
exports.costumes_list = function (req, res) {
    res.send('NOT IMPLEMENTED: costumes list');
};
// for a specific costumes.
// for a specific costumes.
exports.costumes_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Costumes.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };
// Handle costumes create on POST.
exports.costumes_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Costumes();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costumes_type":"regular", "size":13, "cost":43.56}
    document.costumes_type = req.body.costumes_type;
    document.size = req.body.size;
    document.cost = req.body.cost;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle costumes delete on DELETE.
exports.costumes_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Costumes.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };
// Handle costumes update form on PUT.
exports.costumes_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await Costumes.findById( req.params.id)
 // Do updates of properties
 if(req.body.costumes_type)
 toUpdate.costumes_type = req.body.costumes_type;
 if(req.body.size) toUpdate.size = req.body.size;
 if(req.body.cost) toUpdate.cost = req.body.cost;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
};

// List of all costumess
exports.costumes_list = async function (req, res) {
    try {
        theCostumes = await Costumes.find();
        res.send(theCostumes);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// VIEWS
// Handle a show all view
exports.costumes_view_all_Page = async function (req, res) {
    try {
        theCostumes = await Costumes.find();
        res.render('costumes', {
            title: 'costumes Search Results',
            results: theCostumes
        });
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle a show one view with id specified by query
exports.costumes_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Costumes.findById( req.query.id)
    res.render('costumesdetail',
   { title: 'costumes Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
// Handle building the view for creating a costumes.
// No body, no in path parameter, no query.
// Does not need to be async
exports.costumes_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('costumescreate', { title: 'costumes Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

// Handle building the view for updating a costumes.
// query provides the id
exports.costumes_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Costumes.findById(req.query.id)
    res.render('costumesupdate', { title: 'costumes Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
// Handle a delete one view with id from query
exports.costumes_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Costumes.findById(req.query.id)
    res.render('costumesdelete', { title: 'costumes Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };