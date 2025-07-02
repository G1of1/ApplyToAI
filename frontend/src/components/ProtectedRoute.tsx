// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom"
import { JSX, useEffect, useState } from "react"
import { supabase } from "../supbaseClient"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setIsAuthenticated(!!data.session)
    }

    getSession()
  }, [])

  if (isAuthenticated === null) return <div className="text-white">Loading...</div>

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProtectedRoute
