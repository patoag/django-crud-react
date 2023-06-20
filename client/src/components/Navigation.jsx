import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <div>
        <Link to={'/tasks'} >
            <h1>Task app</h1>
        </Link>
        <Link to={'/tasks/create'} >task create</Link>
    </div>
  )
}

