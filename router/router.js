const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();
router.get("/", (req, res) => {
  Employee.find().exec((err, doc) => {
    if (err) console.log(err);

    res.render("index", { employees: doc });
  });
});

router.get("/addform", (req, res) => {
  res.render("form");
});

router.get("/manage", (req, res) => {
  Employee.find().exec((err, doc) => {
    if (err) console.log(err);
    res.render("manage", { employees: doc });
  });
});

router.get("/delete/:id", (req, res) => {
  // console.log(req.params.id)

  Employee.findByIdAndDelete({ _id: req.params.id }).exec((err) => {
    if (err) console.log(err);
    res.redirect("/manage");
  });
});

router.post("/insert", (req, res) => {
  //console.log(req.body)
  const employee = new Employee({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    salary: req.body.salary,
    department: req.body.department,
  });
  Employee.saveEmployee(employee, (err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

router.post("/edit", (req, res) => {
  //console.log(req.body.edit_id);
  Employee.findOne({ _id: req.body.edit_id }).exec((err, doc) => {
    if (err) console.log(err);
    res.render("edit", { employee: doc });
  });
});

router.post("/update", (req, res) => {
  const update_id = req.body.update_id;
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    salary: req.body.salary,
    department: req.body.department,
  };

  Employee.findByIdAndUpdate(update_id, data, { useFindAndModify: false }).exec(
    (err) => {
      if (err) console.log(err);
    }
  );
  res.redirect("/manage");
});

module.exports = router;
