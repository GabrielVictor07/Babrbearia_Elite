
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const port = 3000;

const db = require('./db.js');

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


app.get('/agendamentos', (req, res) => {
    const sql = `
        SELECT a.id_agendamento, a.data_agendamento, a.horario_agendamento, a.servico_desejado,
               c.id_cliente, c.nome_cliente, c.telefone_cliente, c.email_cliente
        FROM agendamento a
        JOIN cliente c ON a.id_cliente = c.id_cliente
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar agendamentos:', err);
            return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
        }
        res.status(200).json(results);
    });
});

app.delete('/agendamentos/:id', (req, res) => {
    const agendamentoId = req.params.id;
    const sql = 'DELETE FROM agendamento WHERE id_agendamento = ?';
    db.query(sql, [agendamentoId], (err, result) => {
        if (err) {
            console.error('Erro ao deletar agendamento:', err);
            return res.status(500).json({ error: 'Erro ao deletar agendamento' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }
        res.status(200).json({ message: 'Agendamento deletado com sucesso' });
    }
);
}
);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

