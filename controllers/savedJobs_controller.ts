import express, { Request, Response } from "express";
import SavedJob from "../models/SavedJob";
import JobDto from "../dto/JobDto";

const router = express.Router();
router.post("/", (req: Request, res: Response) => {
  const { title, description, location, url, company } = req.body[0] as JobDto;
  const email: string = req.body[1];

  SavedJob.create(title, description, location, url, email, company).then(
    (job: JobDto) => {
      if (!job) return res.status(400).send({ error: "Something went wrong" });
      return res.json(job);
    }
  );
});

router.get("/:email", (req: Request, res: Response) => {
  const email: string = req.params.email;
  SavedJob.findAll(email).then((jobs: JobDto[]) => {
    if (jobs.length === 0)
      return res.status(400).send({ error: "No saved jobs" });
    return res.json(jobs);
  });
});

router.get("/:email/:description", (req: Request, res: Response) => {
  const { email, description } = req.params;

  SavedJob.findJob(email, description).then((jobs: JobDto[]) => {
    if (!jobs) {
      res.status(400).send({ error: "this job has not been saved yet" });
    }
    return res.json(jobs);
  });
});

router.delete("/:description", (req: Request, res: Response) => {
  const description: string = req.params.description;

  SavedJob.delete(description).then(() =>
    res.json({ message: "Successful deleted" })
  );
});

export default router;
