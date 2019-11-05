import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/*
  Register user, as a simple example I am just passing the password
  *****************************************************************************
  Cadastrar usuario, como é um exemplo simples estou passando só o password
*/
app.post('/store', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 8);
  return res.send(hash);
});

/* 
  I check if the user's password is valid, compare the current password with 
  the hash generated in the register
  *****************************************************************************
  Verifico se o password do usuário é válido, comparo a senha atual com o hash 
  gerado no cadastro 
*/
function checkPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/*
  In this case of login, I only pass the password to perform the verification
  *****************************************************************************
  Neste caso do login, passo apenas o password para realizar a verificação
*/
app.post('/login', async (req, res) => {
/*
  Save the hash generated in the register
  ***************************************
  Salvo o hash gerado no cadastro
*/
  const hash = '$2a$08$qLSitkEHuUXIabykKXt6lukjP4uEI09BUIEkiiKgG7XPTHwHgyxc.';
  if (!(await checkPassword(req.body.password, hash))) {
    return res.status(401).json({ error: 'Password does not valid' });
  }
  return res.status(200).json({ error: 'Password is valid' });
});

// Below is a node chosen for the node to run.
// A baixo é escolhido uma pora para o node rodar
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port`);
});
