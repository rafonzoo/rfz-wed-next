import Link from 'next/link'

const Homepage = async () => {
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
      <Link href={`/yossy-rafa?to=${encodeURI('alif')}`}>
        Go to RFZ UI page
      </Link>
    </main>
  )
}

export default Homepage
