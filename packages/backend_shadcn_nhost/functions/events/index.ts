/* eslint-disable import/no-anonymous-default-export */
import { Request, Response } from "express";
import { EventResponse } from "../_utils/types/events";

export default async (req: Request, res: Response) => {
  // Check if the request comes from our backend
  if (
    req.headers["nhost-webhook-secret"] !== process.env.NHOST_WEBHOOK_SECRET
  ) {
    return res.status(401).send("Unauthorized");
  }
  let out: EventResponse = {
    message: "",
    status: 200,
  };
  const { name: cronName } = req.body;
  if (cronName) {
    // cron events
    switch (cronName) {
      // case "eventCheck":
      //   out = await eventCheckHandler(req.body);
      //   break;

      default:
        break;
    }
  } else {
    //table events
    const { name } = req.body.trigger;
    switch (name) {
      // case "createUser":
      //   out = await createUserHandler(req.body);
      //   break;

      default:
        console.log(req.body);
        break;
    }
  }

  res.status(out.status).json(out);
};
