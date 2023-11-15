const express = require('express');
const {
    readController,
    createController,
    updateController,
    deleteController,
    registerController,
    loginController
} = require("../controllers/controllers");
const router = express.Router();

//-----------------CRUD routes----------------//

router.post('/api/create', createController)

router.get('/api/read', readController)

router.put('/api/update', updateController)

router.delete('/api/delete', deleteController)

//-----------------Auth routes----------------//


router.post('/api/register', registerController)

router.post('/api/login', loginController)

module.exports = router;