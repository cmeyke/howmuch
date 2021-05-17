import React, { useState } from 'react'

type InputAddressParameterType = {
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export const InputAddress = ({ setAddress }: InputAddressParameterType) => {
  const [inputAddress, setInputAddress] = useState('')

  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setInputAddress(event.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter' && inputAddress) setAddress(inputAddress)
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
          if (inputAddress) setAddress(inputAddress)
        }}
      >
        Provide address
      </button>
    </div>
  )
}
