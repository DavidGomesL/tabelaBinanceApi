import './App.css'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'

function App() {

  const [dados, setDados] = useState([])

  useEffect(() => {
    try {
      async function dadosBinance (){
        let response = await fetch("https://testnet.binance.vision/api/v1/klines?symbol=BTCUSDT&interval=1m")
        let dados = await response.json()
        setDados(dados)
        console.log(dados)
    }
    dadosBinance()
  } catch {
      console.log("Erro")
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
          {dados.map((item, index) => {
            if (index >= 400 && index <= 443) { // Verifica se é o último item
              return (
                <tr key={index}>
                  <td>{new Date(item[0]).toLocaleString()}</td>
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
