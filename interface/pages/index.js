import Head from 'next/head'
import FontWrapper from '../components/FontWrapper'
import { NAME, DESCRIPTION } from '../content/metadata'
import MintingInterface from '../components/MintingInterface'

export default function Home() {
  return (
    <>
      <Head>
        <title>{NAME}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <FontWrapper>
          <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 p-10 bg-gray-200'>
            <div className='p-8'>
              <div className='p-8 flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-medium text-center mb-2'>PEAKDEFI Burner 🔥</h1>
                <p className='text-center'>{DESCRIPTION}</p>
                <a className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href='https://peak-minter.netlify.app/'>
                  I want to mint!
                </a>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center p-8'>
              <div className='shadow-xl rounded-3xl p-8 bg-gray-50 w-full h-full'>
                <MintingInterface />
              </div>
            </div>
          </div>
        </FontWrapper>
      </main >
    </>
  )
}
