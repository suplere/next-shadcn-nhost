import { Request, Response } from "express";
import {
  CreateUserIdOutput,
  NoticeAttendanceOutput,
} from "../_utils/types/actions";

export default async (req: Request, res: Response) => {
  // Check if the request comes from our backend
  if (
    req.headers["nhost-webhook-secret"] !== process.env.NHOST_WEBHOOK_SECRET
  ) {
    return res.status(401).send("Unauthorized");
  }
  // console.log(req.body);
  const { name } = req.body.action;

  let result: NoticeAttendanceOutput | CreateUserIdOutput | {};

  switch (name) {
    // case "noticeAttendace":
    //   const params: noticeAttendaceArgs = req.body.input;
    //   result = await noticeAttendaceHandler(params);
    //   break;

    default:
      result = {};
      break;
  }

  res.status(200).json(result);
};
