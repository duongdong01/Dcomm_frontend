import Auth from '@/api/auth'
import User from '@/api/user'
import Friend from '@/api/friend'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    user: User(context.$axios),
    friend: Friend(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
