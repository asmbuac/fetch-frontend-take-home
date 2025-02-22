import {
  type Dispatch,
  type FormEventHandler,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

import DogOne from '@/assets/images/dog-1.webp';
import BlobOne from '@/assets/svgs/blob-1';
import FetchLogo from '@/assets/svgs/fetch-logo';
import LoadingSpinner from '@/assets/svgs/loading-spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateEmailField, validateNameField } from '@/lib/utils';
import { useLoginMutation } from '@/services/auth';

const Login = () => {
  //* FORM STATES
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<{ name: string; email: string }>({
    name: '',
    email: '',
  });

  const { mutate: login, isPending } = useLoginMutation();
  const navigate = useNavigate();

  //* FORM HANDLERS
  const handleNameError = (msg: string) => {
    setError((prev) => ({ ...prev, name: msg }));
  };

  const handleEmailError = (msg: string) => {
    setError((prev) => ({ ...prev, email: msg }));
  };

  const handleInputChange = (
    onChange: Dispatch<SetStateAction<string>>,
    newValue: string,
    valueError: string,
    validateValue: typeof validateNameField,
    handleValueError: typeof handleNameError,
  ) => {
    // Set the new input value
    onChange(newValue);

    // Validate the new value if there is a prior validation error
    if (valueError) {
      const isValidValue = validateValue(newValue, handleValueError);
      if (isValidValue) handleValueError('');
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isValidName = validateNameField(name, handleNameError),
      isValidEmail = validateEmailField(email, handleEmailError);

    // Return early if the name or email is invalid, else reset error and call the login mutation
    if (!isValidName || !isValidEmail) return;
    setError({ name: '', email: '' });

    login(
      { name, email },
      {
        onSuccess: () => {
          // Store the user's info
          localStorage.setItem('user', JSON.stringify({ name, email }));

          // Reset form state
          setName('');
          setEmail('');

          // Navigate to the dogs page
          navigate('/dogs-for-adoption');
        },
      },
    );
  };

  //* AUTH CHECK
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) navigate('/dogs-for-adoption', { replace: true });
  }, [user, navigate]);

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <BlobOne
        width={600}
        fillOpacity={0.5}
        className="absolute -bottom-96 -left-52 z-0 -rotate-[120deg]"
      />

      <div className="z-10 flex w-full items-center justify-evenly gap-6">
        <div className="z-20 flex flex-col items-center gap-4 py-6 pl-0 md:pl-6">
          <FetchLogo />
          <Card className="w-[324px] border-none bg-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-fetch-primary">
                Adopt with Love
              </CardTitle>
              <CardDescription>
                Find your new furry companion with Fetch!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                noValidate
                onSubmit={handleSubmit}
                className="grid items-center gap-4"
              >
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    maxLength={50}
                    onChange={({ target }) =>
                      handleInputChange(
                        setName,
                        target.value,
                        error.name,
                        validateNameField,
                        handleNameError,
                      )
                    }
                    className={
                      error.name &&
                      'border-fetch-danger text-fetch-danger focus-visible:ring-fetch-danger/30'
                    }
                  />
                  {error.name && (
                    <p className="text-xs text-fetch-danger md:text-sm">
                      {error.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    maxLength={254}
                    onChange={({ target }) =>
                      handleInputChange(
                        setEmail,
                        target.value,
                        error.email,
                        validateEmailField,
                        handleEmailError,
                      )
                    }
                    className={
                      error.email &&
                      'border-fetch-danger text-fetch-danger focus-visible:ring-fetch-danger/30'
                    }
                  />
                  {error.email && (
                    <p className="text-xs text-fetch-danger md:text-sm">
                      {error.email}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="mt-2 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <LoadingSpinner className="!h-6 !w-6 text-white" />
                  ) : (
                    'Get Started'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="relative hidden md:flex md:h-full md:items-center md:justify-center">
          <BlobOne width={600} className="absolute z-0" />
          <img
            src={DogOne}
            alt="Login Dog Image"
            loading="lazy"
            width={600}
            className="z-10"
          />
          <div className="absolute right-56 top-12 z-0 h-[350px] w-[400px] bg-gradient-radial from-fetch-tertiary/50 to-[transparent_70%]" />
        </div>
      </div>
    </div>
  );
};

export default Login;
