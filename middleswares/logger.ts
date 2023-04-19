import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next:NextFunction) => {
  console.log(`${new Date()} ${req.method} ${req.path}`)
  next()
}

export default logger;