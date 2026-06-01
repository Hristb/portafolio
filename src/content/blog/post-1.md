---
title: "Quarkus 3 en 2025: El framework Java que realmente cambia las reglas del juego"
meta_title: "Quarkus 3 — Guía completa para el desarrollador moderno | Hrist Bartra"
description: "Todo lo que necesitas saber sobre Quarkus 3: native compilation, Virtual Threads, Dev Services, AI extensions y las funciones avanzadas que la mayoría ignora. Guía técnica con ejemplos reales."
date: 2025-11-10T08:00:00Z
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80"
categories: ["Backend", "Arquitectura"]
author: "hrist-bartra"
tags: ["quarkus", "java", "microservicios", "graalvm", "virtual-threads", "quarkus3", "cloud-native"]
draft: false
---

## ¿Por qué Quarkus y no Spring Boot?

Antes de entrar en código, seamos directos: **Spring Boot no va a desaparecer**, y no es el objetivo de este artículo atacarlo. Pero si llevas años trabajando con él y nunca has probado Quarkus a fondo, probablemente estás dejando sobre la mesa beneficios reales en producción.

He trabajado con Quarkus en entornos de banca digital de alta demanda (Neobank con +500K transacciones/día) y la diferencia no es marketing. Es milisegundos, megabytes y dinero en factura cloud.

Este artículo es una guía técnica completa. No importa si eres junior, senior o arquitecto: al final tendrás una visión clara de **qué es Quarkus, por qué importa y cómo sacarle el máximo provecho en 2025**.

---

## ¿Qué es Quarkus? (para quien llega por primera vez)

**Quarkus** es un framework Java de código abierto, creado por Red Hat, diseñado desde cero para correr en contenedores y entornos cloud-native. Su lema oficial es *"Supersonic Subatomic Java"*, y no exagera.

La idea central es simple: **mover el trabajo de inicialización del runtime al tiempo de compilación**. Todo lo que Spring hace al arrancar (escanear anotaciones, crear beans, configurar inyecciones) Quarkus lo hace durante el `mvn package`. El resultado: tu aplicación inicia en **~30–80ms** en lugar de los clásicos 5–15 segundos de una app Spring.

> Si tu microservicio escala a cero en Kubernetes y se reactiva con cada request, esos segundos de cold-start son literalmente dinero perdido. Con Quarkus ese problema desaparece.

---

## Los beneficios concretos (con métricas reales)

| Métrica | Spring Boot 3 | Quarkus 3 (JVM) | Quarkus 3 (Native) |
|---|---|---|---|
| Tiempo de inicio | ~4–8 s | ~0.3–0.8 s | **~0.02–0.05 s** |
| Memoria en idle | ~250–400 MB | ~80–150 MB | **~15–50 MB** |
| Tamaño del JAR | ~50–80 MB | ~30–50 MB | ~60 MB (binario) |
| Throughput (req/s) | Alto | Alto | Alto + menor latencia |

*Valores aproximados con microservicio REST + base de datos simple. Pueden variar según dependencias.*

Los números en **Native** son los que realmente sorprenden. Un microservicio Quarkus compilado con GraalVM puede correr en un contenedor `scratch` de 60MB que arranca en 30 milisegundos. Eso cambia completamente la economía de escalar a cero.

---

## Funcionalidades clave de Quarkus 3 que debes conocer

### 1. Compilación Nativa con GraalVM / Mandrel

Esta es la característica estrella. Quarkus puede compilar tu aplicación Java a un **ejecutable nativo** (un binario que no necesita JVM) usando GraalVM o Mandrel (la distribución oficial de Red Hat).

```bash
# Compilar a nativo (requiere GraalVM o contenedor con él)
./mvnw package -Pnative

# O usando Docker (sin instalar GraalVM localmente)
./mvnw package -Pnative -Dquarkus.native.container-build=true
```

El binario resultante se ejecuta directamente:

```bash
./target/my-app-1.0-runner
# Arranca en ~30ms. Sin JVM. Sin magia negra.
```

**¿Cuándo usarlo?** Funciones serverless, microservicios que escalan a cero, entornos con memoria muy limitada, o cuando el cold-start impacta la experiencia del usuario.

