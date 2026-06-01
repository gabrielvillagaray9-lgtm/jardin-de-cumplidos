# Jardín de Cumplidos

Experiencia web artística, interactiva y mobile-first. Cada visitante toca una flor mágica, recibe un mensaje positivo y planta una flor en un jardín global compartido con Supabase.

## 1. Instalación

No necesita build ni instalación de dependencias.

Archivos principales:

- `index.html`
- `style.css`
- `script.js`
- `supabase-config.js`

Puedes abrir `index.html` directamente, aunque para probarlo como una web real es mejor usar un servidor local.

## 2. Ejecución local

Opción recomendada con Node:

```bash
cd JardinDeCumplidos
node dev-server.js
```

Después abre:

```text
http://localhost:5500
```

También puedes abrir `index.html` con doble clic, pero el servidor local se parece más al funcionamiento real en GitHub Pages.

## 3. Configuración de Supabase

1. Entra en [Supabase](https://supabase.com/) y crea un proyecto.
2. Ve a `SQL Editor`.
3. Ejecuta este SQL:

```sql
create table if not exists public.tabla_flores (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  x numeric not null,
  y numeric not null,
  tipo_flor text not null,
  color text not null
);

alter table public.tabla_flores enable row level security;

create policy "Cualquiera puede ver flores"
on public.tabla_flores
for select
to anon
using (true);

create policy "Cualquiera puede plantar flores"
on public.tabla_flores
for insert
to anon
with check (
  x >= 0 and x <= 100
  and y >= 0 and y <= 100
  and tipo_flor in ('daisy', 'bell', 'star')
  and color in ('#ff77c8', '#ff9fe5', '#ffcf5d', '#b66cff', '#7ce6a8', '#ff8f6b', '#8fd7ff', '#f66fa8')
);
```

4. Para tiempo real, ve a `Database > Replication` y activa realtime para `tabla_flores`.

## 4. Variables necesarias

En Supabase, ve a `Project Settings > API`.

Copia:

- `Project URL`
- `anon public key`

Edita `supabase-config.js`:

```js
window.SUPABASE_CONFIG = {
  url: "https://TU-PROYECTO.supabase.co",
  anonKey: "TU_CLAVE_ANON_PUBLICA"
};
```

La clave `anon public` está pensada para usarse en frontend. La seguridad viene de las políticas RLS creadas arriba.

Si dejas los valores de ejemplo, la página funcionará en modo local: plantará flores solo en el navegador actual.

## 5. Despliegue en GitHub Pages

1. Sube la carpeta `JardinDeCumplidos` a un repositorio de GitHub.
2. Asegúrate de que `supabase-config.js` tiene tu URL y clave anon pública.
3. En GitHub, entra en `Settings > Pages`.
4. En `Build and deployment`, elige:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/JardinDeCumplidos` si GitHub lo permite en tu repositorio, o mueve los archivos a la raíz y usa `/root`.
5. Guarda y espera a que GitHub genere el enlace.

## 6. Solución de problemas

Si el contador no sube:

- Revisa que `supabase-config.js` tenga valores reales.
- Comprueba que la tabla se llama exactamente `tabla_flores`.
- Verifica que las políticas RLS existen.

Si las flores aparecen solo para ti:

- La web está en modo local porque Supabase no está configurado o no se pudo conectar.
- Abre la consola del navegador para ver avisos.

Si el tiempo real no se actualiza en otro móvil:

- Activa realtime para `tabla_flores` en Supabase.
- Recarga la página después de activar la opción.

Si GitHub Pages muestra una pantalla sin estilos:

- Revisa que `index.html`, `style.css`, `script.js` y `supabase-config.js` estén en la misma carpeta.
- Comprueba mayúsculas y minúsculas en los nombres de archivo.

## Detalles incluidos

- Flor central SVG interactiva.
- Partículas, pétalos, destellos, luciérnagas y mariposas.
- Más de 100 mensajes positivos sin repetición cercana.
- Sistema global de flores con Supabase.
- Fallback local para desarrollo.
- Sonido opcional con Web Audio, sin reproducción automática.
- Límite de renderizado para evitar cargar demasiados elementos si el jardín crece mucho.
