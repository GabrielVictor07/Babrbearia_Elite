
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mysql2 = require('mysql2');
const port = 3000;

const mysql2 = require('mysql2');

const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'barbearia_elite_db'
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados!');
    connection.release();
}
);

app.post('/clientes', (req, res) => {
    const { nome, telefone, email } = req.body;
    const sql = 'INSERT INTO cliente (nome_cliente, telefone_cliente, email_cliente) VALUES (?, ?, ?)';
    db.query(sql, [nome, telefone, email], (err, result) => {
        if (err) {
            console.error('Erro ao inserir cliente:', err);
            res.status(500).json({ error: 'Erro ao inserir cliente' });
            return;
        }
        res.status(201).json({ message: 'Cliente inserido com sucesso', clienteId: result.insertId });
    });
});

app.post('/agendamentos', (req, res) => {
    const { data, horario, servicos, clienteId } = req.body;


    if (!data || !horario || !servicos || !clienteId) {
        return res.status(400).json({ error: 'Campos obrigatórios: data, horario, servicos, clienteId' });
    }

    const sql = 'INSERT INTO agendamento (data_agendamento, horario_agendamento, servico_desejado, id_cliente) VALUES (?, ?, ?, ?)';
    db.query(sql, [data, horario, servicos, clienteId], (err, result) => {
        if (err) {
            console.error('Erro ao inserir agendamento:', err);
            return res.status(500).json({ error: 'Erro ao inserir agendamento' });
        }
        res.status(201).json({ message: 'Agendamento inserido com sucesso', agendamentoId: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

