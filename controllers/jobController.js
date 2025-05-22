const Application = require("../models/Application");
const Job = require("../models/Job");
const mongoose = require("mongoose");

exports.createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, employer: req.user._id });
  console.log(job);
  res.status(201).json(job);
};

exports.getOwnJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      employer: new mongoose.Types.ObjectId(req.user._id),
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching own jobs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const jobs = await Job.find();
    const jobsWithAppliedStatus = await Promise.all(
      jobs?.map(async (job) => {
        const applied = await Application.exists({
          job: job._id,
          applicant: userId,
        });

        return {
          ...job.toObject(),
          applied: !!applied,
        };
      })
    );

    res.status(200).json(jobsWithAppliedStatus);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ msg: "Job deleted" });
};
