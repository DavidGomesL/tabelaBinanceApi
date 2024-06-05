import './App.css'
import { useEffect, useState } from 'react' //Importa os hook's para uso no código
import Table from 'react-bootstrap/Table'

function App() {

  const [dados, setDados] = useState([]) //usado para definição do estado que será usado.

  useEffect(() => { //usado para consumo da API através do uso de Try/Catch
    try {
      //Função criada para consumir a API
      async function dadosBinance (){
        let response = await fetch("https://testnet.binance.vision/api/v1/klines?symbol=BTCUSDT&interval=1m") //Fetch com parâmetros para consumo da API
        let dados = await response.json() //Transição dos dados para JSON
        setDados(dados) //Esta pegando o estado dos dados atuais que estão sendo enviados pela API
        console.log(dados) //Confirmando a impressão no console dos dados que estão sendo consumidos da API
    }
    dadosBinance() //Chama a função
  } catch {
      console.log("Erro") //Passa a mensagem de erro no console, caso não sejam consumidos os dados
    }
    
  }, [])

  return (
    <>
      <div className='body'>
        <table>
          <thead>
            <tr>
              <th>Horário de Abertura</th>
              <th>Valor de Abertura</th>
              <th>Valor Máximo</th>
              <th>Valor Mínimo</th>
              <th>Valor de Fechamento</th>
              <th>Horário de Fechamento</th>
            </tr>
          </thead>
          <tbody>
            {/* O map está sendo utilizado para pecorrer os dados do array que está sendo consumido na API */}
          {dados.map((item, index) => {
            {/*O index será usado como a chave do arrey para identificação dos componentes que serão utilizados na tabela*/}
            if (index >= 400 && index <= 443) { // Pecorre dos dados dos arreys entre da posição 400 a 443
              return (
                <tr key={index}>
                  {/*configura o dado do index 0 como uma data */}
                  <td>{new Date(item[0]).toLocaleString()}</td> 
                  {/*consome nas td's os index informados vinculando ao parametro item que está sendo declarado*/}
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                  <td>{new Date(item[6]).toLocaleString()}</td>
                </tr>
              );
            }
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
