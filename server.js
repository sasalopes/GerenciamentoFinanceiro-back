const cors = require("cors");
const express = require('express');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON
app.use(morgan("dev"));

// Configurações de acesso
app.use(cors({ origin: "http://localhost:3000" }));

// Configuração do Banco de Dados
const initiateDB = require("./database/initiateDB");
initiateDB();


// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
  host: 'seu_host_de_email',
  port: 587,
  secure: false,
  auth: {
    user: 'seu_email',
    pass: 'sua_senha',
  },
});

// Função para enviar e-mail de lembrete
const enviarLembretePorEmail = async (destinatario, assunto, conteudo) => {
  try {
    await transporter.sendMail({
      from: 'seu_email',
      to: destinatario,
      subject: assunto,
      text: conteudo,
    });
    console.log('E-mail de lembrete enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar e-mail de lembrete:', error);
  }
};

// Configuração das rotas
app.get('/', (req, res) => {
  const destinatario = 'destinatario@example.com';
  const assunto = 'Lembrete de pagamento';
  const conteudo = 'Não se esqueça de pagar a fatura até o dia X.';

  enviarLembretePorEmail(destinatario, assunto, conteudo);

  res.send('E-mail de lembrete enviado.');
});

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});