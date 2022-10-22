const Messages = require("../model/message.model");

async function getAllMessage(req, res) {
  // const addMessage = new Messages({
  //   message: "some message",
  //   isSeen: 0,
  //   json: { uniqueId: 1, label: "some label", text: "some text" },
  // });
  // addMessage
  //   .save()
  //   .then((res1) => {
  Messages.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("api error", err);
    });
  // })
  // .catch((err) => {
  //   res.send(err);
  //   console.log("api error", err);
  // });
}
const isJsonValid = (o, StrictFields = ["uniqueId", "label", "text"]) => {
  try {
    if (
      Object.keys(o) &&
      Object.keys(o).length > 0 &&
      Object.keys(o).every((i) => StrictFields.includes(i))
    ) {
      return o;
    }
  } catch (e) {}

  return false;
};

// this api is to update the seen status
async function postMarkSeen(req, res) {
  const userMessageId = req.body;
  // Messages.update(
  //   { _id: userMessageId },
  //   {
  //     isSeen: 1,
  //   }
  // );

  Messages.findByIdAndUpdate(userMessageId, {
    isSeen: 1,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("api error", err);
      res.status(400).json(err);
    });
}

// this api is to update the json in the db
async function postUpdatedJson(req, res) {
  const userUpdatedJson = req.body;
  // if (isJsonValid(userUpdatedJson)) {
  Messages.findByIdAndUpdate({ _id: userUpdatedJson._id }, userUpdatedJson)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("api error", err);
      res.status(400).json(err);
    });
  // } else {
  //   res.status(400).json({ error: "invalid json" });
  // }
}
module.exports = {
  getAllMessage: getAllMessage,
  postMarkSeen: postMarkSeen,
  postUpdatedJson: postUpdatedJson,
};
// export { getAllMessage, postMarkSeen };
