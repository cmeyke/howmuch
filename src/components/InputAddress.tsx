import React, { useState } from 'react'

type InputAddressParameterType = {
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export const InputAddress = ({ setAddress }: InputAddressParameterType) => {
  const [inputAddress, setInputAddress] = useState('')

  const handleAddressChange = (event: any) => {
    setInputAddress(event.target.value)
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13 && inputAddress) setAddress(inputAddress)
  }

  return (
    <div>
      <input
        type='text'
        value={inputAddress}
        onChange={handleAddressChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          if (inputAddress) setAddress(inputAddress)
        }}
      >
        Provide address
      </button>
    </div>
  )
}
