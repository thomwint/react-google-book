const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Book
      .find(req.query)
      .populate("saved")
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
      .populate("saved")
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Book
      .create(req.body)
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  },
  addSaved: function (req, res) {
    const { id } = req.params;
    db.Saved.create(req.body)
      .then(dbSavedBook => db.Book.findByIdAndUpdate(id,
        { $push: { saved: dbSavedBook._id } },
        { new: true })
      )
      .then(updatedArticle => {
        res.json(updatedArticle);
      })
      .catch(error => {
        res.json(error);
      })
  },
  remove: function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbBook => dbBook.remove())
      .then(dbBook => res.json(dbBook))
      .catch(err => res.status(422).json(err));
  }
};
