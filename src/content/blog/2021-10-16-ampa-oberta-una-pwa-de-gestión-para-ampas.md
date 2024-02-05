---
pubDatetime: 2021-10-16T05:35:07.322Z
title: "AMPA OBERTA: Una PWA de gestión para AMPAs"
description: Esta aplicación es el resultado de mi trabajo final del Máster en
  Desarrollo de Aplicaciones y Sitios Web
tags:
  - development
  - pwa
author: Josep Monjo
---

Quiero aprovechar la oportunidad que me brinda la UOC para dar a conocer esta aplicación de código abierto, nacida como resultado de mi **trabajo final del Máster en Desarrollo de Aplicaciones y Sitios Web**, e intentar así sumar colaboradores al proyecto.

No hace falta recordar que el contexto actual de pandemia mundial propicia que, cada vez más, las personas eviten desplazamientos e interacciones personales y realicen todas sus gestiones de forma telemática siempre que sea posible, poniendo de relieve la importancia de las herramientas digitales y de telegestión como videoconferencias, aprendizaje online, administración electrónica, teletrabajo, etc...

Es en este contexto en el que surge la necesidad de modernizar la gestión de la Asociación de Madres y Padres de Alumnos (AMPA) de la que formo parte.

Haciendo un estudio de mercado, en un primer momento se planteó la posibilidad de elaborar un modelo SaaS (Software As A Service). En ese caso la aplicación podría contener la gestión de diferentes AMPA y cada una de ellas podría tener su propio subdominio. Éste es el modelo más frecuente en el mercado para este tipo de aplicaciones web.

Sin embargo, esta posibilidad se descartó porque la finalidad inicial no era montar un negocio SaaS si no desarrollar internamente una herramienta para la autogestión de la AMPA de la que forme parte como miembro de la Junta, haciéndola lo más abierta y transparente posible para que pueda ser implementada en otras AMPA o asociaciones que no quieran un modelo de suscripción sino uno autogestionado.

Sin embargo, esta aplicación es relativamente fácil de reconvertir a un modelo de SaaS si en el futuro se quisiera usar para ese fin, ya que no todas las AMPA disponen de personal cualificado para poner en marcha una aplicación web a partir de su repositorio público.

