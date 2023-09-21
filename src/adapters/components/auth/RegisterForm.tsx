import { useState, useRef, useEffect, FC, ChangeEvent } from "react";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import AuthAdapter from "../../api/AuthAdapter";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import { LoginSchema, RegisterSchema } from "../../../core/models/Auth";
import { RegisterUseCase } from "../../../core/useCases/RegisterUseCase";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { fr } from "date-fns/locale";
import { cn } from "../../../lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const RegisterForm: FC = () => {
  const authAdapter = new AuthAdapter();
  //const registerUseCase = new RegisterUseCase(authAdapter);
  const { isAuthenticated } = useAuth();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  // default value datepicker
  const [date, setDate] = useState<Date>();

  const [errors, setErrors] = useState<string>();
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrors("");
  }, [username, password]);

  useEffect(() => {
    if (attemptedLogin && isAuthenticated) {
      //navigate("/", { replace: true });
      console.log("yessss");
    }
  }, [attemptedLogin, isAuthenticated]);

  const options = [
    { value: "", label: "Genre" },
    { value: "MALE", label: "Homme" },
    { value: "FEMALE", label: "Femme" },
    { value: "NONBINARY", label: "Non Binaire" },
  ];

  // convert format date to string
  const formatDate = (dateObj: Date | undefined): string => {
    if (!dateObj) return "";
    let month = "" + (dateObj.getMonth() + 1),
      day = "" + dateObj.getDate(),
      year = dateObj.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("-");
  };

  // Fonctions handle pour chaque champ
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const email_validation = /\S+@\S+\.\S+/;
    if (email_validation.test(event.target.value)) {
      setEmail(event.target.value);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleBirthChange = (event: Date | undefined) => {
    setDate(event);
    const formattedDate = formatDate(date);
    setBirth(formattedDate);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const user_data: RegisterSchema = {
      name,
      username,
      email,
      password,
      birth,
      gender,
    };
    /* try {
      const response = await registerUseCase.execute(user_data);
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
    } */
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom et prénom</Label>
            <Input
              id="name"
              name="name"
              placeholder="Albert Einstein"
              value={name}
              onChange={(event) => {
                handleNameChange(event);
              }}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              ref={userRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Nom d'utilisateur</Label>
            <Input
              id="username"
              name="username"
              placeholder="Harry_Covaire"
              value={username}
              onChange={(event) => {
                handleUsernameChange(event);
              }}
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              ref={userRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Albert.Einstein@gmail.com"
              onChange={(event) => {
                handleUsernameChange(event);
              }}
              value={email}
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              ref={userRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Genre</Label>
            <select
              id="gender"
              name="gender"
              value={gender}
              className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm focus-visible:ring-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onChange={(event) => {
                handleGenderChange(event);
              }}
            >
              {options.map((data) => {
                if (data.value === "") {
                  return (
                    <option key={data.label} value={data.value} disabled>
                      {data.label}
                    </option>
                  );
                } else {
                  return (
                    <option key={data.label} value={data.value}>
                      {data.label}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div>
            <Label htmlFor="birthdate">Date de naissance</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "dd/MM/yyyy")
                  ) : (
                    <span>Choisir une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  locale={fr}
                  id="birthdate"
                  mode="single"
                  selected={date}
                  onSelect={(date) => handleBirthChange(date)}
                  initialFocus
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  captionLayout="buttons"
                  fromYear={1900}
                  toYear={2030}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => {
                handlePasswordChange(event);
              }}
              disabled={isLoading}
              required
              ref={userRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmer mot de passe</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
              ref={userRef}
            />
          </div>
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continuer
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
        Se connecter
      </Button>
    </div>
  );
};

export default RegisterForm;
