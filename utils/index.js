import { Buffer } from "buffer";
global.Buffer = Buffer;

export const token = Buffer.from(
  `noe.berenguer:Qv3bwll7iLsWrnhsjnH6ub9iPnOuy4yR0wFkLkxU/S8=`,
  "utf8"
).toString("base64");
