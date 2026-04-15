CREATE DATABASE servidor_local;
CREATE TABLE IF NOT EXISTS tbl_prestadores(
	id VARCHAR(255) PRIMARY KEY NOT NULL, 
	nif INT NOT NULL,
    precoHora DECIMAL(10, 2) NOT NULL,
	taxaUrgencia DECIMAL(10, 3),
	percentagemDesconto DECIMAL(10, 3),
	minimoDesconto DECIMAL(10, 2),
	disponivel BOOLEAN NOT NULL,
	profissao VARCHAR(100)  NOT NULL ,
	enabled BOOLEAN NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);
ALTER TABLE tbl_prestadores
DROP COLUMN taxaUrgencia,
ADD COLUMN taxa_urgencia DECIMAL(10, 3) AFTER profissao,
DROP COLUMN minimoDesconto,
ADD COLUMN minimo_desconto DECIMAL(10, 3) AFTER taxa_urgencia,
DROP COLUMN percentagemDesconto,
ADD COLUMN percentagem_desconto DECIMAL(10, 3) AFTER minimo_desconto,
DROP COLUMN precoHora
;

CREATE TABLE IF NOT EXISTS tbl_utilizadores(
id VARCHAR(255) PRIMARY KEY NOT NULL,
	nome VARCHAR(50) NOT NULL,
	numero_identificacao VARCHAR(100) NOT NULL,
	data_nascimento DATE NOT NULL,
	email VARCHAR(100) NOT NULL,
	`password`  VARCHAR(255) NOT NULL, 
	telefone VARCHAR(20),
	pais VARCHAR(100) NOT NULL,
	localidade VARCHAR(100) NOT NULL,
	enabled BOOLEAN NOT NULL,
	created_at DATETIME NOT NULL,
	update_at DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS tbl_servicos(
id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(50) NOT NULL,
descricao VARCHAR(50),
categoria VARCHAR(20) NOT NULL,
created_at DATETIME NOT NULL,
update_at DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS `tbl_orcamento`(
id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
valor_total DOUBLE NOT NULL,
id_utilizadores varchar(255) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at datetime NOT NULL,
updated_at datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_prestacao_servico(
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
id_prestador VARCHAR(255) NOT NULL,
id_servicos INTEGER NOT NULL,
id_orcamento INTEGER,
designacao VARCHAR(100) NOT NULL,
sub_total DOUBLE NOT NULL,
horas_estimadas INTEGER,
preco_hora DOUBLE,
estado ENUM('pendente', 'em_progresso', 'finalizado', 'cancelado') NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_proposta(
id INTEGER PRIMARY KEY NOT NULL,
id_prestacao_servico INTEGER NOT NULL,
	preco_hora DOUBLE NOT NULL,
	horas_estimadas integer NOT NULL,
	estados ENUM ('aceito', 'recusado') NOT NULL,
	created_at DATETIME NOT NULL,
	updated_at DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `tbl_empresa` (
     id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
     designacao VARCHAR(255) NOT NULL,
     descricao VARCHAR(255),
     localizacao Varchar(255) NOT NULL,
     nif DOUBLE NOT NULL UNIQUE,
     icone VARCHAR(255) ,
     id_utilizador VARCHAR(255) NOT NULL,
     enabled BOOLEAN NOT NULL,
     created_at DATETIME NOT NULL,
     updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `tbl_categoria` (
     id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
     designacao VARCHAR(255) NOT NULL,
     icone VARCHAR(255),
     created_at DATETIME NOT NULL,
     updated_at DATETIME NOT NULL

);

ALTER TABLE tbl_empresa
  ADD CONSTRAINT fk_utilizador_empresa
  FOREIGN KEY (id_utilizador)
  REFERENCES tbl_utilizadores(id)
;

ALTER TABLE tbl_servicos
    DROP COLUMN categoria,
    ADD COLUMN id_categoria INTEGER AFTER descricao,
    ADD CONSTRAINT fk_categoria_servico
    FOREIGN KEY (id_categoria)
    REFERENCES tbl_categoria (id)
;

ALTER TABLE tbl_prestacao_servico
  ADD COLUMN urgente BOOLEAN AFTER id_orcamento
;
    
    
ALTER TABLE tbl_proposta
ADD CONSTRAINT fk_prestacao_servico
FOREIGN KEY (id_prestacao_servico)
REFERENCES tbl_prestacao_servico(id)
;

ALTER TABLE tbl_utilizadores
    ADD COLUMN `role` ENUM("cliente", "admin", "prestador", "empresa") default "cliente"
;

ALTER TABLE tbl_prestadores
   ADD COLUMN id_empresa INTEGER,
   ADD CONSTRAINT fk_empresa_prestadores
   FOREIGN KEY (id_empresa)
   REFERENCES tbl_empresa(id)
;

ALTER TABLE tbl_prestacao_servico
       ADD COLUMN id_empresa INTEGER,
       ADD COLUMN tipo_prestador ENUM ("empresa", "particular"),
       ADD CONSTRAINT fk_empresa_prestacao_servico
       FOREIGN KEY (id_empresa)
       REFERENCES tbl_empresa(id)
;

ALTER TABLE tbl_prestacao_servico
ADD CONSTRAINT id_prestador
FOREIGN KEY (id_prestador)
REFERENCES tbl_prestadores(id),
ADD CONSTRAINT id_servicos
FOREIGN KEY (id_servicos)
REFERENCES tbl_servicos(id)
;

ALTER TABLE tbl_prestacao_servico
DROP FOREIGN KEY id_servicos;

ALTER TABLE tbl_servicos
ADD COLUMN enabled BOOLEAN NOT NULL AFTER categoria;

ALTER TABLE tbl_servicos
DROP COLUMN updated_at;

ALTER TABLE tbl_servicos
MODIFY COLUMN categoria VARCHAR(100);

