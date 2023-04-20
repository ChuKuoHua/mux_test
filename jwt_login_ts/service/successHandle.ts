import { Request, Response, NextFunction } from 'express';
function successHandle(res: Response, data: string[]) {
  res.status(200).send({
    "status": "success",
    data
  });
}

module.exports = successHandle