create database barbearia_elite_db;
use barbearia_elite_db;

create table cliente (
	id_cliente int auto_increment,
    nome_cliente varchar(100) not null,
    telefone_cliente char(16),
    email_cliente varchar(100),
    primary key (id_cliente)
);

create table agendamento (
	agendamento_id int auto_increment,
    primary key(agendamento_id),
    data_agendamento date not null,
    horario_agendamento time not null,
    servico_desejado enum("Navalhado", "Barba", "Corte Simples", "Cabelo + Barba"),
    id_cliente int,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);
