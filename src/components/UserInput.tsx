import React from 'react'

type UserInputParameterType = {
  address: string
  setAddress: React.Dispatch<React.SetStateAction<string>>
  reload: number
  setReload: React.Dispatch<React.SetStateAction<number>>
}

export const UserInput = ({
  address,
  setAddress,
  reload,
  setReload
}: UserInputParameterType) => {
  if (address === 'change') return <div></div>
  return (
    <div>
      {address ? (
        <div>
          <button onClick={() => setReload(reload + 1)}>Reload</button>
          <button onClick={() => setAddress('change')}>Change address</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
