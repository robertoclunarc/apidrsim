import { environments } from './enviroments/enviroment';
import express from 'express'
import axios from 'axios';
import morgan from 'morgan';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const env = environments;
const port = process.env.PORT || env.PORT;


const config = {
  headers: {
    DSIM_KEY: env.DSIM_KEY,
    DSIM_SECRET: env.DSIM_SECRET,
  },
};

app.get('/drsim/tools/:id_terminal/:id_operador', async (req, res) => {
  const idTerminal=req.params.id_terminal;
  const idOperador=req.params.id_operador;
  try {
    const url = `${env.apiDrSimTools}/${idTerminal}/${idOperador}`;
    const { data } = await axios.get(url, config);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/drsim/create_order/:id_terminal/:id_operador/:imei/:id_servicio', async (req, res) => {
  const idTerminal=req.params.id_terminal;
  const idOperador=req.params.id_operador;
  const imei=req.params.imei;
  const idService=req.params.id_servicio;
  try {
    const url = `${env.apiDrSimCreateOrden}/${idTerminal}/${idOperador}/${imei}/${idService}`;
    const { data } = await axios.post(url, {}, config);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});