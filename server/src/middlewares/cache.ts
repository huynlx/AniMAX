// @ts-nocheck
import mcache from "memory-cache";

const DEFAULT_DURATION = 1800; // 30 minutes

const cache = (duration = DEFAULT_DURATION) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);

    if (cachedBody) return res.send(cachedBody);

    res.sendResponse = res.send;
    res.send = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };

    next();
  };
};

export default cache;
