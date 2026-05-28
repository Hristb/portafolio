---
# ─────────────────────────────────────────────────────────────
#  PLANTILLA DE ARTÍCULO — copiar este archivo y renombrarlo
#  Nombre de archivo: slug-del-articulo.md  (sin tildes, sin espacios)
#  Ejemplo: quarkus-openapi-rest.md
# ─────────────────────────────────────────────────────────────

title: "Título del artículo"                   # Requerido — aparece en la tarjeta y en el <title>
meta_title: ""                                   # Opcional — si vacío usa `title`. Para SEO personalizado
description: "Descripción breve de 1-2 líneas." # Requerido — preview en la tarjeta y meta description
date: 2026-05-27T10:00:00Z                       # Requerido — formato ISO 8601
image: "/images/image-placeholder.png"           # Opcional — ruta desde /public/images/
categories: ["Backend", "Java"]                  # Al menos 1. Ver categorías usadas abajo ↓
author: "hrist-bartra"                           # Debe coincidir con slug en src/content/authors/
tags: ["quarkus", "openapi", "rest"]             # Palabras clave técnicas en minúsculas
draft: true                                      # true = no se publica · false = visible en producción

# ─── Categorías recomendadas ───────────────────────────────────
#  "Backend"     → Java, Quarkus, Spring Boot, APIs REST
#  "FinTech"     → Pagos, BIAN, MiBanco, arquitectura financiera
#  "DevOps"      → Azure, Docker, CI/CD, despliegue
#  "Frontend"    → Angular, Astro, TypeScript
#  "Arquitectura"→ Microservicios, patrones, SDD, OpenAPI
#  "IA & Herramientas" → GitHub Copilot, productividad, AI-assisted dev
# ──────────────────────────────────────────────────────────────
---

## Introducción

Escribe aquí la intro. Una o dos frases que enganchan al lector y explican **qué vas a resolver o mostrar**.

---

## El problema / Contexto

Describe el escenario real. ¿Qué problema tenías? ¿En qué proyecto? No hace falta revelar datos sensibles, basta con el contexto técnico.

```java
// Ejemplo de código — usa el lenguaje correcto en el bloque
@GET
@Path("/health")
public Response healthCheck() {
    return Response.ok("OK").build();
}
```

---

## La solución

Explica el enfoque paso a paso. Puedes usar sub-secciones:

### Paso 1 — Configuración inicial

Texto + código si aplica.

### Paso 2 — Implementación

```java
// más código aquí
```

### Paso 3 — Resultado

Muestra el output, screenshot o métrica obtenida.

---

## Puntos clave

> Cita o frase importante que quieras destacar.

- **Punto 1**: explicación breve
- **Punto 2**: explicación breve
- **Punto 3**: explicación breve

---

## Conclusión

Cierra con lo que aprendiste, lo que mejorarías, o el siguiente paso natural. Una o dos frases.

---

*¿Preguntas o comentarios? Escríbeme en [LinkedIn](https://www.linkedin.com/in/hrist-joy-bartra-saavedra-09b71913a/).*
