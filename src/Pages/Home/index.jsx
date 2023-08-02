import { useState, useEffect } from 'react' //Para guardar la información suministrada por la API. Con useEffect se busca el consumo de la API
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'

function Home() {
  const [items, setItems] = useState(null)
  
  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(data => setItems(data))
  }, [])

    return (
      <Layout>
        Home
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {
            items?.map(item => (
              <Card key={item.id} data={item} />
              ))
          }
        </div>
        
        
      </Layout>
    )
  }
  
  export default Home
  