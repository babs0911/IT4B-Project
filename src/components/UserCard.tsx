import type { User } from '../types'

// Props typing: explicit interface for component props.
interface UserCardProps {
  user: User
  onClick: () => void
}

// Event handler typing: onClick is a function that takes no arguments and returns void.
function UserCard({ user, onClick }: UserCardProps) {
  return (
    <article className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <button type="button" onClick={onClick}>
        Select user
      </button>
    </article>
  )
}

export default UserCard