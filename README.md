# Web-component `simple-carousel`

Ejercicio de como convertir un `carousel de imagenes` hecho con Vanilla Javascript en un web-component refactorizando, añadiendo funcionalidad y caracteristicas y haciendolo accesible e indexable por buscadores.

## Paso 1

Lo primero será clonar el repositorio y colocarse en la rama paso1.

```
$ git clone https://github.com/manufosela/simple-carousel.git
$ cd simple-carousel
$ git checkout paso1
```

Aquí aún no tenemos el `web-component`, si no solamente el carousel en vanilla javascript.
Para probarlo necesitaremos algún servidor de estaticos, como la extensión de chrome ["Chrome web server"](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Este código funciona, pero a nivel de semantica de etiquetas y de funciones se podría mejorar, pero es un buen MVP y punto de partida.

## Paso 2

Para ir al paso dos, hacemos checkout de la rama `paso2`
```
$ git checkout paso2
```

Aquí ya tenemos un `web-component` con una estructura de carpetas y las dependencias necesarias para desarrollar el mismo.

Se ha metido todo el css en `/src/simple-carousel-style.js` para poder importarlo en el `web-component`

El HTML se ha metido dentro del método `render` en `/src/SimpleCarousel.js`

Las funciones se ha añadido como métodos dentro del componente en `/src/SimpleCarousel.js`

Ahora si ejecutamos:
```
$ npm run start
```

Veremos como arranca un navegador y nos muestra exactamente el mismo carrusel de imagenes a nivel de funcionalidad.
Sin embargo, si desde las `Dev Tools` accedemos a la composición de la página (tab `Elments`), veremos que ahora todo el HTML del carrusel está encapsulado en el `shadow-dom`, quedando innacesible para su indexación.

## Paso 3

```
$ git checkout paso3
```

## Paso 4

```
$ git checkout paso4
```

## Paso 5

```
$ git checkout paso5
```

## Paso 6

```
$ git checkout paso6
```



## Author
**manufosela**

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

## Generated

**generator-lit-element-base** - *yeoman npm package* - by [@manufosela](https://github.com/manufosela/generator-litelement-webcomponent)