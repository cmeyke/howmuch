import { ethers } from 'ethers'
import React, { useState } from 'react'

type InputAddressParameterType = {
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export const checkAndSetAddress = (
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>
) => {
  if (ethers.utils.isAddress(address))
    setAddress(ethers.utils.getAddress(address))
}

export const InputAddress = ({ setAddress }: InputAddressParameterType) => {
  const [inputAddress, setInputAddress] = useState('')

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setInputAddress(event.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter' && inputAddress)
      checkAndSetAddress(inputAddress, setAddress)
  }

  return (
    <div>
      <input
        // ref={inputRef}
        autoFocus
        type='text'
        value={inputAddress}
        onChange={handleAddressChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          if (inputAddress) checkAndSetAddress(inputAddress, setAddress)
        }}
      >
        Provide address
      </button>
    </div>
  )
}
