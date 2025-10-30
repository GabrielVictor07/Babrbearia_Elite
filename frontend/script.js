const apiurlCliente = 'http://localhost:3000/clientes'
const apiurlAgendamento = 'http://localhost:3000/agendamentos'

const form = document.getElementById('form')
const btn_agendar = document.getElementById('btn_agendar')

btn_agendar.addEventListener('click', async (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome_cliente').value
    const telefone = document.getElementById('telefone_cliente').value
    const email = document.getElementById('email_cliente').value
    const data = document.getElementById('data_agendamento').value
    const horario = document.getElementById('horario_agendamento').value
    const servicos = document.getElementById('servico_desejado').value
    console.log(nome, telefone, email, data, horario, servicos)

    if (!nome || !telefone || !email || !data || !horario || !servicos) {
        alert('Por favor, preencha todos os campos.')
        return
    }

    try {
        const clienteResponse = await fetch(apiurlCliente, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, telefone, email })
        })
        if (!clienteResponse.ok) {
            throw new Error('Erro ao cadastrar cliente')
        }
        const clienteData = await clienteResponse.json()
        console.log('Cliente cadastrado:', clienteData)
        const clienteId = clienteData.clienteId || clienteData.id || null
        console.log('clienteId usado para agendamento:', clienteId)
        
        const agendamentoResponse = await fetch(apiurlAgendamento, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, horario, servicos, clienteId })
        })
        if (!agendamentoResponse.ok) {
            throw new Error('Erro ao cadastrar agendamento')
        }
        const agendamentoData = await agendamentoResponse.json()
        console.log('Agendamento cadastrado:', agendamentoData)
        alert('Agendamento realizado com sucesso!')
        form.reset()
    } catch (error) {
        console.error('Erro:', error)
        alert('Ocorreu um erro ao processar seu agendamento. Tente novamente mais tarde.')
    }
})  