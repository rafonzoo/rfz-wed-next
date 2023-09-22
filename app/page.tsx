import { getAllWedding } from '@/wedding/query'
import Link from 'next/link'

const Homepage = async () => {
  const weddings = await getAllWedding()

  return (
    <main>
      {/* <p>All wedding:</p>
      <ul>
        {weddings.map((wedding, index) => (
          <li key={index}>
            <Link href={`/${wedding.couple}?to=${encodeURI('alif')}`}>
              Undangan {wedding.couple}
            </Link>
          </li>
        ))}
      </ul> */}
      <Link href='/ui'>Go to RFZ UI page</Link>
    </main>
  )
}

export default Homepage
