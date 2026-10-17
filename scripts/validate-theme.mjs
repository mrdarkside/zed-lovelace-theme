import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Ajv from "ajv";

const root = fileURLToPath(new URL("../", import.meta.url));
const schema = JSON.parse(
  await readFile(new URL("../schemas/zed-theme-v0.2.0.json", import.meta.url), "utf8"),
);
const ajv = new Ajv({ allErrors: true, strict: true });
const validate = ajv.compile(schema);
const requestedFiles = process.argv.slice(2);
const files = requestedFiles.length
  ? requestedFiles.map((file) => path.resolve(file))
  : (await readdir(path.join(root, "themes"), { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(root, "themes", entry.name))
      .sort();

if (files.length === 0) {
  console.error("No theme JSON files found in themes/.");
  process.exitCode = 1;
}

for (const file of files) {
  const label = path.relative(root, file);
  try {
    const theme = JSON.parse(await readFile(file, "utf8"));
    if (!validate(theme)) {
      console.error(`${label}: ${ajv.errorsText(validate.errors, { separator: "\n" })}`);
      process.exitCode = 1;
      continue;
    }
    console.log(`${label}: valid against Zed theme schema v0.2.0`);
  } catch (error) {
    console.error(`${label}: ${error.message}`);
    process.exitCode = 1;
  }
}
