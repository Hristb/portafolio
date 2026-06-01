---
date: 2026-05-30
tipo: til
tema: "Optional en Java no es solo para evitar NPE"
---

Lo usaba mal. `Optional` no está diseñado para ser un campo de clase ni un parámetro de método — está pensado como valor de retorno cuando un resultado puede estar ausente.

La diferencia práctica: `Optional.orElseThrow()` es semánticamente honesto sobre el contrato del método. `Optional.orElse(null)` es casi lo mismo que no usar Optional.

La regla que me quedó: si tienes que hacer `.get()` sin chequear, el Optional no está sirviendo de nada.
