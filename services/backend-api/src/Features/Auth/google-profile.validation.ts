import { z } from "zod";

export const GoogleOAuthUserSchema = z.object({
  provider: z.literal("google"),
  sub: z.string(),
  id: z.string(),
  displayName: z.string(),
  name: z.object({
    givenName: z.string(),
    familyName: z.string(),
  }),
  given_name: z.string(),
  family_name: z.string(),
  email_verified: z.boolean(),
  verified: z.boolean(),
  email: z.string().email(),
  emails: z.array(
    z.object({
      value: z.string().email(),
      type: z.string(),
    })
  ),
  photos: z.array(
    z.object({
      value: z.string().url(),
      type: z.string(),
    })
  ),
  picture: z.string().url(),
  _raw: z.string(),
  _json: z.object({
    sub: z.string(),
    name: z.string(),
    given_name: z.string(),
    family_name: z.string(),
    picture: z.string().url(),
    email: z.string().email(),
    email_verified: z.boolean(),
  }),
});
