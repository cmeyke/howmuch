import Web3 from "web3"
import { InputAddress, checkAndSetAddress } from "./InputAddress"

type OpenWalletParameterType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export const OpenWallet = ({
  address,
  setAddress,
}: OpenWalletParameterType) => {
  async function getAddress() {
    if (Web3.givenProvider !== null)
      try {
        // console.log('getAddress')
        const [selectedAddress] = await Web3.givenProvider.request({
          method: "eth_accounts",
        })
        checkAndSetAddress(selectedAddress, setAddress)
      } catch (e) {
        console.error(e)
      }
  }

  async function connectWallet() {
    if (Web3.givenProvider !== null)
      try {
        // console.log('connectWallet')
        const [selectedAddress] = await Web3.givenProvider.request({
          method: "eth_requestAccounts",
        })
        checkAndSetAddress(selectedAddress, setAddress)
      } catch (e) {
        console.error(e)
      }
  }

  if (address && address !== "change") return <div></div>
  // console.log('OpenWallet')

  if (!address) {
    getAddress()
  }

  if (!address || address === "change") {
    window.document.title = "Connect wallet"
    return (
      <InputAddress setAddress={setAddress} connectWallet={connectWallet} />
    )
  }

  return <div></div>
}
