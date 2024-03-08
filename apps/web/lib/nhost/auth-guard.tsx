import { redirect } from 'next/navigation'
import { getNhost } from './nhost'

const withAuthAsync =
  <P extends {}>(Component: React.FunctionComponent<P>) =>
  async (props: P) => {
    const nhost = await getNhost()
    const session = nhost.auth.getSession()

    if (!session) {
      redirect('/auth/sign-in')
    }

    return <Component {...props} />
  }

withAuthAsync.displayName = 'withAuthAsync'

export default withAuthAsync
