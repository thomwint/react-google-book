const db = require("../models");

module.exports = {
  remove: function (req, res) {
    const savedId = req.params.id;

    db.Saved
      .findById({ _id: savedId })
      .then(dbsaved => {
        db.Book
          .findByIdAndUpdate(
            dbsaved.book,
            { $pull: { saved: savedId } },
            { new: true }
          )
          .then(() => {
            db.Saved
              .findByIdAndRemove(savedId, (error, removedSaved) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(`Removed: ${removedSaved}`);
                };
              });
          });
      })
      .catch(err => res.status(422).json(err));
  }
};
