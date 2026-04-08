import { Navigate, Route, Routes } from 'react-router-dom'
import { DocShell } from '../DocShell'
import { defaultDocId } from '../docs'
import { routeConfig } from './routes'

const routeComponents = {
  DocShell: <DocShell />,
} as const

function injectRuntimeValue(value: string): string {
  return value.replace(':defaultDocId', defaultDocId)
}

export function AppRouter() {
  return (
    <Routes>
      {routeConfig.map((item, index) => {
        if (item.type === 'redirect') {
          return (
            <Route
              key={`${item.path}-${index}`}
              path={item.path}
              element={
                <Navigate to={injectRuntimeValue(item.to)} replace={item.replace} />
              }
            />
          )
        }

        return (
          <Route
            key={`${item.path}-${index}`}
            path={item.path}
            element={routeComponents[item.component]}
          />
        )
      })}
    </Routes>
  )
}
