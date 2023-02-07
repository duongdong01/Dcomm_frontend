import Auth from '@/api/auth'
import PostUser from '~/api/post-user'
// import Blog from '@/api/blog'
// import Settings from '@/api/settings'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    post_user: PostUser(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
