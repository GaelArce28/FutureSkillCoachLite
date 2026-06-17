# FutureSkillCoachLite
Descripcion: Aplicacion para agendar citas con coaches de gimnasio, con capacidad de poder ver,crear, actualizar y borrar perfiles de coaches o clientes.

Tecnologias usadas:
Backend:
- ASP.NET Core Web API (.NET)
- Entity Framework Core
- SQL Server
- JWT Authentication
- Arquitectura en capas (API, Domain, Infrastructure, Facade, DTO)

Frontend:
- React
- Vite
- React Router DOM

Pruebas:
- Cypress (E2E)

Móvil:
- Capacitor
- Android Studio

Base de datos:
- SQL Server (Azure SQL Database)

Requisitos para correrlo:
- .NET SDK 8 o superior
- Node.js 22.x
- SQL Server o acceso a Azure SQL
- Android Studio (opcional para móvil)
- Git

Comandos para backend: 

cd FutureSkillCoachLite.Api

dotnet restore

dotnet build

dotnet run

Comandos para frontend: 

cd FutureSkillCoachLite.Web

npm install

npm run dev

Comandos para e2e:

cd FutureSkillCoachLite.Web

npx cypress open

o

npx cypress run

Comandos para mobile:

cd FutureSkillCoachLite.Web

npm install

npm run android

Credenciales de prueba: 
Cliente de prueba: 
Correo: MiguelC@gmail.com Contraseña: Miguel12345

Coach de prueba: 
Correo: VictoriaM@gmail.com 
Contraseña: Victoria12345

Admin: 
Correo: admin@filadelfia.com
Contraseña: admin123

Explicacion de funciones principales:

Autenticación
- Inicio de sesión mediante JWT.
- Manejo de roles:
  - Admin
  - Coach
  - Client

Gestión de Coaches
- Crear coach.
- Consultar lista de coaches.
- Consultar coach por ID.
- Actualizar información de coach.
- Eliminar coach.

Gestión de Clientes
- Crear cliente.
- Consultar clientes.
- Consultar cliente por ID.
- Actualizar perfil.
- Eliminar cliente.

Gestión de Citas
- Crear citas entre clientes y coaches.
- Consultar citas registradas.
- Actualizar citas.
- Eliminar citas.
- Acceso protegido mediante autenticación.

Panel de Administración
- Acceso exclusivo para administradores.
- Control de usuarios y datos generales.

Gestión de Clientes del Coach
- Cada entrenador puede visualizar y administrar sus clientes asignados.

Aplicación Móvil
- El frontend puede compilarse para Android mediante Capacitor.

Link de repositorio:
https://github.com/GaelArce28/FutureSkillCoachLite.git

Link de vercel: 
https://future-skill-coach-lite.vercel.app/

Link de jira:
https://proyectoprogramadods4.atlassian.net/jira/software/projects/KAN/boards/1?atlOrigin=eyJpIjoiYWM5MDcyNTY3ZjU0NGI5YzlmOWEwNDRiMWNkNTNjOGYiLCJwIjoiaiJ9


