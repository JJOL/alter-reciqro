
# AQROPIO
Una experiencia digital que buscan forma ciudadanos ecológicamente responsables en la ciudad de Querétaro fomentándolos a:
1. Depositar sus residuos urbanos sólidos o especiales correctamente en los centros de acopio del municipio.
2. Informarse y participar en talleres de manejo apropiado de residuos para generar consciencia.
Esto se logra a través de:
1. Un mapa buscador de centros de acopio.
2. Eventos y fichas técnicas de los resiudos.


[Matriz de requisitos](https://docs.google.com/spreadsheets/d/1QAn8QA6UwQu4p5pzo3QpAgggC5GWWg2zO1UTauqZx3s/edit#gid=1078788303)


## 1.0.0 (26/05/2020)

### Módulo 1 Mapa y marcadores interactivos

#### Ciudadano
* Mapa interactivo y dinámico con filtros de centros de acopio(M1NC1 - M1NC5)
#### Administrativo
* CRUD de centros de acopio, tipos de centros, tipos de basura(M1NG1 - M1NG10)
* Analizador de uso de centros de acopio(M1NG11)

### Módulo 2 Eventos y fichas informativas
#### Ciudadano
* Carrusel de eventos (M2NC1)
* Listado de fichas informativas y detalle (M2NC4)
* Listado de eventos (M2NC2)
* Detalle de evento (M2NC3)
* Compatir detalle de un evento (M2NC5)
* "Estoy interesado" en evento (M2NC7)
* Splashscreen (M2NC9)
* Notificaciones por correo de eventos(M2NC6)
#### Administrativo
* CRUD eventos (M2NG1 - M2NG5)
* CRUD banners informativos (M2NG6 - M2NG10)
* CRUD finchas informativas de residuos  (M2NG10 - M2NG14)

### Módulo 3
* Deprecación
 
### Módulo 4 Autenticación y autentificación 
* Sign in (M4NC2)
* Sign up (M4NC1)
* Log out (M4NC4)
* Recuperar contraseña (M4NC3)
#### Ciudadano
* Cambiar delegación del usuario (M4NC5)
#### Administrativo
* CRUD permisos de usuarios (M4NG1-M4NG6)

## Referencia tecnica para el proyecto
Consulta la wiki de arquitectura en [Alter Arquitecture Handook](http://altermx.website/index.php/Arquitectura_Gobierno)