**¿Cuándo NO usarlo?** Si tienes reflection intensiva sin configuración previa, o si el tiempo de build (5–15 minutos para native) impacta tu CI/CD de forma inaceptable.

---

### 2. Dev Services — Cero configuración para desarrollar

Esta es la funcionalidad que más me gusta mostrarle a desarrolladores Spring. Con **Dev Services**, Quarkus levanta automáticamente los servicios externos (PostgreSQL, Kafka, Redis, MongoDB, Keycloak, etc.) usando Docker, **sin que escribas una sola línea de configuración**.

```properties
# application.properties — esto es TODO lo que necesitas escribir
# Quarkus detecta que necesitas PostgreSQL y lo levanta solo
quarkus.datasource.db-kind=postgresql
```

Al ejecutar `quarkus dev`, Quarkus:
1. Detecta que usas Hibernate + PostgreSQL
2. Descarga y levanta un contenedor PostgreSQL automáticamente
3. Configura las credenciales y el URL de conexión
4. Al parar el servidor, destruye el contenedor

```bash
$ quarkus dev
...
[INFO] Dev Services for the default datasource (postgresql) started - container ID is a7f3e9d
[INFO] Profile dev activated. Live Coding activated.
__  ____  __  _____   ___  __ ____  ______
 --/ __ \/ / / / _ | / _ \/ //_/ / / / __/
 -/ /_/ / /_/ / __ |/ , _/ ,< / /_/ /\ \
--\___\_\____/_/ |_/_/|_/_/|_|\____/___/
Listening on: http://localhost:8080
```

No más `docker-compose.yml` por proyecto, no más "en mi máquina funciona". **El entorno de desarrollo se autoconfigura**.

---

### 3. Virtual Threads (Java 21 + Project Loom)

Desde Quarkus 3.2, puedes activar **Virtual Threads** con una sola anotación. Esto te da la escalabilidad del modelo reactivo con la simplicidad del código imperativo tradicional.

```java
@Path("/payments")
public class PaymentResource {

    @Inject
    PaymentService service;

    @GET
    @Path("/{id}")
    @RunOnVirtualThread  // ← Esta anotación es todo lo que necesitas
    public PaymentDTO get(@PathParam("id") Long id) {
        // Código bloqueante normal, escalabilidad de Reactive
        return service.findById(id);
    }
}
```

**¿Qué ganas?** Un solo hilo virtual pesa ~1KB de heap (vs ~1MB de un hilo OS). Puedes manejar **miles de requests concurrentes** sin el modelo reactivo (callbacks, `Uni`, `Multi`) que tiene una curva de aprendizaje alta. Es lo mejor de ambos mundos.

---

### 4. Dev UI — El panel de control del desarrollador

Al correr `quarkus dev`, accede a `http://localhost:8080/q/dev` y encontrarás una interfaz web con:

- **Swagger UI**: documentación automática de todos tus endpoints REST
- **Health checks**: estado de la aplicación y sus dependencias
- **Configuration**: ver y modificar propiedades en caliente
- **Dev Services**: estado de los contenedores levantados
- **Hibernate ORM**: ejecutar queries directamente
- **SmallRye OpenAPI**: descargar la spec OpenAPI generada
- **Continuous Testing**: ver los tests corriendo en tiempo real

Esto elimina la necesidad de Postman para pruebas básicas durante el desarrollo.

---

### 5. Panache — JPA sin el ruido

Hibernate ORM con Panache simplifica dramáticamente el acceso a datos. Olvida los repositorios de 50 líneas:

```java
// Entidad + Repositorio en UNA clase
@Entity
public class Payment extends PanacheEntity {

    public String transactionId;
    public BigDecimal amount;
    public String status;
    public LocalDateTime createdAt;

    // Queries custom como métodos estáticos — sin @Repository, sin @Query
    public static List<Payment> findByStatus(String status) {
        return list("status", status);
    }

    public static Optional<Payment> findByTransactionId(String txnId) {
        return find("transactionId", txnId).firstResultOptional();
    }
}
```

Uso en el Resource:

