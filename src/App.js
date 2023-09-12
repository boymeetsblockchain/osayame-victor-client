import Register from "./screens/Register"
import Login from "./screens/Login"
import About from "./screens/About"
import { Toaster } from "react-hot-toast"
import Homepage from "./screens/Homepage"
import ImageScreen from "./screens/Image"
import Profile from "./screens/Profile"
import { Route,Routes } from "react-router-dom"
import { AuthProvider } from "./context/authContext"
export default function App() {

  return (
    <>
    <Toaster/>
    < AuthProvider>

<Routes>
  
  <Route path="/" index element={<Homepage/>}/>
  <Route path="/login"  element={<Login/>}/>
  <Route path="/register"  element={<Register/>}/>
  <Route path="/image-select" element={<ImageScreen/>}/>
  <Route path="/profile" element={<Profile/>}/>
  <Route path="/about" element={<About/>}/>
</Routes>

</AuthProvider>
    </>
  )
}