const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;


// Configurações do OAuth2 para autenticação com a conta do Google
const oauth2Client = new OAuth2(
  'CLIENT_ID',
  'CLIENT_SECRET',
  'REDIRECT_URL'
);

// Configurações do Nodemailer para o Gmail (SMTP)
const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'seu-email@gmail.com',
    clientId: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    refreshToken: 'REFRESH_TOKEN',
    // accessToken: 'ACCESS_TOKEN', // Remova essa propriedade
  }
});

// Função para enviar o email
async function enviarLembretePagamento(destinatario, assunto, conteudo) {
  try {
    const emailOptions = {
      from: destinatario, // Usando o email do usuário logado como remetente
      to: destinatario,
      subject: assunto,
      text: conteudo,
    };

    // Enviar o email usando o transporte SMTP do Gmail
    await smtpTransport.sendMail(emailOptions);

    console.log('Lembrete de pagamento enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar lembrete de pagamento:', error);
  }
}

// Exemplo de uso
const destinatario = 'seu-email@gmail.com'; // Obtendo o email do usuário logado
const assunto = 'Lembrete de pagamento';
const conteudo = 'Lembrete de pagamento: Por favor, faça o pagamento até a data X.';

enviarLembretePagamento(destinatario, assunto, conteudo);