```java
@POST
@Transactional
public Response create(PaymentRequest req) {
    Payment p = new Payment();
    p.transactionId = UUID.randomUUID().toString();
    p.amount = req.amount();
    p.status = "PENDING";
    p.createdAt = LocalDateTime.now();
    p.persist();                          // ← sin service, sin repo
    return Response.status(201).entity(p).build();
}
```

---

### 6. Continuous Testing — Tests que corren solos

Al activar `quarkus dev`, presiona `r` en la consola para activar **Continuous Testing**. Quarkus re-ejecuta automáticamente los tests afectados cada vez que guardas un archivo. No más `mvn test` manual.

```
Press [r] to resume testing, [o] Toggle test output, [h] for more options>

All 12 tests passed (0 skipped, 0 failed)
```

---

### 7. Integración con IA — LangChain4j Extension

En 2025, Quarkus tiene integración nativa con **LangChain4j** para construir aplicaciones de IA de producción:

```java
@RegisterAiService(tools = PaymentTools.class)
public interface PaymentAssistant {

    @SystemMessage("Eres un asistente bancario. Responde solo sobre pagos.")
    @UserMessage("Analiza esta transacción: {transaction}")
    String analyze(String transaction);
}
```

```properties
# Conectar con OpenAI, Azure OpenAI, Ollama (local), etc.
quarkus.langchain4j.openai.api-key=${OPENAI_API_KEY}
quarkus.langchain4j.openai.chat-model.model-id=gpt-4o
```

Quarkus se encarga de la gestión del contexto, el historial de conversación y la integración con el resto de tu aplicación CDI.

---

## Funciones avanzadas que la mayoría no usa (y debería)

### ① Scheduler integrado — sin Spring @Scheduled ni Quartz externo

```java
@ApplicationScoped
public class ReconciliationJob {

    @Scheduled(every = "1h", delayed = "5m")
    void reconcilePayments() {
        // Ejecuta cada hora, con delay inicial de 5 minutos
        paymentService.reconcile();
    }

    @Scheduled(cron = "0 0 2 * * ?")  // Cron también funciona
    void dailyReport() {
        reportService.generateDaily();
    }
}
```

### ② @ConfigMapping — Configuración tipada y validada

```java
@ConfigMapping(prefix = "banking")
@Validated
public interface BankingConfig {

    @NotBlank
    String apiKey();

    @Min(1) @Max(100)
    int maxRetries();

    Timeouts timeouts();

    interface Timeouts {
        Duration connection();
        Duration read();
    }
}
```

```properties
banking.api-key=${BANKING_SECRET}
banking.max-retries=3
banking.timeouts.connection=2s
banking.timeouts.read=10s
```

Inyectas la interfaz directamente. Si falta una propiedad requerida, **la app no arranca** (falla rápido, no en runtime).

### ③ Health Checks personalizados — más allá del `/health`

```java
@Liveness   // → /q/health/live
@ApplicationScoped
public class CoreBankingHealthCheck implements HealthCheck {

    @Inject
    CoreBankingClient client;

    @Override
    public HealthCheckResponse call() {
        try {
            boolean alive = client.ping();
            return HealthCheckResponse.named("core-banking")
                .status(alive)
                .withData("latency_ms", client.lastPingMs())
                .build();
        } catch (Exception e) {
            return HealthCheckResponse.named("core-banking")
                .down()
                .withData("error", e.getMessage())
                .build();
        }
    }
}
```

### ④ OpenTelemetry automático — trazabilidad sin código

```properties
# application.properties
quarkus.otel.exporter.otlp.endpoint=http://jaeger:4317
quarkus.otel.service.name=payment-service
```

Con solo estas dos líneas, **todos tus endpoints REST, queries Hibernate y llamadas HTTP salientes** son instrumentados automáticamente con traces distribuidos. Cero código adicional.

### ⑤ Fault Tolerance con SmallRye — Circuit Breaker declarativo

