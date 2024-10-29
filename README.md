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

## 📸 **Capturas**
 - **Estudiantes
![image](https://github.com/user-attachments/assets/e4f9441d-6c52-4dce-a633-7467a9c46645)
![image](https://github.com/user-attachments/assets/0d34566e-4de8-4072-987f-cbe8a5441384)
![image](https://github.com/user-attachments/assets/7fefe127-4569-4227-b0dc-1b36623b3bfa)
 - **Profesores
![image](https://github.com/user-attachments/assets/f7cc10e3-0f0b-4ff9-8105-fd8b5d811a43)
![image](https://github.com/user-attachments/assets/a01fdbfe-34e0-4616-a19b-ced571e136cc)
![image](https://github.com/user-attachments/assets/21ca2156-fd0d-4c8f-9685-e27d9fc0aae9)
 - **Notas
![image](https://github.com/user-attachments/assets/03f97445-c96d-43d6-a710-176639f3a0ff)
![image](https://github.com/user-attachments/assets/524bc9e8-a5e3-433e-a571-f27b4fbdc402)
![image](https://github.com/user-attachments/assets/b7e007b3-1ff1-4d07-8f9c-1bda53dad237)

- **MER
![image](https://github.com/user-attachments/assets/8effa2c7-1714-48a4-bb01-cfb7ee0a84ed)



## 🛠️ **Tecnologías Utilizadas**

- **Node.js**: >= 18.x
- **Angular CLI**: >= 16.x
- **.NET SDK**: >= 8.0
- **Git**: Para clonar el repositorio
- **Visual Studio / Visual Studio Code**: Opcional, pero recomendado para desarrollo.  
