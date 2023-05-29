import jwt from "jsonwebtoken";
import adminModel from "../models/Admin.js";
import userModel from "../models/User.js";
/**
 * @description multi-role authentication middleware. In order to work, it needs these headers
 * {id: `${objectId}`, authorization: `Bearer ${jwt token}`, role: "admin"||"superAdmin"||"user"}
 * @param {Array} role
 * @param {object} req
 *
 */
export const authorize = (role = []) => {
  return [
    (req, res, next) => {
      try {
        let token = req.headers.authorization.split(" ")[1] || "none";
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
          return res
            .status(401)
            .json({ error: true, message: "You are not logged in" });
        }
      } catch (error) {
        return res
          .status(401)
          .json({
            error: true,
            message: "We faced a problem checking your logged session",
          });
      }
      try {
        let reqRole = req.headers.role || "none";
        if (role.includes(reqRole)) {
          if (reqRole === "admin" || reqRole === "superAdmin") {
            let id = req.headers.id || "none";
            adminModel.find({ _id: id }).then(
              function (success) {
                let admin = success;
                if (success.length === 0) {
                  res
                    .status(401)
                    .send({
                      error: true,
                      message: "No admin matching requested credentials",
                    });
                } else {
                  let adminRole;
                  admin[0].isSuper
                    ? (adminRole = "superAdmin")
                    : (adminRole = "admin");
                  if (!role.includes(adminRole)) {
                    return res.status(403).send({
                      message: "Access Denied. You can't access this page",
                    });
                  } else if (role.includes(adminRole)) {
                    next();
                  }
                }
              },
              function (reject) {
                return res
                  .status(401)
                  .send({
                    error: true,
                    message: "There is a problem checking credentials",
                  });
              }
            );
          } else if (reqRole === "user") {
            try {
              let id = req.headers.id || "none";
              userModel.find({ _id: id }).then(
                function (success) {
                  if (success.length === 0) {
                    res
                      .status(401)
                      .send({
                        error: true,
                        message: "No user matching requested credentials",
                      });
                  } else {
                    next();
                  }
                },
                function (reject) {
                  res
                    .status(401)
                    .send({
                      error: true,
                      message: "There is a problem checking credentials",
                    });
                }
              );
            } catch (error) {
              return res
                .status(400)
                .send({
                  error: true,
                  message: "There is a problem checking credentials",
                });
            }
          }
        } else {
          return res.status(403).send({
            message: "Access Denied. You can't access this page",
          });
        }
      } catch (e) {
        return res
          .status(501)
          .send({
            error: true,
            message: "There is a problem checking your credentials",
          });
      }
    },
  ];
};
export default authorize;
