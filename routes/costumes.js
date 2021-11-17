var express = require('express');
const costumes_controlers= require('../controllers/costumes');
var router = express.Router();
/* GET costumes */
router.get('/', costumes_controlers.costumes_view_all_Page );
/* GET detail costumes page */
router.get('/detail', costumes_controlers.costumes_view_one_Page);
/* GET create costumes page */
router.get('/create', costumes_controlers.costumes_create_Page);
/* GET create update page */
router.get('/update', costumes_controlers.costumes_update_Page);
/* GET create costumes page */
router.get('/delete', costumes_controlers.costumes_delete_Page);


module.exports = router;
