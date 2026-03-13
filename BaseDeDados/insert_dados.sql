INSERT INTO tbl_utilizadores (
id,
nome, 
numero_identificacao, 
data_nascimento, 
email, 
telefone, 
pais, 
localidade, 
`password`, 
enabled, 
created_at, 
update_at
) VALUES (
	  "4b3a6d78-c6f1-4d58-b49e-897ea7a9ef64",
      "Annette Carvalho",
      "F002E",
      "1999-12-28",
      "varelaannette0@gmail.com",
      "9944431",
      "Cabo Verde",
      "Fogo",
      "$2a$12$tU40XEZU4P.7lpRAFlQohOsnTO0knXZcdVWevCarXVGb9Y71LoII6",
      True,
      NOW(),
      NOW()

);

ALTER TABLE tbl_orcamento
    DROP COLUMN id_prestadores;

INSERT INTO tbl_orcamento(
id,
valor_total,
id_utilizadores,
enabled,
created_at,
updated_at
)VALUES (
		 NULL,
         200,
         "4b3a6d78-c6f1-4d58-b49e-897ea7a9ef64",
         TRUE,
         NOW(),
         NOW()
         );
         
INSERT INTO tbl_servicos (id, nome, descricao, categoria, created_at, update_at) 
VALUES (
    NULL,
    "professor", 
    "aulas", 
    "explicacao", 
    NOW(), 
    NOW()
);


INSERT INTO tbl_prestadores
VALUES(
     "bf8117ca-da09-4c69-b8ae-487423835ee5",
     

)

         
         
    
    
	