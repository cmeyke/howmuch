import React, { useState } from 'react'

type InputAddressParameterType = {
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

export const InputAddress = ({ setAddress }: InputAddressParameterType) => {
  const [inputAddress, setInputAddress] = useState('')

  const handleAddressChange = (event: any) => {
    setInputAddress(event.target.value)
  }

  return (
    <div>
      <input type='text' value={inputAddress} onChange={handleAddressChange} />
      <button onClick={() => setAddress(inputAddress)}>Provide address</button>
    </div>
  )
}
