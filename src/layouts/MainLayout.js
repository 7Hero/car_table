import Sidebar from "../components/Sidebar"

const MainLayout = ({children}) => {

  return (
    <div style={{display:'flex'}}>
      <Sidebar />
      {children}
    </div>
  )
}

export default MainLayout