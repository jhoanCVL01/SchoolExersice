USE [SchoolDB]
GO
SET IDENTITY_INSERT [dbo].[Estudiantes] ON 

INSERT [dbo].[Estudiantes] ([Id], [Nombre]) VALUES (1, N'Miguel')
INSERT [dbo].[Estudiantes] ([Id], [Nombre]) VALUES (3, N'Juan')
INSERT [dbo].[Estudiantes] ([Id], [Nombre]) VALUES (5, N'Sebastian')
INSERT [dbo].[Estudiantes] ([Id], [Nombre]) VALUES (8, N'julian')
INSERT [dbo].[Estudiantes] ([Id], [Nombre]) VALUES (9, N'mario')
SET IDENTITY_INSERT [dbo].[Estudiantes] OFF
GO
SET IDENTITY_INSERT [dbo].[Profesores] ON 

INSERT [dbo].[Profesores] ([Id], [Nombre]) VALUES (1, N'Mario')
INSERT [dbo].[Profesores] ([Id], [Nombre]) VALUES (2, N'esteban')
INSERT [dbo].[Profesores] ([Id], [Nombre]) VALUES (4, N'carlos')
SET IDENTITY_INSERT [dbo].[Profesores] OFF
GO
SET IDENTITY_INSERT [dbo].[Notas] ON 

INSERT [dbo].[Notas] ([Id], [Nombre], [Valor], [IdProfesor], [IdEstudiante]) VALUES (1, N'Ciencias', 10, 1, 1)
INSERT [dbo].[Notas] ([Id], [Nombre], [Valor], [IdProfesor], [IdEstudiante]) VALUES (2, N'Sociales', 10, 1, 1)
SET IDENTITY_INSERT [dbo].[Notas] OFF
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241029103057_InitialCreate', N'8.0.10')
GO
