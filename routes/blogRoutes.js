const express = require('express');
const router = express.Router(); // create a router
const blogController = require('./../controllers/blogController')
// instead of using app.get use router.get

router.get('/create', blogController.createForm);

router.get('/:id', blogController.findById);

router.delete('/:id',blogController.deleteById);

// fetch all blogs
router.get('/', blogController.findAll);

router.post('/', blogController.create);

// export router, to use this in app
module.exports = router;