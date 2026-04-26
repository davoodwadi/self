const fs = require("fs");
const path = require("path");

const dir = "src/app/(papers)/papers/tool-lab/_components";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  // Bump number="XX"
  content = content.replace(/number="(\d+)"/g, (match, num) => {
    const val = parseInt(num, 10);
    if (val >= 5) {
      changed = true;
      return `number="${(val + 1).toString().padStart(2, "0")}"`;
    }
    return match;
  });

  // Bump tag tags e.g. <span className="tag tag-violet">05</span>
  content = content.replace(
    /<span className="tag tag-violet">0?(\d+)<\/span>/g,
    (match, num) => {
      const val = parseInt(num, 10);
      if (val >= 5) {
        changed = true;
        return `<span className="tag tag-violet">${(val + 1).toString().padStart(2, "0")}</span>`;
      }
      return match;
    },
  );

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
