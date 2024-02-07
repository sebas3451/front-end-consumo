import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../components/Dashboard"
import Excel from "../components/Excel"


export const AppRouter = (props) => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Excel/>}/>
        <Route path="addFile" element={<Excel/>}/>
        {/* <Route path="/about" element={<ResponsiveDrawer/>}/> */}
    </Routes>
    </>
  )
}
