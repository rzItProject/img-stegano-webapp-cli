import { useState, useRef, useEffect, FC, ChangeEvent, FormEvent } from "react";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
import PasswordService from "../../../core/services/PasswordService";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUpForm: FC = () => {
  const authAdapter = new AuthAdapter();
  const passwordService = new PasswordService();
  const registerUseCase = new RegisterUseCase(authAdapter, passwordService);

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [step, setStep] = useState(1);

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  // default value datepicker
  const [date, setDate] = useState<Date>();
  const [attemptedLogin, setAttemptedLogin] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [passwordError, setPasswordError] = useState<string[]>([]);

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

  // Handle card display
  const handleNext = () => {
    // Increment step value, but not exceed 3
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handleBack = () => {
    // Decrement step value, but does not fall below 1
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // Handle form field
  const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };
  const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleGenderChange = (event: string) => {
    setGender(event);
  };

  const handleBirthChange = (event: Date | undefined) => {
    setDate(event);
    const formattedDate = formatDate(event);
    setBirthdate(formattedDate);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const name = firstname + " " + lastname;
    const user_data: RegisterSchema = {
      name,
      username,
      email,
      password,
      birthdate,
      gender,
    };
    console.log(user_data);

    const res = registerUseCase.validatePassword(password);
    console.log(res);
    if (res && res.length > 0) {
      setPasswordError(res);
      for (const element of passwordError) {
        toast.error(element);
      }
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUseCase.execute(user_data);
      console.log(response);
      console.log(JSON.stringify(response.data));
      // add successfully notif
      setIsLoading(false);
      toast.success("Inscription réussi");
      // reload page after success login
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
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
            setIsLoading(false);
        }
      } else {
        toast.error(
          "Une erreur inattendue s'est produite. Veuillez réessayer."
        );
        setIsLoading(false);
      }
      setAttemptedLogin(false);
    }
  };
  return (
    <>
      <section>
        <form onSubmit={(e) => handleSubmit(e)}>
          {step === 1 && (
            <Card className={`gap-2 grid`}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  Information de connexion
                </CardTitle>
                <CardDescription>
                  Entrez les détails nécessaires pour créer ou accéder à votre
                  compte.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 ">
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
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Albert.Einstein@gmail.com"
                    onChange={(event) => {
                      handleEmailChange(event);
                    }}
                    value={email}
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                  />
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
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  {/* {passwordError.map((error, index) => (
                    <div key={index} className="text-red-500">
                      {error}
                    </div>
                  ))} */}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-1/2" onClick={handleNext}>
                  Suivant
                </Button>
              </CardFooter>
            </Card>
          )}
          {step === 2 && (
            <Card className={`gap-2 grid`}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  Information Personnelles
                </CardTitle>
                <CardDescription>
                  Compléter votre profil avant de continuer
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input
                      id="lastname"
                      name="lastname"
                      placeholder="Einstein"
                      value={lastname}
                      onChange={(event) => {
                        handleLastnameChange(event);
                      }}
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input
                      id="firstname"
                      name="firstname"
                      placeholder="Albert"
                      value={firstname}
                      onChange={(event) => {
                        handleFirstnameChange(event);
                      }}
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Genre</Label>
                  <Select
                    onValueChange={(event) => {
                      handleGenderChange(event);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner votre genre" />{" "}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Homme</SelectItem>
                      <SelectItem value="FEMALE">Femme</SelectItem>
                      <SelectItem value="NONBINARY">Non Binaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
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
                    <PopoverContent className="flex w-auto p-0">
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
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-6">
                <Button variant="outline" onClick={handleBack}>
                  Retour
                </Button>
                <Button onClick={handleNext}>Suivant</Button>
              </CardFooter>
            </Card>
          )}
          {step === 3 && (
            <Card className={`gap-2 grid`}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  Acceptation des Termes
                </CardTitle>
                <CardDescription>
                  Compléter votre profil avant de continuer
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid gap-2">
                  <p className="px-6 text-center text-sm text-muted-foreground">
                    En continuant, vous acceptez nos{" "}
                    <span className="underline underline-offset-3 hover:text-primary cursor-pointer">
                      Conditions d'utilisation'
                    </span>{" "}
                    et vous confirmez avoir lu notre{" "}
                    <span className="underline underline-offset-3 hover:text-primary cursor-pointer">
                      Politique de Confidentialité
                    </span>
                    .
                  </p>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-6">
                <Button variant="outline" onClick={handleBack}>
                  Retour
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Continuer
                </Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </section>
    </>
  );
};

export default SignUpForm;
