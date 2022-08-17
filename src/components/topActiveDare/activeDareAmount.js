import * as React from 'react'
import BigNumber from 'bignumber.js'

const timestamp = Math.floor(Date.now() / 1000)
const TopActiveDare = `
{
  tasks(where: { endTask_gt:"${timestamp}", finished: false }, orderBy:amount, orderDirection:desc, first: 1) 
  {
      amount
      participants
  }
}
`

export default function ActiveDareAmount() {
  const tad = useTAD()
  const matic = usePrice()

  return (
    <div>
      <ul>
        {tad.map(tad => (
          <li key={tad.participants}>
            ({tad.participants}) ${((tad.amount / 1e18) * matic).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

function useTAD() {
  const [tad, setTAD] = React.useState([])

  React.useEffect(() => {
    fetch('https://api.thegraph.com/subgraphs/name/nerveglobal/nerveglobal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: TopActiveDare })
    })
      .then(response => response.json())
      .then(data => setTAD(data.data.tasks))
  }, [])

  return tad
}

function usePrice() {
  const [maticPrice, setPrice] = React.useState([])

  React.useEffect(async () => {
    const maticPrice = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`)
    const priceUst = await maticPrice.json()
    const matic = new BigNumber(priceUst['matic-network'].usd)
    setPrice(new BigNumber(matic))
  }, [])

  return maticPrice
}
