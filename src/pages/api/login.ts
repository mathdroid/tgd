import { loginHandler } from "@storyofams/next-password-protect";

export default loginHandler("_goods", {
  // Options go here (optional)
  cookieName: "next-password-protect",
});
