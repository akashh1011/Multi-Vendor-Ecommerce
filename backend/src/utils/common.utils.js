import slugify from "slugify";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 10);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getSlug = (text) => {
  return slugify(text.toLowerCase(), { strict: true }) + "-" + nanoid();
};

export { sleep, getSlug };
