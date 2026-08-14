import { useState } from 'react'
import type { User } from '../types'

interface UserCardProps {
  user: User
  onSelect: (user: User) => void
}

function UserCard({ user, onSelect }: UserCardProps) {
  const [note, setNote] = useState('')
  const statusClasses = user.isActive
    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{user.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${statusClasses}`}>
          {user.role}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">{user.isActive ? 'Active member' : 'Inactive account'}</p>
        <button
          type="button"
          onClick={() => onSelect(user)}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
        >
          Select
        </button>
      </div>

      <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
        Quick note
      </label>
      <input
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Add a short note"
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200/80 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
      />
    </article>
  )
}

export default UserCard