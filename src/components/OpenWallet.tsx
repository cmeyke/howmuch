import { InputAddress } from './InputAddress'

type OpenWalletParameterType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

declare let window: any

export const OpenWallet = ({
  address,
  setAddress
}: OpenWalletParameterType) => {
  async function getAddress () {
    try {
      // console.log('getAddress')
      const [selectedAddress] = await window.ethereum.request({
        method: 'eth_accounts'
      })
      setAddress(selectedAddress)
    } catch (e) {
      console.error(e)
    }
  }

  async function connectWallet () {
    try {
      // console.log('connectWallet')
      const [selectedAddress] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      setAddress(selectedAddress)
    } catch (e) {
      console.error(e)
    }
  }

  if (address && address !== 'change') return <div></div>
  // console.log('OpenWallet')

  if (window.ethereum === undefined) {
    return (
      <div>
        <div>Please install MetaMask or</div>
        <div>
          <InputAddress setAddress={setAddress} />
        </div>
      </div>
    )
  }

  if (!address) {
    getAddress()
  }

  if (!address || address === 'change') {
    window.document.title = 'Please connect wallet'
    return (
      <div>
        <button onClick={connectWallet}>Please connect wallet</button> or
        <div>
          <InputAddress setAddress={setAddress} />
        </div>
      </div>
    )
  }

  return <div></div>
}
