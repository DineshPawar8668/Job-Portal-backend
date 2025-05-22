const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { applyJob, getApplicants } = require('../controllers/applicationController');

router.post('/:id', auth, role('jobseeker'), applyJob);
router.get('/:id', auth, role('employer'), getApplicants);

module.exports = router;