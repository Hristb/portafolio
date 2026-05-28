---
title: "Spring Security: OAuth2 y JWT en APIs REST bancarias"
meta_title: "Spring Security OAuth2 JWT | Hrist Bartra"
description: "Implementando autenticación OAuth2 con JWT en una API REST de servicios financieros: configuración, roles y buenas prácticas."
date: 2025-08-20T09:00:00Z
image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
categories: ["Backend", "Seguridad"]
author: "hrist-bartra"
tags: ["spring-boot", "oauth2", "jwt", "seguridad", "java"]
draft: false
---

## Introducción

Asegurar APIs en entornos financieros no es opcional. JWT con OAuth2 es el estándar actual, pero la configuración mal hecha abre vectores de ataque. Aquí reviso el flujo completo con Spring Security 6.

---

## Configuración del SecurityFilterChain

```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/public/**").permitAll()
            .anyRequest().authenticated()
        )
        .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
        .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
        .build();
}
```

---

## Conclusión

Validar el `iss`, `aud` y `exp` del token en cada request es la diferencia entre una API segura y una vulnerable. Spring Security lo gestiona automáticamente cuando configuras el JwtDecoder correctamente.

