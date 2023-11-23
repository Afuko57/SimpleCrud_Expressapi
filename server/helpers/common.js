// helpers/common.js
const handleErrorResponse = (res, err) => {
  return res.json({ message: "Something unexpected has occurred" + err });
};

module.exports = {
  handleErrorResponse,
};
