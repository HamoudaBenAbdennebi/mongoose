const express = require("express");
const router = express.Router();
const User = require("../models/Users");

router.post("/add", function (req, res) {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.get("/", function (req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/user/:id", function (req, res) {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  var food = req.body.favotiteFood;
  console.log(food);
  const person = await User.findOne({ _id: id });
  await person.updateOne({ favotiteFood: food });
  await person.save();
  // await data.save();
  res.send(person);
  // await data.favotiteFoods.push(food).save();
});
router.delete("/delete/:id", function (req, res, next) {
  const { id } = req.params;

  User.findByIdAndRemove({ _id: id }, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.delete("/deletemany", (req, res, next) => {
  User.remove(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});
router.get("/search", async (req, res) => {
  console.log("here is the request");
  const query = req.query;
  console.log("query", query);

  const search = await User.find(query);
  console.log(search);
  res.send(search);
});
module.exports = router;
