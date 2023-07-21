const express = require('express');
const router = express.Router();

const {
    registration,
    verifyEmail,
    resendEmailVerification,
    logIn,
    getAll,
    getOne,
    updateUser,
    deleteUser,
    signOut,
    allLoginUsers
} = require('../controllers/userController')
const {
    upgradeUserToAdmin,
    upgradeUserToSuperAdmin,
  } = require('../controllers/isAdminControlle.js');
const {
    userAuth,
    isAdmin,
    isSuperAdmin
} = require('../middlewares/authMiddleware')

router.post('/signup', registration)
router.put('/verify/:id/:token', verifyEmail)
router.put('/re-verify', resendEmailVerification)
router.post('/login', logIn)
router.get('/getAll',getAll)
router.get('/getOne/:id',getOne)
router.get('/deleteUser/:id',deleteUser)
router.put("/update-user/:userId", userAuth, updateUser);
router.put("/upgrade-to-admin/:userId", userAuth, isAdmin, upgradeUserToAdmin);
router.put("/upgrade-to-superadmin/:userId",userAuth,isSuperAdmin,upgradeUserToSuperAdmin);
router.put('/logout/:id', signOut)
router.get('/loginusers', allLoginUsers)

module.exports = router;

