import * as React from "react";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import AuthAdapter from "./../../api/AuthAdapter";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import { LoginUseCase } from "../../../core/useCases/LoginUseCase";

const LoginForm: React.FC = () => {
  const authAdapter = new AuthAdapter();
  const loginUseCase = new LoginUseCase(authAdapter);
  const { isAuthenticated } = useAuth();

  const userRef = React.useRef<HTMLInputElement>(null);
  const errRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<string>();
  const [attemptedLogin, setAttemptedLogin] = React.useState(false);

  React.useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  React.useEffect(() => {
    setErrors("");
  }, [username, password]);

  React.useEffect(() => {
    if (attemptedLogin && isAuthenticated) {
      //navigate("/", { replace: true });
      console.log("yessss");
    }
  }, [attemptedLogin, isAuthenticated]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const user_data = { username, password };
    try {
      const response = await loginUseCase.execute(user_data);
      console.log(response);
      console.log(JSON.stringify(response.data));
      // add successfully notif
      setIsLoading(false);
      setAttemptedLogin(true);
      toast.success(JSON.stringify(response.data.message));
      // reload page after success login
      setTimeout(() => {
        setIsLoading(false);
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        // Vérifiez si l'objet d'erreur est bien une instance de la classe Error
        console.log(error);
        switch (error.message) {
          case "Permission Refused":
            toast.error(
              "Permission refusée. Veuillez vérifier vos identifiants."
            );
            break;
          case "LoginFailed":
            toast.error("Échec de la connexion. Veuillez réessayer.");
            break;
          default:
            toast.error(
              "Une erreur inattendue s'est produite. Veuillez réessayer."
            );
        }
      } else {
        toast.error(
          "Une erreur inattendue s'est produite. Veuillez réessayer."
        );
      }
      setAttemptedLogin(false);
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
              placeholder="Harry_Covaire"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
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
};

export default LoginForm;
