 -- ESTE SCRIPT PRUEBA EL CORRECTO FUNCIONAMIENTO DE LA TABLA COACHES
 USE FutureSkillCoachDb;completas
 
 -------------------------------------------------------------------------------------------------
 -- INSERTS DE PRUEBA 
 	INSERT INTO Coaches(  Fullname, Specialty, Email )
 	VALUES('Luis Lopez', ' Especialista en Fuerza e Hipertrofia ' , 'lopez2345@gmail.com');
 	
 	INSERT INTO Coaches(  Fullname, Specialty, Email )
 	VALUES('Lara Croft', ' Entrenadora IFBB Pro' , 'lara28@gmail.com');
 	
 	-- SELECCIONA LOS COACHES AGREGADOS 
 	SELECT *
 	FROM Coaches;
 -------------------------------------------------------------------------------------------------
 	-- ESTE SCRIPT SE ENCARGA DE VERIFICAR LA RELACION CLIENTES- COACHES 

 USE FutureSkillCoachDb;

-- VERIFICA QUE EXISTA LA TABLA CLIENTS
	SELECT 
	    TABLE_NAME
	FROM INFORMATION_SCHEMA.TABLES
	WHERE TABLE_NAME = 'Clients';
	
	
 
------------------------------------------------------------------------------------------------------------------  
  
--CONFIRMA QUE SE TENGAN CAMPOS REQUERIDOS
	SELECT 
	    COLUMN_NAME,
	    DATA_TYPE,
	    CHARACTER_MAXIMUM_LENGTH,
	    IS_NULLABLE
	FROM INFORMATION_SCHEMA.COLUMNS
	WHERE TABLE_NAME = 'Clients'
	ORDER BY ORDINAL_POSITION;

--------------------------------------------------------------------------------------------------------------------

-- VERIFICA QUE  COACHID REALMENTE SEA CLAVE FORANEA A COACHES
	
	SELECT 
	    fk.name AS ForeignKeyName,
	    OBJECT_NAME(fk.parent_object_id) AS TablaOrigen,
	    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS ColumnaOrigen,
	    OBJECT_NAME(fk.referenced_object_id) AS TablaReferenciada,
	    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS ColumnaReferenciada
	FROM sys.foreign_keys fk
	INNER JOIN sys.foreign_key_columns fkc 
	    ON fk.object_id = fkc.constraint_object_id
	WHERE OBJECT_NAME(fk.parent_object_id) = 'Clients';
-------------------------------------------------------------------------------------------------------------------

-- VERIFICA RELACIÓN ENTRE CLIENTS Y COACHES 

		
	INSERT INTO Clients (FullName, Email, Goal, CoachId)
	VALUES ('Pedro Ramirez', 'pedro.ramirez@gmail.com', 'Ganar masa muscular', 1);
	
	
	INSERT INTO Clients (FullName, Email, Goal, CoachId)
	VALUES ('Andrea Mora', 'andrea.mora@gmail.com', 'Mejorar resistencia física', 1);
	
	
	
	
	SELECT *
	FROM Clients;

-------------------------------------------------------------------------------------------------------------------
	
--MUESTRA  LOS NUEVOS CLIENTES CON SUS COACHES 
	

	SELECT 
    c.ClientId,
    c.FullName AS ClientName,
    c.Email AS ClientEmail,
    c.Goal,
    co.CoachId,
    co.FullName AS CoachName,
    co.Specialty,
    co.Email AS CoachEmail
FROM Clients c
INNER JOIN Coaches co 
    ON c.CoachId = co.CoachId;

--  ESTE SCRIPT VERIFICA EL FUNCIONAMIENTO DE TABLA CLIENTES 
 USE FutureSkillCoachDb;
 
 
----------------------------------------------------------------------------
-- VERIFICA QUE EXISTE LA TABLA CLIENTS

	
	SELECT 
	    TABLE_NAME
	FROM INFORMATION_SCHEMA.TABLES
	WHERE TABLE_NAME = 'Clients';
--------------------------------------------------------------------------
	

-- VERIFICA QUE ESTEN LOS CAMPOS NECESARIOS 
	
	SELECT 
	    COLUMN_NAME,
	    DATA_TYPE,
	    CHARACTER_MAXIMUM_LENGTH,
	    IS_NULLABLE
	FROM INFORMATION_SCHEMA.COLUMNS
	WHERE TABLE_NAME = 'Clients'
	ORDER BY ORDINAL_POSITION;
	


-- VERIFICA QUE LOS DATOS PROVENGAN DE SQLSERVER
		
		SELECT 
		    @@SERVERNAME AS SqlServerInstance,
		    DB_NAME() AS CurrentDatabase,
		    GETDATE() AS QueryExecutionDate;
		

-- VER CLIENTES REGISTRADOS 

SELECT 
    ClientId,
    FullName,
    Email,
    Goal,
    CoachId
FROM Clients;

--CITAS COMPLETA
 USE FutureSkillCoachDb;
	 
SELECT 
    a.AppointmentId,
    a.[Date],
    a.[Time],
    a.Topic,
    a.Status,

    c.ClientId,
    c.FullName AS ClientName,
    c.Email AS ClientEmail,
    c.Goal AS ClientGoal,

    co.CoachId,
    co.FullName AS CoachName,
    co.Specialty AS CoachSpecialty,
    co.Email AS CoachEmail
FROM Appointments a
INNER JOIN Clients c
    ON a.ClientId = c.ClientId
INNER JOIN Coaches co
    ON a.CoachId = co.CoachId
ORDER BY a.[Date], a.[Time];
	
-------------------------------------------------------------------------------------------------------------------
	
