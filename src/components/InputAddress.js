import React, { useState } from 'react'

export const InputAddress = ({ setAddress }) => {
  const [inputAddress, setInputAddress] = useState('')

  const handleAddressChange = event => {
    setInputAddress(event.target.value)
  }

  return (
    <div>
      <input type='text' value={inputAddress} onChange={handleAddressChange} />
      <button onClick={() => setAddress(inputAddress)}>Provide address</button>
    </div>
  )
}
