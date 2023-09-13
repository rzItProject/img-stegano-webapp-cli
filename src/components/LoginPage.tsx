import loginImg from "../assets/images/img-1.jpg";
import {
  ChangeEvent,
  FormEvent,
  useState
} from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Types
interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

// Typage de la réponse attendue de l'API
interface ApiResponse {
  result: {
    token: string;
    message: string;
  };
  detail: string;
}

// Typage de l'erreur attendue de l'API
interface ApiError {
  detail: string;
}

const LOGIN_URL = "http://localhost:8888/auth/login";

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    try {
      const response: AxiosResponse = await axios.post(LOGIN_URL, formData, {
        withCredentials: true,
      });
      console.log(response);

      // add successfully notif
      toast.success(response.data.message);

      // reload page after success login
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<ApiError> = error;
        console.log(axiosError);

        // add error notif
        if (axiosError.response) {
          toast.error(axiosError.response.data.detail);
        } else {
          toast.error("An error occurred while processing the request.");
        }
      } else {
        // Gérer d'autres types d'erreurs si nécessaire
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-10 h-screen w-full">
      <div className="relative hidden max-h-screen md:block md:col-span-1 lg:col-span-6  ">
        <img
          className="bg-black w-full h-full object-cover rounded-tl rounded-bl md:absolute"
          src={loginImg}
          alt=""
        />
        <h1 className="absolute hidden md:block top-0 left-0 bg-slate-900 bg-opacity-90 text-slate-50 text-2xl font-barcelony p-4 ml-4 mt-4 rounded-3xl">
          MiaCrypt
        </h1>
      </div>

      <div className="flex flex-col justify-center gap-4 md:col-span-2 lg:col-span-4 p-16">
        <div className="bg-slate-800 rounded-full p-4 self-center">
          <Lock className="text-slate-100" size={48} strokeWidth={2} />
        </div>

        <h1 className="self-center text-2xl font-semibold">Sign In</h1>

        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" w-full mx-auto bg-white"
        >
          <div className="flex flex-col py-2">
            <label className="text-slate-800 mb-2" htmlFor="username">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="username"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              className="border shadow rounded py-2 px-3 text-slate-800 leading-tigh"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>

          <div className="flex flex-col py-2">
            <label className="text-slate-800 mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="border shadow rounded py-2 px-3 text-slate-800 leading-tigh"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>

          <button
            className="border w-full my-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded"
            type="submit"
          >
            Sign In
          </button>

          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p className="mt-4 text-sm"><Link to='/Register' replace>Créer un compte</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
