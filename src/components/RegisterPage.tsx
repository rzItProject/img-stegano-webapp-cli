import loginImg from "../assets/images/img-1.jpg";
import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, User2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "http://localhost:8888/auth/register";

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
      const response: AxiosResponse = await axios.post(
        REGISTER_URL,
        {
          name: name,
          username: username,
          email: email,
          password: password,
          birth: birth,
          sex: sex,
          profile: "",
        },
      );
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
    <div className="grid grid-cols-1 xl:grid-cols-9 h-screen w-full">
      <div className="relative hidden max-h-screen sm:block xl:block xl:col-span-5">
        <img
          className="w-full h-full object-cover rounded-tl rounded-bl hidden xl:block"
          src={loginImg}
          alt=""
        />
        <h1
          className="absolute hidden top-0 left-0 bg-opacity-90
         bg-slate-100 text-slate-900 text-2xl font-barcelony p-4 ml-4 mt-4 rounded-3xl
         md:block xl:bg-slate-900 xl:text-slate-50"
        >
          MiaCrypt
        </h1>
      </div>

      <div
        className="flex justify-center min-h-screen bg-slate-900 items-center xl:col-span-4"
      >
        <div className="max-h-screen p-12 bg-white rounded-2xl shadow-xl z-20">
          
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 rounded-full p-4 mb-4">
              <User2 className="text-slate-100" size={48} strokeWidth={2} />
            </div>
            <h1 className="text-2xl text-slate-900 font-bold text-center mb-4 cursor-pointer">
              Créer Un Compte
            </h1>
            <p className="w-80 text-center text-md mb-8 font-semibold text-slate-500 tracking-wide cursor-pointer mx-auto">
              Bienvenue sur MiaCrypt!
            </p>
          </div>

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
                  <span className="underline cursor-pointer">
                    Connectez-vous
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
