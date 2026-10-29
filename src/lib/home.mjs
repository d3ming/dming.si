import { z } from "zod";

export const SITE_URL = "https://dming.si";

const text = z.string().trim().min(1);
const url = z.url().refine((value) => new URL(value).protocol === "https:", {
  message: "Public links must use HTTPS",
});

export const homeSchema = z
  .strictObject({
    name: text.max(50),
    handle: text.max(30),
    description: text.max(160),
    projects: z
      .array(
        z.strictObject({
          id: z.string().regex(/^[a-z][a-z0-9-]*$/),
          name: text.max(30),
          description: text.max(100),
          url,
        }),
      )
      .min(1)
      .max(6),
    socials: z
      .array(
        z.strictObject({
          id: z.string().regex(/^[a-z][a-z0-9-]*$/),
          label: text.max(30),
          url,
        }),
      )
      .min(1)
      .max(6),
  })
  .superRefine((home, ctx) => {
    if (!home.socials.some((link) => link.id === "x")) {
      ctx.addIssue({
        code: "custom",
        message: "The heading needs an X profile link",
      });
    }
    const ids = [...home.projects, ...home.socials].map((link) => link.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: "custom", message: "Link IDs must be unique" });
    }
  });
