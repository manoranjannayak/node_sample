import {
    Router
} from 'express';
import userController from '../controllers/user.controller';
import authValidator from '../validation/auth';
import jwtValidator from '../../middlewares/jwtValidation';
import uploadFile from '../../utils/uploadFile';

const validator = require('express-joi-validation').createValidator({});

const router = Router();

router.post('/login', validator.body(authValidator.login), userController.login);
router.post('/register',uploadFile.userUploads , userController.register);


module.exports = router;