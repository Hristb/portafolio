---
title: "Arquitectura de microservicios en la nube: lo que aprendí en Indra"
meta_title: "Microservicios Azure cloud | Hrist Bartra"
description: "Reflexiones prácticas sobre diseñar y desplegar microservicios en Azure para el sector bancario: lecciones aprendidas, errores y buenas prácticas."
date: 2026-03-05T11:00:00Z
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
categories: ["Arquitectura", "DevOps"]
author: "hrist-bartra"
tags: ["azure", "microservicios", "docker", "ci-cd", "java"]
draft: false
---

## Introducción

Desplegé mis primeros microservicios en Azure en 2022. Desde entonces aprendí que la parte técnica es solo el 30% del trabajo; el resto es coordination, observabilidad y decisiones de diseño.

---

## Lo que funciona

- **Contenedores pequeños y especializados**: cada microservicio hace una sola cosa bien
- **Health checks explícitos**: Azure Container Apps los requiere para el auto-scaling
- **Trazabilidad desde el día 1**: OpenTelemetry + Application Insights desde el inicio

---

## Lo que no funciona

- Compartir base de datos entre microservicios (antipatrón clásico)
- Ignorar el manejo de errores en llamadas entre servicios
- Desplegar sin pipelines de CI/CD desde el inicio

---

## Conclusión

La arquitectura de microservicios en banca require disciplina. Los beneficios (escalabilidad, despliegue independiente) valen la complejidad si el equipo está alineado.

