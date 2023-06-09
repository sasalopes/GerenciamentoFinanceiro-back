const dotenv = require("dotenv");
dotenv.config();
const { connection, authenticate } = require("./database");
const { DataTypes } = require('sequelize');

// Definição do modelo da tabela
const User = connection.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pagamentoLembrete: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Função para iniciar o banco de dados com dados pre-estabelecidos
async function initiateDB() {
  try {
    await authenticate(connection);

    if (process.env.DB_FORCE === 'TRUE') {
      await connection.sync({ force: true });
    } else {
      await connection.sync();
    }

    // Criar a tabela User
    await User.sync();

    console.log('Tabela User criada com sucesso!');
  } catch (err) {
    console.log(err);
  }
}

module.exports = initiateDB;