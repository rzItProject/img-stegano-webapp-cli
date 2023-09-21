
import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import { cn } from "../../lib/utils";
import { fr } from "date-fns/locale";
import "react-toastify/dist/ReactToastify.css";

import { Lock, User, User2 } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";

//shacdn ui component
import { Button } from "../components/ui/button";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { ApiError, FormErrors } from "../../core/models/Auth";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "http://localhost:8888/auth/register";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("");
  const [profile, setProfile] = useState(null);

  // default value datepicker
  const [pickerDate, setPickerDate] = useState<Date | null>(null);
  const [date, setDate] = useState<Date>();

  const options = [
    { value: "", label: "Genre" },
    { value: "MALE", label: "Homme" },
    { value: "FEMALE", label: "Femme" },
    { value: "NONBINARY", label: "Non Binaire" },
  ];

  // convert format date to string
  const formatDate = (dateObj: Date | null): string => {
    if (!dateObj) return "";
    let month = "" + (dateObj.getMonth() + 1),
      day = "" + dateObj.getDate(),
      year = dateObj.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("-");
  };
  const formatDateSha = (dateObj: Date | undefined): string => {
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

  const handleSexChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSex(event.target.value);
  };

  const handleBirthChange = (event: React.SetStateAction<Date | null>) => {
    let dateValue: Date | null;

    setPickerDate(event);

    // Si c'est une fonction, on appelle cette fonction avec une valeur de date pour obtenir la date réelle
    if (typeof event === "function") {
      dateValue = event(null); // Cette approche suppose que vous n'utilisez pas l'état précédent dans votre fonction setState
    } else {
      dateValue = event;
    }
    const formattedDate = formatDate(dateValue);
    setBirth(formattedDate);
  };

  const handleBirthChangeSha = (event: Date | undefined) => {
    setDate(event);
    const formattedDate = formatDateSha(date);
    setBirth(formattedDate);
  };

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name);
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(birth);
    console.log(sex);
    console.log(profile);

    try {
      const response: AxiosResponse = await axios.post(REGISTER_URL, {
        name: name,
        username: username,
        email: email,
        password: password,
        birth: birth,
        sex: sex,
        profile: "",
      });
      console.log(response);
      navigate("/login");

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
    <div className="grid grid-cols-1 xl:grid-cols-9 h-screen w-screen bg-slate-950 overflow-hidden">
      <div className="relative hidden sm:block xl:block xl:col-span-5">
        <img
          className="w-full h-screen object-cover rounded-tl rounded-bl hidden xl:block"
          src="assets/images/img-3.jpg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-slate-950"></div>
        <h1
          className="absolute hidden top-0 left-0 bg-opacity-90
         bg-slate-100 text-slate-900 text-2xl font-barcelony p-4 ml-4 mt-4 rounded-3xl
         md:block xl:bg-slate-900 xl:text-slate-50"
        >
          MiaCrypt
        </h1>
      </div>

      <div className="flex flex-col justify-center min-h-screen items-center xl:col-span-4">
        <div className="flex flex-col items-center">
          <div className="bg-slate-700 rounded-full p-4 mb-4">
            <User2 className="text-slate-100" size={48} strokeWidth={2} />
          </div>
          <h1 className="text-2xl text-slate-100 font-bold text-center mb-4">
            Créer Un Compte
          </h1>
          <p className="w-80 text-center text-md mb-8 font-semibold text-slate-300 tracking-wide cursor-pointer mx-auto">
            Bienvenue sur MiaCrypt!
          </p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Tabs defaultValue="profil" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="compte">Compte</TabsTrigger>
              <TabsTrigger value="profil">Profil</TabsTrigger>
            </TabsList>
            <TabsContent value="profil">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Entrer vos informations pour votre profil
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 mb-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Albert Einstein"
                      onChange={(event) => {
                        handleNameChange(event);
                      }}
                      className="focus-visible:ring-yellow-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Albert.Einstein@gmail.com"
                      onChange={(event) => {
                        handleUsernameChange(event);
                      }}
                      className="focus-visible:ring-yellow-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Genre</Label>
                    <select
                      id="sex"
                      name="sex"
                      value={sex}
                      className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm focus-visible:ring-yellow-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      onChange={(event) => {
                        handleSexChange(event);
                      }}
                    >
                      {options.map((data) => {
                        if (data.value === "") {
                          return (
                            <option
                              key={data.label}
                              value={data.value}
                              disabled
                            >
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
                  <div className="space-y-1">
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
                            format(date, "")
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
                          onSelect={(date) => handleBirthChangeSha(date)}
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
              </Card>
            </TabsContent>
            <TabsContent value="compte">
              <Card>
                <CardHeader>
                  <CardDescription>
                    Entrer vos informations pour la connexion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Harry_Covaire"
                      className="focus-visible:ring-yellow-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(event) => {
                        handlePasswordChange(event);
                      }}
                      className="focus-visible:ring-yellow-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm">Confirmer mot de passe</Label>
                    <Input
                      id="confirm"
                      type="password"
                      className="focus-visible:ring-yellow-400"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-md bg-yellow-400 hover:bg-yellow-300"
                  >
                    S'inscrire
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
        {/* <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="profil">Profil</TabsTrigger>
            <TabsTrigger value="access">Compte</TabsTrigger>
          </TabsList>
          <form onSubmit={(e) => handleSubmit(e)}>
            <TabsContent value="profil">
              <div className="space-y-4">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nom"
                  className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                  onChange={(event) => {
                    handleNameChange(event);
                  }}
                />
                <DatePicker
                  id="date"
                  name="date"
                  className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Date de naissance"
                  selected={pickerDate}
                  onChange={(date: Date | null) => handleBirthChange(date)}
                />
                <select
                  id="sex"
                  name="sex"
                  value={sex}
                  className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                  onChange={(event) => {
                    handleSexChange(event);
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
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                  onChange={(event) => {
                    handleEmailChange(event);
                  }}
                />
                <input
                  id="text"
                  name="text"
                  type="text"
                  placeholder="Nom d'utilisateur"
                  className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                  onChange={(event) => {
                    handleUsernameChange(event);
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="space-y-4">
                
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                  onChange={(event) => {
                    handlePasswordChange(event);
                  }}
                />
              </div>
            </TabsContent>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="py-3 w-80 text-xl mb-1 text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
              >
                Continuer
              </button>
              <p className="mt-4 text-sm">
                Vous avez déjà un compte?{" "}
                <Link to="/login" replace>
                  <span className="underline cursor-pointer">
                    Connectez-vous
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </Tabs>

                <form onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-4">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nom"
              className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              onChange={(event) => {
                handleNameChange(event);
              }}
            />
            <DatePicker
              id="date"
              name="date"
              className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              dateFormat="dd-MM-yyyy"
              placeholderText="Date de naissance"
              selected={pickerDate}
              onChange={(date: Date | null) => handleBirthChange(date)}
            />
            <select
              id="sex"
              name="sex"
              value={sex}
              className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              onChange={(event) => {
                handleSexChange(event);
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
            <input
              id="text"
              name="text"
              type="text"
              placeholder="Nom d'utilisateur"
              className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              onChange={(event) => {
                handleUsernameChange(event);
              }}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              onChange={(event) => {
                handleEmailChange(event);
              }}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mot de passe"
              className="block text-lg py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
              onChange={(event) => {
                handlePasswordChange(event);
              }}
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="py-3 w-80 text-xl mb-1 text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
            >
              Continuer
            </button>
            <p className="mt-4 text-sm">
              Vous avez déjà un compte?{" "}
              <Link to="/login" replace>
                <span className="underline cursor-pointer">Connectez-vous</span>
              </Link>
            </p>
          </div>
        </form>  */}

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
  );
}
