import fs from "node:fs/promises";

// [0] = ruta de node
// [1] = ruta de este archivo
// [2] = nombre del archivo
// [3..] = contenido
const [, , action, file, ...rest] = process.argv;

const text = rest.join(" ");

async function createFile(file, text) {
  try {
    await fs.writeFile(file, text, "utf8");
    console.log(`Archivo "${file}" creado correctamente.`);
  } catch (error) {
    console.log(`No se pudo crear el archivo "${file}". Error ${error.message}`);
  }
}
// createFile(file, text);

async function readFileContent(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    console.log(data);
    console.log(`Archivo "${file}" leido.`);
  } catch (error) {
    console.log(`No se pudo leer el archivo "${file}". Error: ${error.message}`);
  }
}
// readFileContent(file);

async function updateFile(file, text) {
  try {
    await fs.writeFile(file, text, "utf8");
    console.log(`Archivo "${file}" modificado.`);
  } catch (error) {
    console.log(`No se pudo actualizar el archivo "${file}". Error: ${error.message}`);
  }
}
// updateFile(file, text);

async function removeFile(file) {
  try {
    await fs.unlink(file);
    console.log(`Archivo "${file}" eliminado`);
  } catch (error) {
    console.log(`No se pudo eliminar el archivo "${file}". Error: ${error.message}`);
  }
}
// removeFile(file);

if (!file) {
  console.log("Debes indicar el nombre del archivo.");
} else {
  switch ((action || "").toLowerCase()) {
    case "create":
      await createFile(file, text);
      break;
    case "read":
      await readFileContent(file);
      break;
    case "update":
      await updateFile(file, text);
      break;
    case "remove":
      await removeFile(file);
      break;

    default:
      console.log("No existe la acción. Usa: create, read, update o remove");
  }
}
