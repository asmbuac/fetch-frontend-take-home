import type { FormEventHandler } from 'react';

import FetchLogo from '@/assets/svgs/fetch-logo';
import DogOne from '@/assets/images/dog-1.webp';
import BlobOne from '@/assets/svgs/blob-1';
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

const Login = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

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
              <form onSubmit={handleSubmit} className="grid items-center gap-4">
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    pattern="^[A-Za-z]+( [A-Za-z]+)*$"
                    minLength={2}
                    maxLength={50}
                  />
                  <p className="hidden text-xs peer-invalid:block peer-invalid:text-fetch-danger md:text-sm">
                    Please provide a valid name greater than or equal to 2
                    characters.
                  </p>
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label htmlFor="email" className="peer-">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="johndoe@gmail.com"
                    minLength={2}
                    maxLength={50}
                  />
                  <p className="hidden text-xs peer-invalid:block peer-invalid:text-fetch-danger md:text-sm">
                    Please provide a valid email address.
                  </p>
                </div>
                <Button type="submit" className="mt-2">
                  Get Started
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
