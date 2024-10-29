# SchoolExercise

Aplicación web para la gestión de estudiantes, profesores y notas. Este proyecto está dividido en un **backend** desarrollado con **.NET Core WebAPI** y un **frontend** con **Angular**. Permite llevar un registro de estudiantes, profesores y notas, incluyendo operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

---

## 📋 **Tabla de Contenidos**

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Requisitos del Sistema](#requisitos-del-sistema)
3. [Instalación](#instalación)
    - [Backend](#instalación-del-backend)
    - [Frontend](#instalación-del-frontend)
5. [Capturas](#capturas)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)


---

## 📝 **Descripción del Proyecto**

SchoolExercise es un sistema de gestión académica que permite:
- **Estudiantes**: Registrar, editar, listar y eliminar estudiantes.
- **Profesores**: Gestionar profesores con sus respectivas operaciones CRUD.
- **Notas**: Asignar notas a los estudiantes, vinculando cada registro con un profesor y estudiante.

---

## 💻 **Requisitos del Sistema**

Asegúrate de tener instaladas las siguientes herramientas:

- **Node.js**: >= 18.x
- **Angular CLI**: >= 16.x
- **.NET SDK**: >= 6.0
- **Git**: Para clonar el repositorio
- **Visual Studio / Visual Studio Code**: Opcional, pero recomendado para desarrollo.

---

## 🚀 **Instalación**

### **Instalación del Backend**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/jhoanCVL01/SchoolExersice.git
   cd SchoolExersice/SchoolAPI

2. **Restaurar Dependencias:**
   ```bash
   dotnet restore

2. **Ajustar AppSettings:**
   ```bash
   Cambiar connection strings con la cadena correspondiente al servidor de BD
   
4. **Migrar la Base de Datos (opcional recomendado sql server):**
   ```bash
   dotnet ef database update

### **Instalación del Frontend**

1. **Navegar a la carpeta del frontend:**
   ```bash
   cd SchoolExersice/SchoolApp

1. **Instalar las dependencias:**
   ```bash
   npm install
   
3. **Ajustar Ruta Api en SchoolExersice/SchoolApp/src/app/api.service.ts:**
   ```bash
   private baseUrl = 'https://localhost:7235/api' (Cambiar por puerto de ejecucion de api)

## 🚀 **Capturas**

![image](https://github.com/user-attachments/assets/38637fe6-c563-47da-9f84-8cf627446a89)

![image](https://github.com/user-attachments/assets/a7d6feab-6802-4537-b542-89eae3a1b34b)

![image](https://github.com/user-attachments/assets/d0c97318-d394-4d51-855f-133dd50c3767)

![image](https://github.com/user-attachments/assets/495bba73-2487-48d6-97e5-523efc1edc99)


   
