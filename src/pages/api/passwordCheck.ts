import { passwordCheckHandler } from "@storyofams/next-password-protect";

export default passwordCheckHandler("_goods", {
  // Options go here (optional)
  cookieName: "next-password-protect",
});
