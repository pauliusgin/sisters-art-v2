import {Response} from "express";

export function UnAuthorizedAction(res: Response) {
  return res.status(403).send({
    message: "You are not authorized to perform this action"
  })
}
