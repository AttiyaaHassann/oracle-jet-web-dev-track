// /**
//   Copyright (c) 2015, 2026, Oracle and/or its affiliates.
//   Licensed under The Universal Permissive License (UPL), Version 1.0
//   as shown at https://oss.oracle.com/licenses/upl/

// */

// "use strict";
// const fs = require("fs");
// const archiver = require("archiver");

// module.exports = function (configObj) {
//   return new Promise((resolve, reject) => {
//     console.log("Running after_build hook.");

//     const output = fs.createWriteStream("my-archive.zip");
//     const archive = archiver("zip", { zlib: { level: 9 } });

//     output.on("close", () => {
//       console.log(`✅ [SUCCESS] Archive created: my-archive.zip (${archive.pointer()} bytes)`);
//       resolve(configObj);
//     });

//     archive.on("warning", (err) => {
//       if (err.code === "ENOENT") {
//         console.warn("⚠️  [WARNING] Archive warning:", err.message);
//       } else {
//         reject(err);
//       }
//     });

//     archive.on("error", (err) => {
//       console.error("❌ [ERROR] Archive error:", err.message);
//       reject(err);
//     });

//     archive.pipe(output);
//     archive.directory("web", false);
//     archive.finalize();

//     console.log("✅ [STEP 2] Archiving 'web' directory → my-archive.zip ...");
//   });
// };


"use strict";

module.exports = function (configObj) {
  console.log("Running after_build hook (archiving disabled).");
  return Promise.resolve(configObj);
};