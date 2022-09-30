const process = require("process");
const execSync = require("child_process").execSync;
const fs = require("fs-extra");
const globalVars = require("./globalVars");

// This is for one repo. We have 5
const srcDir = `/Users/jasonschmitt/Desktop/Development/workstuff/css-repo-test/build/css`;
const destDir = `/Users/jasonschmitt/Desktop/Development/workstuff/NEW`;

try {
  // Change the directory
  // Have all the CSS FE repos located in one folder together, here we cd into them to build the latest css files
  process.chdir("../css-repo-test");
  console.log("directory has successfully been changed");
  console.log("now run command");
  console.log(globalVars);

  // import { execSync } from 'child_process';  // replace ^ if using ES modules

  const output = execSync("ls", { encoding: "utf-8" }); // the default is 'buffer'
  console.log("Output was:\n", output);

  // checkout the main branch (this will be the release branch)
  execSync("git checkout main", function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  // pull the latest from the main branch (this will be the release branch)
  execSync("git pull origin main", function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  // execute gulp command to build out files (can be command from npm package as well)
  execSync("gulp", function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  // Copy a folder or file
  try {
    fs.copySync(srcDir, destDir, { overwrite: true });
    console.log("success! File was copied from srcDir to destDir");
  } catch (err) {
    console.error(err);
  }
} catch (err) {
  // Printing error if occurs
  console.error("error . . .");
}