Y así és como llegamos a [AMPA OBERTA](https://ampaoberta.com). Se trata de una PWA (_Progressive Web App_) cuyo propósito es servir de plataforma de gestión y comunicación entre los miembros de las AMPA.

El modelo de aplicación web progresiva está basado en estándares web y no en ningún framework o empresa. Para que una aplicación web sea considerada PWA, debe cumplir una serie de requisitos que podríamos dividir en tres grandes áreas:

- Capaz: Gracias a las cada vez más extensas API web, hay pocas cosas que una web app no sea capaz de realizar hoy en día (chat en tiempo real, notificaciones push, geolocalización, etc...).

- Confiable: una PWA debe sentirse rápida, tanto en la carga como en la interacción con el usuario. Además, debe permitir cierta usabilidad con una conexión a la red débil o inexistente. Esto es posible gracias a los **service workers**.

- Instalable: una PWA se ejecuta en su propia ventana y debe poder ser lanzada desde el escritorio del usuario.

Podéis ver un ejemplo de implementación de esta app aquí: <https://fampa-pwa.web.app/>.

Entre sus funcionalidades se encuentran:

- Sistema de gestión de contenidos CMS (blog, páginas, actividades, servicios)
- Gestión de miembros
- Gestión de cobros por domiciliación
- Inscripción en servicios
- Envío de comunicaciones (email, notificaciones push, ...)
- Backoffice diferenciado entre usuario/administrador

A nivel de desarrollo el proyecto se divide en 2 repositorios, uno para el frontend y otro para el backend, además de una serie de servicios en la nube (severless).

![Arquitectura de la app](/assets/blog/img/arquitectura_app.png)

El **frontend** está desarrollado con la versión 3 de VueJS. Concretamente se hace uso del _framework_ [Quasar](https://quasar.dev/). Quasar permite el desarrollo de aplicaciones web (SPA, PWA), aplicaciones móviles y aplicaciones de escritorio compartiendo un mismo código base. Además nos facilita una amplia galería de componentes para implementar una UI de manera rápida y sencilla.

Como ya hemos mencionado _Quasar_ nos permite empaquetar nuestra aplicación como una aplicación web progresiva (PWA), lo que le permite funcionar sin conexión a internet, integrar notificaciones push, y poder instalarla como si de una aplicación nativa se tratara.

El **backend** está basado en una base de datos relacional (Postgres) gestionada mediante lenguaje GraphQl gracias al _framework_ [Hasura](https://hasura.io).

GraphQL es un lenguaje query para APIs que proporciona de forma automática una documentación de los datos que pueden ser extraídos de la API, autocompletado de las queries y además permite obtener sólo aquellos campos que nos interesan desde un único **endpoint**.

Más abajo se puede observar el diagrama de clases en el que se ha basado el diseño de la base de datos y de los modelos de TypeScript.

![Diagrama de clases](/assets/blog/img/Diagrama-de-classes.png)

Por otro lado también se hace uso de diversos productos de [Firebase](https://firebase.google.com/) para distintas funcionalidades que quedan fuera del alcance de Hasura como:

- Firebase auth (gestión de usuarios y autorización)
- Firebase functions (Servidor Node para el envío de correos y business logic)
- Firebase storage (almacenamiento de fotos)

## Retos de futuro

Para poder hacer el proyecto 100% de código abierto, y simplificar la arquitectura al máximo, minimizando la [deuda técnica](https://es.wikipedia.org/wiki/Deuda_t%C3%A9cnica) del proyecto tendremos que, más pronto que tarde, prescindir de los servicios de Firebase.

Alguna de las opciones a estudiar es la de migrar el backend del stack Hasura/Firebase a una plataforma de código abierto que aúne los servicios de ambas. Entre las candidatas estan [Supabase](https://supabase.io/) y [Appwrite](https://appwrite.io/), plataformas estas que aúnan todos o la mayoría de los servicios que necesita una app como esta: base de datos relacional, gestión de usuarios integrada, funciones, almacenamiento, webhooks, ...

Otro aspecto a mejorar es el del SEO ya que actualmente el frontend es 100% _client side_. Esto lo podriamos conseguir simplemente usando la versión de servidor que nos genera el propio Quasar. Pero dado que el blog no se va actualizar en exceso podemos prescindir de tener que mantener un servidor NodeJS y por tanto hay que buscar una alternativa que nos permita seguir alojando nuestra app en servicios serverless.

La idea para ello es generar un sitio web estático usando servicios como Netlify, Vercel o _Github Pages_ cada vez que se añade por ejemplo un artículo en el blog. De esa forma conseguimos un sitio muy rápido y con una gran ventaja desde el punto de vista del SEO con respecto a las aplicaciones web tradicionales (Single Page Applications), sintiendose además mucho más rápidas y mejorando con ello la experiencia de usuario. Además, esta arquitectura nos permite seguir aprovechando las ventajas que nos ofrece el modelo SPA, ya que en la primera visita del usuario la página se sirve ya generada por el servidor pero las siguientes interacciones hacen uso de la interacción que proporciona JavaScript mediante un proceso conocido como rehidratación.

Para ello se podria migrar de Quasar a Nuxt (por ejemplo) o usar un [plugin](https://github.com/freddy38510/quasar-app-extension-ssg) de Quasar que permita la generación de un sitio estático.

## Enlaces

- [Github del frontend](https://github.com/fampa/ampa-pwa)
- [Github del backend](https://github.com/fampa/ampa-pwa)
- [Trabajo Final de Máster de la UOC](http://hdl.handle.net/10609/132928)
