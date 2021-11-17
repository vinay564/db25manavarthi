var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var costumes_controller = require('../controllers/costumes');
/// API ROUTE ///
// GET resources base.
router.get('/resource', api_controller.api);
/// costumes ROUTES ///
// POST request for creating a costumes.
router.post('/resource/costumes', costumes_controller.costumes_create_post);
// DELETE request to delete costumes.
router.delete('/resource/costumes/:id', costumes_controller.costumes_delete);
// PUT request to update costumes.
router.put('/resource/costumes/:id', costumes_controller.costumes_update_put);
// GET request for one costumes.
router.get('/resource/costumes/:id', costumes_controller.costumes_detail);
// GET request for list of all costumes items.
router.get('/resource/costumes', costumes_controller.costumes_list);
module.exports = router;