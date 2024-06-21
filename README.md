# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## INSTALACIÓN

- 0.- Descargar el repositorio `git clone https://github.com/IrvingRodriguez/cenoteando-frontend.git`
- 1.- Instalas nodejs version 18.18.0 (Recomendación Usa NVM Node Version Manager para poder cambiar de versiones facilmente)
- 2.- Ubicarte dentro del proyecto e Instalar los paquetes Node Modules `npm install`
- 3.- Correr el proyecto con `npm run dev`

## Proceso para crear una Rama y crear un tarea

- 0.- Seleccionar la rama mas actualizada en este caso es dev `git checkout dev`
- 1.- Descargar y actualizar el branchar con los ultimos cambios `git fetch` y `git pull origin dev`
- 2.- Crear una nueva rama para desarrollar nuevas caracteristicas `git branch <Nombre Rama>` y seleccionar la rama `git checkout <Nombre Rama>`
- 3.- Ahora esta sera la Rama donde se realizara nuevas implementaciones

## Proceso para subir la rama

- 0.- Una vez terminada las implementaciones se debe guardar los cambios realizados `git add .`
- 1.- Subir los cambios de manera local `git commit -m "mensaje del commit" `
- 2.- Subir los cambios de manera remota `git push origin <Nombre Rama>`

## Proceso de unir los cambios realizados al branch de desarrollo dev (PRECAUCIÓN)

- 0.- Seleccionar la rama de desarrollo en este caso dev `git checkout dev `
- 1.- Usar el comando par aunir los cambios `git merge <Nombre de la rama que se desea unir a la de desarrollo>`
- 2.- Actualizar la rama dev `git push origin dev`
