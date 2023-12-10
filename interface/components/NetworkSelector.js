import { useNetwork } from 'wagmi'
import { useSwitchNetwork } from 'wagmi'
import { CHAINS } from '../content/deployments'

export default function NetworkSelector() {
  const network = useNetwork()
  const currentChain = network?.chain

  const { switchNetwork } = useSwitchNetwork()

  return (
    <div>
      {CHAINS.map((chain, i) => (
        <span key={i}>
          <input
            type='radio'
            name='chain'
            id={chain.wagmi.id}
            value={chain.wagmi.id}
            checked={currentChain?.id === chain.wagmi.id}
            onChange={() => switchNetwork && switchNetwork(chain.wagmi.id)}
            className='mr-1'
          />
          <label htmlFor={chain.wagmi.id} className='mr-4'>{chain.name}</label>
        </span>
      ))}
    </div>
  )
}
