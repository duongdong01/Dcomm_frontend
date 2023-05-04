import Auth from '@/api/auth'
import User from '@/api/user'
import Friend from '@/api/friend'
import Upload from '@/api/upload'
import Post from '@/api/post'
import Reaction from '@/api/reaction'
import Comment from '@/api/comment'
import Search from '@/api/search'
import Token from '@/api/token'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    auth: Auth(context.$axios),
    user: User(context.$axios),
    friend: Friend(context.$axios),
    upload: Upload(context.$axios),
    post: Post(context.$axios),
    reaction: Reaction(context.$axios),
    comment: Comment(context.$axios),
    search: Search(context.$axios),
    token: Token(context.$axios)
  }

  // Inject $api
  inject('api', factories)
}
