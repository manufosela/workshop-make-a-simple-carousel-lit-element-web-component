# Web-component `simple-carousel`
Ejercicio de como convertir un `carousel de imagenes` hecho con Vanilla Javascript en un web-component refactorizando, añadiendo funcionalidad y caracteristicas y haciendolo accesible e indexable por buscadores.


## Paso 0
Lo primero será clonar el repositorio y colocarse en la rama paso1.

```
$ git clone https://github.com/manufosela/simple-carousel.git
$ cd simple-carousel
$ git checkout paso0
```

Aquí aún no tenemos el `web-component`, si no solamente el carousel en vanilla javascript.

Para probarlo necesitaremos algún servidor de estaticos.
Si tienes instalado Python 2.X en tu equipo, puedes poner:
```
$ python -m SimpleHTTPServer 8081
```
Entonces abre un navegador y pon ```localhost:8081```

O también puedes usar la extensión de chrome ["Chrome web server"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Puedes ver que este código funciona, pero a nivel de semantica de etiquetas y de funciones javscript se podría mejorar, pero es un buen MVP y punto de partida.


## Paso 1
Para ir al paso uno, hacemos checkout de la rama `paso1`
```
$ git checkout paso1
$ npm install
```

Aquí ya tenemos un `web-component` con una estructura de directorios y las dependencias necesarias para desarrollar el mismo.

Para usar el mismo código del paso 0, se ha metido todo el contenido del fichero `styles.css` en el fichero `/src/simple-carousel-style.js` para poder importarlo desde el `web-component`

Todo el HTML de la etiqueta `<body>` del fichero `index.html` se ha metido dentro del fichero `/src/SimpleCarousel.js` y dentro del método `render`

Las funciones de `carousel.js` se ha añadido como métodos dentro del componente en el fichero `/src/SimpleCarousel.js`

Ahora si ejecutamos:
```
$ npm run start
```

Veremos como arranca un navegador y nos muestra exactamente el mismo carrusel de imagenes a nivel de funcionalidad.
Sin embargo, si desde las `Dev Tools` accedemos a la composición de la página (tab `Elments`), veremos que ahora todo el HTML del carrusel está encapsulado en el `shadow-dom`, quedando innacesible para su indexación.

## Paso 2

Para obtener el código del paso 2 hacemos checkout de la rama paso2
```
$ git checkout paso2
```

Cambios realizados:
- SimpleCarousel.js
  - Añadimos:
    - `imageList`, como atributo, para poder pasar en la declaración del componente la lista de imagenes
    - `numImages`, como propiedad, para obtener el número de imagenes que se cuentan a partir de `imageList`
    - `imagePath`, como propiedad, para guardar la ruta de las imagenes y no tener que ponerla en cada imagen en `imageList`.
  - En el método `firstUpdated` obtenemos el array de imagenes que guardamos en la propiedad `images` a partir del atributo `imageList`. Así mismo obtenemos la logitud del array de la propiedad `images` que almacenamos en la propiedad `numImages`
  - Creamos el método `_cicleSpan` para renderizar la navegación de las imagenes a partir del número de imagenes (circulitos de abajo) y eliminamos los tag `<span>`
- 


2.1.- Ejercicio: Convertir la propiedad imagePath en atributo 


## Paso 3

Para obtener el código del paso 3 hacemos checkout de la rama paso3
```
$ git checkout paso3
```

En este paso los cambios realizados en `SimpleCarousel.js` son:
- Hemos refactorizado los métodos para optimizar el funcionamiento, quitando por ejemplo el método `getCurrentImageIndex` y añadiendo una propiedad `currentIndex`
- Se ha añadido los comentarios necesarios para documentar las propiedades del componente.
- Se ha añadido dos nuevas propiedades, `descriptions` y `description` que contiene la lista de descripciones de las imagenes y la descripción actual visible, respectivamente.
- Para obtener las descripciones se ha creado el método `getDescriptions` que toma de un slot llamado *descriptions* en la declaración del componente.
Dicho método es llamado en el método del ciclo de vida del componente `connectedCallbak` para tener dichos datos antes de cualquier renderizado.

En los estilos `simple-carousel-style.js` se ha añadido estilos para las descripciones de las imagenes

3.1- Se te ocurre alguna otra refactorización que mejore o simplifique el código

## Paso 4

Para obtener el código del paso 4 hacemos checkout de la rama paso4
```
$ git checkout paso4
```

Tener las imágenes en un atributo, dificultan la inserción de las mismas y quedan ocultas a la indexación para el SEO.
Refactorizamos de manera que las imagenes ahora se declaran al declarar el componente.
Necesitamos cambiar la estructura de datos para guardar imagenes y descripciones en un objeto.
Creamos el método `getCarouselData` para recuperar del DOM la estructura imagen-descripción y almacenarlo en la propiedad `carouselData`, que es un objeto con las propiedades `image` y `description`

## Paso 5

Para obtener el código del paso 5 hacemos checkout de la rama paso5
```
$ git checkout paso5
```
En este paso hacemos mas accesible el componente:
- Mejoramos semantica, quitando por ejemplo span por buttons en la navegación de los puntos.
- Añadimos los tabindex
- Hacemos que funcione con teclado mediante enter.

## Paso 6

Para obtener el código del paso 6 hacemos checkout de la rama paso6
```
$ git checkout paso6
```

En este paso añadimos funcionalidad para que las imagenes se pasen solas y un botón para activar y desactivar dicho autoplay.

## master

En la rama master, ya está el componente terminado y donde se han hecho diferentes refactors y mejoras para garantizar el correcto funcionamiento del componente.


## Author
**manufosela**

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

## Generated

**generator-lit-element-base** - *yeoman npm package* - by [@manufosela](https://github.com/manufosela/generator-litelement-webcomponent)