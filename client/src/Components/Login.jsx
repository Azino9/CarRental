import React from 'react'

//  Mount this  in app.jsx before we added that Routes and below  fragment tag 
{/* Now be destructure the prop , the setter function setShowLogin */}
const Login = ({setShowLogin}) => {

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const onsubmitHandler = async(e) => {
        e.preventDefault();
    }
  return (
    // it will used full full height and width and be fixed  be used -> flex , itemcenter and textesm so that the contents inbside the below div be in center
    // bg black with some opacity -> so it will add a dark layer in entire page
    // z index 100 so that it will be on top of everything

    // So what this onClick will do is whenever we click on login it will show login , and 
    // Whenever we click on the white space like in the dark area of the page it will close the login form
    <div onClick={()=> setShowLogin(false)} className=' fixed left-0 right-0 top-0 bottom-0 z-100 flex items-center
    text-sm text-gray-600 bg-black/50 ' >

        <form onSubmit={onsubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
                 
                 <p className="text-2xl font-medium m-auto">
                     <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                 </p>

                  {/* If it is register then  name input field */}
                  { state === "register" && (
                     <div className="w-full">
                         <p>Name</p>
                         <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                     </div>
                 )}

                 {/* if login ->  then email and password it will ask */}

                 <div className="w-full ">
                     <p>Email</p>
                     <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary " type="email" required />
                 </div>
                 <div className="w-full ">
                     <p>Password</p>
                     <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                 </div>
                 {state === "register" ? (
                     <p>
                         Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                </p>
                 ) : (
                     <p>
                         Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                     </p>
                 )}
                <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                          {state === "register" ? "Create Account" : "Login"}
                 </button>
             </form>

    </div>
  )
}

export default Login