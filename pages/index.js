import Link from "next/link";
import { client, SanityImage } from "../lib/client";
import Image from "next/image";


export default function Home({category}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:gap-4">
      {/* <Products {...{products}} /> */}
      {category.map((item, i)=>(
        <div key={i} className='cursor-pointer p-6 w-[22rem] mx-auto md:w-full md:p-4 xl:p-6 '>
          <Link href={`/category/${item.name}`}>
            <div className="relative">
              <Image className="" {...SanityImage(item.image)} alt={item.name}/>
              <div className="absolute inset-0 text-center flex justify-center items-center bg-[#2228]">
                <h2 className="text-2xl font-bold text-[#fefefe]">{item.name}</h2>
              </div>
            </div>
          </Link>
        </div>
  ))}
    </div>
  )
}

export const getServerSideProps = async () => {
  const queryParts = '*[_type == "part"]'
  const queryCategory = '*[_type == "category"]'
  const parts = await client.fetch(queryParts)
  const category = await client.fetch(queryCategory)

  return {
    props: {
      parts,
      category
    }
  }
}