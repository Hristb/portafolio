---
title: "Microservicios con Quarkus y arquitectura BIAN para pagos"
meta_title: "Microservicios Quarkus + BIAN | Hrist Bartra"
description: "Cómo implementamos un microservicio de pagos en MiBanco siguiendo el modelo BIAN con Quarkus, Panache y APIs RESTful."
date: 2025-11-10T08:00:00Z
image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
categories: ["Backend", "FinTech"]
author: "hrist-bartra"
tags: ["quarkus", "bian", "microservicios", "java", "pagos"]
draft: false
---

## Introducción

En entornos FinTech, la estandarización de APIs es crítica. El modelo BIAN (Banking Industry Architecture Network) define contratos semánticos claros para operaciones financieras. En este artículo explico cómo aplicamos esos estándares en MiBanco usando Quarkus.

---

## Por qué BIAN + Quarkus

BIAN ofrece un catálogo de dominios de servicio bien definidos. Quarkus, por su parte, permite tiempos de arranque inferiores a 100ms y un footprint mínimo, ideal para despliegues en contenedores Azure.

---

## Estructura del microservicio

```java
@Path("/payment-orders")
public class PaymentOrderResource {

    @Inject
    PaymentOrderService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response initiate(@Valid PaymentOrderRequest request) {
        return Response.ok(service.initiate(request)).status(201).build();
    }
}
```

---

## Conclusión

La combinación BIAN + Quarkus nos permitió reducir el tiempo de integración entre sistemas legacy y el nuevo core bancario.

