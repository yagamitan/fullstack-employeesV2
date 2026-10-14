import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

const router = express.Router();

function validateEmployee(req, res, next) {
  if (!req.body) {
    return res.status(400).send("Request body is required.");
  }

  const { name, birthday, salary } = req.body;

  if (name === undefined || birthday === undefined || salary === undefined) {
    return res.status(400).send("Missing required employee field.");
  }

  next();
}

router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (error) {
    next(error);
  }
});

router.post("/", validateEmployee, async (req, res, next) => {
  try {
    const employee = await createEmployee(req.body);
    res.status(201).send(employee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);

    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const employee = await deleteEmployee(req.params.id);

    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateEmployee, async (req, res, next) => {
  try {
    const employee = await updateEmployee({
      id: req.params.id,
      ...req.body,
    });

    if (!employee) {
      return res.status(404).send("Employee not found.");
    }

    res.status(200).send(employee);
  } catch (error) {
    next(error);
  }
});

// TODO: this file!

export default router;
