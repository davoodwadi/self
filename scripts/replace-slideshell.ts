import { Project, SyntaxKind, JsxElement } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
project.addSourceFilesAtPaths(
  "src/app/(papers)/papers/tool-lab/_components/**/*.tsx",
);

const allFiles = project.getSourceFiles();
const files = allFiles.filter((f) =>
  f.getFilePath().includes("/papers/tool-lab/_components/"),
);
console.log(`Found ${files.length} files`);

function getAttrSrc(element: JsxElement, name: string) {
  const attr = element.getOpeningElement().getAttribute(name);
  if (!attr) return null;
  if (attr.getKind() === SyntaxKind.JsxAttribute) {
    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    const init = jsxAttr.getInitializer();
    return init ? init.getText() : null;
  }
  return null;
}

function getExprSrc(element: JsxElement, name: string) {
  const attr = element.getOpeningElement().getAttribute(name);
  if (!attr) return null;
  if (attr.getKind() === SyntaxKind.JsxAttribute) {
    const jsxAttr = attr.asKindOrThrow(SyntaxKind.JsxAttribute);
    const init = jsxAttr.getInitializer();
    if (!init) return null;
    if (init.getKind() === SyntaxKind.JsxExpression) {
      return (
        init
          .asKindOrThrow(SyntaxKind.JsxExpression)
          .getExpression()
          ?.getText() || null
      );
    }
    return init.getText();
  }
  return null;
}

for (const file of files) {
  let changed = false;

  // Find all JsxElements
  const jsxElements = file.getDescendantsOfKind(SyntaxKind.JsxElement);

  // Iterate in reverse to avoid breaking AST node references when replacing
  for (const element of jsxElements.reverse()) {
    const opening = element.getOpeningElement();
    const tagName = opening.getTagNameNode().getText();

    if (tagName === "SlideShell") {
      const idSrc = getAttrSrc(element, "id");
      const idAttr = idSrc ? `id=${idSrc}` : "";

      const clsExpr = getExprSrc(element, "className");
      const classNameAttr = clsExpr
        ? `className={\`tl-slide \${${clsExpr}}\`.trim()}`
        : `className="tl-slide"`;

      const numberSrc = getAttrSrc(element, "number");
      const numberBlock = numberSrc
        ? `<span className="tag tag-violet">${numberSrc.startsWith("{") ? numberSrc : `{${numberSrc}}`}</span>`
        : "";

      const eyebrowSrc = getAttrSrc(element, "eyebrow");
      const eyebrowBlock = eyebrowSrc
        ? `<span className="tag tag-muted">${eyebrowSrc.startsWith("{") ? eyebrowSrc : `{${eyebrowSrc}}`}</span>`
        : "";

      const titleSrc = getAttrSrc(element, "title");
      const titleBlock = titleSrc
        ? `<h2 className="p-heading tl-title">${titleSrc.startsWith("{") ? titleSrc : `{${titleSrc}}`}</h2>`
        : "";

      const messageSrc = getAttrSrc(element, "message");
      const messageBlock = messageSrc
        ? `<p className="p-body tl-message">${messageSrc.startsWith("{") ? messageSrc : `{${messageSrc}}`}</p>`
        : "";

      const childrenText = element
        .getJsxChildren()
        .map((c) => c.getText())
        .join("");

      const sectionStart = `<section${idAttr ? ` ${idAttr}` : ""} ${classNameAttr}>`;

      const replacement = `${sectionStart}
      <div className="tl-slide-inner">
        <div className="tl-two-col">
          <div>
            <div className="tl-kicker">
              ${numberBlock}
              ${eyebrowBlock}
            </div>
            ${titleBlock}
            ${messageBlock}
          </div>
          <div>
            ${childrenText}
          </div>
        </div>
      </div>
    </section>`;

      element.replaceWithText(replacement);
      changed = true;
    }
  }

  if (changed) {
    // Remove SlideShell from imports
    const importDecls = file.getImportDeclarations();
    for (const importDecl of importDecls) {
      const namedImports = importDecl.getNamedImports();
      for (const namedImport of namedImports) {
        if (namedImport.getName() === "SlideShell") {
          namedImport.remove();
        }
      }
      // If no named imports left and no default import, remove the whole declaration
      if (
        importDecl.getNamedImports().length === 0 &&
        !importDecl.getDefaultImport()
      ) {
        importDecl.remove();
      }
    }

    // Format the file
    file.formatText();
    file.saveSync();
    console.log(`Updated ${file.getBaseName()}`);
  }
}

console.log("Done.");
