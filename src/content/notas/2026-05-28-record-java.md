---
date: 2026-05-28
tipo: til
tema: "Record en Java 16+ — inmutabilidad sin boilerplate"
---

`record` genera automáticamente constructor, getters, `equals`, `hashCode` y `toString`. Ideal para DTOs y Value Objects.

```java
record Coordenada(double lat, double lng) {}

var punto = new Coordenada(-12.04, -77.03);
System.out.println(punto); // Coordenada[lat=-12.04, lng=-77.03]
```

Lo que me sorprendió: los records son implícitamente `final` y sus campos son `final`. No hay setters. Si necesitas mutabilidad, no es un record — es una clase normal.
