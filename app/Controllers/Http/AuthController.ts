import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class AuthController {
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async redirect({ ally }: HttpContextContract) {
    return ally.use('github').redirect()
  }

  public async callback({ ally, auth, response }: HttpContextContract) {
    const github = ally.use('github')
    /**
     * User has explicitly denied the login request
     */
    if (github.accessDenied()) {
      return 'Access was denied'
    }
    /**
     * Unable to verify the CSRF state
     */
    if (github.stateMisMatch()) {
      return 'Request expired. Retry again'
    }
    /**
     * There was an unknown error during the redirect
     */
    if (github.hasError()) {
      return github.getError()
    }
    const githubUser = await github.user()
    /**
     * Unverified account
     */
    if (githubUser.emailVerificationState !== 'verified') {
      return 'Only verified github accounts are allowed'
    }
    /**
     * Find the user by email or create
     * a new one
     */
    const user = await User.firstOrCreate(
      {
        email: githubUser.email!,
      },
      {
        name: githubUser.name!,
        accessToken: githubUser.token.token,
      }
    )
    /**
     * Login user using the web guard
     */
    await auth.use('web').login(user, true)
    return response.redirect('/dashboard')
  }
}
