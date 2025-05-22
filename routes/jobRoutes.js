const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { createJob, getJobs, updateJob, deleteJob, getOwnJobs } = require('../controllers/jobController');

router.post('/', auth, role('employer'), createJob);
router.get('/my/jobs', auth, getOwnJobs);
router.get('/',auth, getJobs);
router.put('/:id', auth, role('employer'), updateJob);
router.delete('/:id', auth, role('employer'), deleteJob);

module.exports = router;
