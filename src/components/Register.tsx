import loginImg from '../assets/images/img-2.jpg'
import { User } from "lucide-react";

export default function Register() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-10 h-screen w-full">
          <div className="relative hidden max-h-screen md:block md:col-span-1 lg:col-span-6  ">
            <img
              className="w-full h-full object-cover rounded-tl rounded-bl md:absolute"
              src={loginImg}
              alt=""
            />
            <h1 className="absolute hidden md:block top-0 left-0 bg-slate-100 bg-opacity-90 text-slate-900 text-2xl font-barcelony p-4 ml-4 mt-4 rounded-3xl">
              MiaCrypt
            </h1>
          </div>
    
          <div className="flex flex-col justify-center gap-4 md:col-span-2 lg:col-span-4 p-8">
            <div className="bg-slate-800 rounded-full p-4 self-center">
              <User className="text-slate-100" size={48} color="#ffffff" strokeWidth={2} />
            </div>
            <h1 className="self-center text-2xl font-semibold">Sign In</h1>
            <form className=" w-full mx-auto bg-white">
              <div className="flex flex-col py-2">
                <label>Nom d’utilisateur</label>
                <input className="border p-2 rounded-md" type="text" required/>
              </div>
              <div className="flex flex-col py-2">
                <label>Email</label>
                <input className="border p-2 rounded-md" type="email" required/>
              </div>
              <div className="flex flex-col py-2">
                <label>Mot de passe</label>
                <input className="border p-2 rounded-md" type="password" required/>
              </div>
              <div className="flex flex-col py-2">
                <label>Confirmer mot de passe</label>
                <input className="border p-2 rounded-md" type="password" />
              </div>
              <button className="border w-full my-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md">
                S'inscrire
              </button>
              <div className="flex justify-between">
                <p className="flex items-center">
                  <input className="mr-2" type="checkbox" /> Remember Me
                </p>
                <p>Create an account</p>
              </div>
            </form>
          </div>
        </div>
      )
}