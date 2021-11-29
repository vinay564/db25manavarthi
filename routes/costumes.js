var express = require('express');
const costumes_controlers= require('../controllers/costumes');
var router = express.Router();
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 

/* GET costumes */
router.get('/', costumes_controlers.costumes_view_all_Page );
/* GET detail costumes page */
router.get('/detail', costumes_controlers.costumes_view_one_Page);
/* GET create costumes page */
router.get('/create', secured, costumes_controlers.costumes_create_Page);
/* GET create update page */
router.get('/update',secured, costumes_controlers.costumes_update_Page);
/* GET create costumes page */
router.get('/delete', secured, costumes_controlers.costumes_delete_Page);


module.exports = router;
