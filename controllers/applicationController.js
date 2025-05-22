const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyJob = async (req, res) => {
  const { id } = req.params;
  const application = await Application.create({ job: id, applicant: req.user._id });
  res.status(201).json(application);
};

exports.getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).select("title description company location type");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applications = await Application.find({ job: jobId }).populate("applicant", "name email");

    const applicants = applications.map((app) => ({
      _id: app.applicant._id,
      name: app.applicant.name,
      email: app.applicant.email,
    }));

    res.json({
      job,
      applicants,
    });

  } catch (error) {
    console.error("Error in getApplicants:", error);
    res.status(500).json({ message: "Server error" });
  }
};