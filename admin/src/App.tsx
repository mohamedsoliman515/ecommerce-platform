import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
const App = () => {
  return (
     <>
     <h1></h1>
      <header>

        <Show when="signed-out">
          <SignInButton/>
          <SignUpButton/>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>


    </>
  )
}

export default App