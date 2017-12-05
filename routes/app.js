'use strict';

import express from 'express';
import places from './places';
import types from './types';
import users from './users';
import auth from './authentication';
import profile from './profile';
import publicRoute from './public';
const router = express();

router.use('/places', places);
router.use('/types', types);
router.use('/auth', auth);
router.use('/user', users);
router.use('/profile', profile);
router.use('/', publicRoute);

export default router;
