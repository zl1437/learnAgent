import { NavLink, Navigate, useParams } from 'react-router-dom'
import { defaultDocId, docs } from './docs'
import { MarkdownPage } from './MarkdownPage'
import './App.css'

export function DocShell() {
  const { docId } = useParams<{ docId: string }>()
  const doc = docId ? docs.find((d) => d.id === docId) : undefined

  if (!doc) {
    return <Navigate to={`/${defaultDocId}`} replace />
  }

  return (
    <div className="layout">
      <aside className="sidebar" aria-label="文档目录">
        <header className="sidebar-header">
          <NavLink to={`/${defaultDocId}`} className="brand-link" end>
            <h1 className="brand">Learn Agent</h1>
            <p className="brand-sub">本地文档</p>
          </NavLink>
        </header>
        <nav className="nav">
          <ul>
            {docs.map((d) => (
              <li key={d.id}>
                <NavLink
                  to={`/${d.id}`}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  {d.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="main">
        <MarkdownPage markdown={doc.content} />
      </main>
    </div>
  )
}
