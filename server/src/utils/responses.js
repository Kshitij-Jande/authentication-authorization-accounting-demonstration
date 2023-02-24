// export const isValidToken = async (req) => {
//     const token = req.headers['x-access-token'];
//     if (!token)
//         // return res.status(400).json({ status: false, msg: "Unauthorized." });
//         return false
//     try {
//         var decoded = await jwt.verify(token, process.env.SECRET_KEY);
//     } catch (err) {
//         // console.log(err);
//         // return res.status(400).json({ status: false, msg: "Unauthorized." });
//     }
// }

const unauthorizedResponse = (res) => {
  res.status(401).json({ status: false, msg: "Unauthorized." });
};

const internalErrorResponse = (res) => {
  res.status(500).json({ status: false, msg: "An internal error occured." });
};

module.exports = { unauthorizedResponse, internalErrorResponse };