```java
@Path("/external-bank")
public class ExternalBankResource {

    @GET
    @Retry(maxRetries = 3, delay = 500, delayUnit = ChronoUnit.MILLIS)
    @Timeout(value = 5, unit = ChronoUnit.SECONDS)
    @CircuitBreaker(requestVolumeThreshold = 10, failureRatio = 0.5, delay = 30000)
    @Fallback(fallbackMethod = "fallbackBalance")
    public BalanceDTO getBalance(String accountId) {
        return externalBankClient.getBalance(accountId);
    }

    public BalanceDTO fallbackBalance(String accountId) {
        return new BalanceDTO(accountId, BigDecimal.ZERO, "UNAVAILABLE");
    }
}
```

Retry, Timeout, Circuit Breaker y Fallback en 4 anotaciones. Sin frameworks externos, sin XML, sin configuración de beans.

---

## Estructura de proyecto recomendada para un microservicio de producción

```
payment-service/
├── src/
│   ├── main/
│   │   ├── java/com/mybank/payment/
│   │   │   ├── resource/         ← Endpoints REST (@Path)
│   │   │   ├── service/          ← Lógica de negocio (@ApplicationScoped)
│   │   │   ├── entity/           ← Entidades Panache (@Entity)
│   │   │   ├── client/           ← REST Clients (@RegisterRestClient)
│   │   │   ├── config/           ← @ConfigMapping interfaces
│   │   │   ├── health/           ← Health checks personalizados
│   │   │   └── dto/              ← Records Java 17+ para DTOs
│   │   └── resources/
│   │       ├── application.properties
│   │       └── import.sql        ← Data inicial (solo dev)
│   └── test/
│       ├── java/                 ← @QuarkusTest, @QuarkusIntegrationTest
│       └── resources/
│           └── application.properties  ← Config de tests
├── src/main/docker/
│   ├── Dockerfile.jvm
│   └── Dockerfile.native
└── pom.xml
```

---

## Quick Start — de cero a running en 5 minutos

```bash
# 1. Instalar Quarkus CLI (una vez)
sdk install quarkus   # con SDKMAN
# o: brew install quarkusio/tap/quarkus (macOS)

# 2. Crear proyecto con extensiones
quarkus create app com.mybank:payment-service \
  --extension="rest-jackson,hibernate-orm-panache,jdbc-postgresql,smallrye-health,opentelemetry"

# 3. Modo desarrollo (con hot-reload y Dev Services)
cd payment-service
quarkus dev

# 4. Abrir Dev UI
# http://localhost:8080/q/dev
```

---

## Conclusión — Lo que me llevo de usar Quarkus en producción

Después de trabajar con Quarkus en un Neobank real, mi conclusión es clara:

- **Para microservicios nuevos**: Quarkus es mi primera opción. El ahorro en infraestructura cloud (menos memoria = menos factura) y el tooling de desarrollo (Dev Services, Dev UI, Continuous Testing) superan la curva de aprendizaje inicial.
- **Para proyectos legacy Spring Boot**: No migres por migrar. Pero si tienes un microservicio nuevo, considera Quarkus.
- **Para serverless y edge computing**: Quarkus Native es imbatible. No hay competencia real.

La versión 3.x (con LTS) es estable para producción. Red Hat la usa internamente en OpenShift. Si quieres apostar por una tecnología con respaldo empresarial y comunidad activa, Quarkus cumple.

---

## Referencias oficiales

- [Quarkus.io — Sitio oficial y Guides](https://quarkus.io/guides/)
- [Quarkus 3.x Release Notes](https://quarkus.io/blog/quarkus-3-0-final-released/)
- [Dev Services Documentation](https://quarkus.io/guides/dev-services)
- [Virtual Threads Guide](https://quarkus.io/guides/virtual-threads)
- [Quarkus LangChain4j Extension](https://docs.quarkiverse.io/quarkus-langchain4j/dev/index.html)
- [SmallRye Fault Tolerance](https://quarkus.io/guides/smallrye-fault-tolerance)
- [Quarkus CLI Reference](https://quarkus.io/guides/cli-tooling)
- [GraalVM Native Image](https://quarkus.io/guides/building-native-image)
- [Quarkus Extensions Registry](https://registry.quarkus.io/)

---

*¿Preguntas o comentarios? Escríbeme en [LinkedIn](https://www.linkedin.com/in/hrist-joy-bartra-saavedra-09b71913a/).*

