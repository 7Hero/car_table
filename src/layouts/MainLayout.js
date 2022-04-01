import Sidebar from "../components/Sidebar"
import { useSelector } from "react-redux"
const MainLayout = ({children}) => {
  const { toggle } = useSelector( state => state.sidebar)
  return (
    <div style={{display:'flex'}}>
      <Sidebar />
      {children}
    </div>
  )
}

export default MainLayout