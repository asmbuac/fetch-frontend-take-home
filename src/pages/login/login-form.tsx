import {
  type Dispatch,
  type FormEventHandler,
  type SetStateAction,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

import LoadingSpinner from '@/assets/svgs/loading-spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { validateEmailField, validateNameField } from '@/lib/utils';
import { useLoginMutation } from '@/services/auth';
import LoginFormField from './login-form-field';

const LoginFormCard = () => {
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

  return (
    <Card className="w-[324px] border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-fetch-primary">Adopt with Love</CardTitle>
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
          <LoginFormField
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
            error={error.name}
          />
          <LoginFormField
            type="email"
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
            error={error.email}
          />
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
  );
};

export default LoginFormCard;
