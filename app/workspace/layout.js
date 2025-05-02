import React from 'react'
import WorkspaceProvider from './provider'

const WorkspaceLayout = ({children}) => {
  return (
    <div>
        <WorkspaceProvider>
        {children}
        </WorkspaceProvider>
    </div>
  )
}

export default WorkspaceLayout