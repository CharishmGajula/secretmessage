import zod from "zod";

const message_checker = zod.object({
  message: zod
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(120, { message: "Message can't be more than 120 characters." }),

  summary:zod
    .string()
    .max(20),
});


export default message_checker;