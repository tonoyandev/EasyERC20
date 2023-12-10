import { ConnectKitButton } from "connectkit"
import NetworkSelector from "./NetworkSelector"
import { useAccount } from 'wagmi'
import { useEffect, useState } from "react"
import NumberInput from "./NumberInput"
import Button from "./Button"
import { writeContract } from '@wagmi/core'
import { PEAK_TOKEN_ADDRESS } from "../content/deployments"
import { PEAK_TOKEN_ABI } from '../content/factoryABI'


export default function MintingInterface() {
  const { isConnected } = useAccount()
  const [loaded, setLoaded] = useState(false)
  const [supply, setSupply] = useState('0')
  const [waiting, setWaiting] = useState(false)
  const [burned, setBurned] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  // fixes hydration issue
  if (!loaded) {
    return null
  }

  let valid = true
  if (supply < 0) {
    valid = false
  }

  async function deploy() {
    console.log('deploying token')
    setWaiting(true)

    try {
       await writeContract({
        mode: 'recklesslyUnprepared',
        address: PEAK_TOKEN_ADDRESS,
        abi: PEAK_TOKEN_ABI,
        functionName: 'burn',
        args: [supply + "0".repeat(8)]
      })

      setBurned(true)
      setWaiting(false)
    } catch (error) {
      let message = error?.error?.message || "Oups, something goes wrong! Please check devtools"
      alert(message)
      console.log('Execution error', error)
      setWaiting(false)
    }
  }

  function restart() {
    setBurned(false)
  }

  return (
    <>
      <h2 className='text-lg font-medium text-bold mb-2'>1. Connect your wallet</h2>
      <ConnectKitButton />

      {
        isConnected ? (
          <>
            <h2 className='text-lg font-medium text-bold mb-2 mt-4'>2. Select network</h2>
            <form onSubmit={e => e.preventDefault()}>
              <NetworkSelector />
              <div>
                <NumberInput label='3. Amount of PEAK' value={supply} disabled={burned || waiting} onChange={value => {
                  setSupply(value)
                }} />
              </div>
            </form>
            <h2 className='text-lg font-medium text-bold mb-2 mt-4'>4. Execute</h2>
            {
              valid ? (
                waiting ? (
                  <p className='text-gray-500 mt-2'>Waiting for your transaction to be mined...</p>
                ) : (
                  burned ? (
                    <>
                      <p className="mt-2">✅ Tokens was burned! <span className='text-blue-600 cursor-pointer' onClick={restart}>Burn again?</span></p>
                    </>
                  ) : (
                    <Button onClick={deploy}>Burn 🔥🔥🔥</Button>
                  )
                )
              ) : (
                <p className='text-gray-500 mt-2'>Fill out all fields to continue</p>
              )
            }
          </>
        ) : (
          <p className='text-gray-500 mt-2'>Connect your wallet to a supported network to continue</p>
        )
      }
    </>

  )
}
