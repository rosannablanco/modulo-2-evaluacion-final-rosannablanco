# Módulo-2-evaluación-final-rosannablanco

El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite
des/marcar las series como favoritas y guardarlas en local storage.

## Requisitos

Necesitas tener instalado [Node.js](https://nodejs.org/) y [Gulp](https://gulpjs.com) para trabajar.

## Iniciar proyecto

1. Descarga o clona el repositorio
2. Instala las dependencias locales con `npm install`
3. Arranca el kit con `npm start`
4. Se ejecuta la página

## Diagrama de flujo

![Web serie](_src/assets/images/flujo-search-movie.png)

## Cómo funciona

1. Introducir título de serie en el campo de texto.
2. Click en el botón buscar.
3. Se muestra un listado de series que coincide con el título introducido en el campo de texto.
4. Desde el listado de series puedes añadir/borrar favoritos.
5. Al añadir favoritos se muestra a la izquierda un listado de las series favoritas que vas añadiendo desde el listado serie.
6. Puedes borrar favoritos desde el listado de las series como en el listado de favoritos.
7. Si haces una nueva búsqueda, el listado favorito continuará mostrándose en la pantalla y las series que ya esten en el listado favoritos se mostrará con una clase de estilos diferente.
