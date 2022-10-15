import { Products } from "../components";
import { client } from "../lib/client";


export default function Home({products}) {
  return (
    <div>
      <Products {...{products}} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  return {
    props: {
      products,
    }
  }
}