import * as React from "react";

import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useNavigate } from "react-router-dom";
import img_login from "../../assets/images/img-2.jpg";

import axios, { AxiosResponse, AxiosError } from "axios";
import { Lock, User2 } from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Types
interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
}

// Typage de l'erreur attendue de l'API
interface ApiError {
  detail: string;
}

// Typage de la réponse attendue de l'API
interface ApiResponse {
  result: {
    token: string;
    message: string;
  };
}

// Typage de l'erreur attendue de l'API
interface ApiError {
  detail: string;
}

const LOGIN_URL = "http://localhost:8888/auth/login";

export default function LoginPage() {
  return (
    <>
      <div className="relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-screen flex-col p-10 text-white lg:flex">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={img_login}
            alt=""
          />
          <div className="relative z-20  flex items-center text-xl font-medium">
            <Icons.file_sign className="mr-2 h-8 w-8 animate-pulse" />
            MiaCrypt
          </div>
          <div className="absolute end-4 text-center bottom-4">
            <p className="text-3xl font-barcelony">
              "Signez... Parce que chaque pixel compte."
            </p>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="mx-auto bg-slate-950 rounded-full p-4 mb-4">
                <Lock className="text-slate-100" size={48} strokeWidth={2} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Content de vous revoir !
              </h1>
              <p className="text-sm text-muted-foreground">
                Entrez vos informations pour vous connecter
              </p>
            </div>
            <UserAuthForm />
            {/*  <p className="px-6 text-center text-sm text-muted-foreground">
              En créant un compte, vous acceptez nos{" "}
              <span className="underline underline-offset-3 hover:text-primary cursor-pointer">
                Conditions d'utilisation'
              </span>{" "}
              et vous confirmez avoir lu notre{" "}
              <span className="underline underline-offset-3 hover:text-primary cursor-pointer">
                Politique de Confidentialité
              </span>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export function UserAuthForm() {
  const userRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [formData, setFormData] = React.useState<FormData>({
    username: "",
    password: "",
  });

  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<string>();

  React.useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    setErrors("");
  }, [user, password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try {
      const response: AxiosResponse = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(response);
      console.log(JSON.stringify(response.data));
      // add successfully notif
      toast.success(response.data.message);

      // reload page after success login
      setTimeout(() => {
        setIsLoading(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError<ApiError> = error;
        console.log(axiosError);

        // add error notif
        if (axiosError.response) {
          setErrors("Email ou Mot de passe invalide");
          toast.error(axiosError.response.data.detail);
        } else {
          toast.error("An error occurred while processing the request.");
        }
        setIsLoading(false);
      } else {
        // Gérer d'autres types d'erreurs si nécessaire
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              name="username"
              placeholder="name@example.com"
              value={formData.username}
              onChange={(e) => setUser(e.target.value)}
              //onChange={(e) => handleChange(e)}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              ref={userRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setPassword(e.target.value)}
              //onChange={(e) => handleChange(e)}
              disabled={isLoading}
              required
              ref={userRef}
            />
          </div>
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Se connecter
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou choisir de
          </span>
        </div>
      </div>
      <Button variant="outline" onClick={() => navigate("/register")}>
        S'inscrire
      </Button>
    </div>
  );
}
