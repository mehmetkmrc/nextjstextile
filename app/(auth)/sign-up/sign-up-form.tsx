'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";



const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    });


    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/'; 

    const SignUpButton = () => {
        const { pending } = useFormStatus();


        return (
            <Button disabled={pending} className='w-full' variant='default'>
                { pending ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol' }
            </Button>
        )
    }

    

    return <form action={action}>
        <input type="hidden" name="callbackUrl" value={callbackUrl}/>
        <div className="space-y-6">
            <div>
            <Label htmlFor='name'>İsim</Label>
            <Input
                id="name"
                name="name"
                type="text"
                
                autoComplete="name" 
                defaultValue={signUpDefaultValues.name}
            />
            </div>
            <div>
            <Label htmlFor='email'>Email</Label>
            <Input
                id="email"
                name="email"
                type="text"
                
                autoComplete="email" 
                defaultValue={signUpDefaultValues.email}
            />
            </div>
            <div>
            <Label htmlFor='password'>Şifre</Label>
            <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password" 
                defaultValue={signUpDefaultValues.password}
            />
            </div>
            <div>
            <Label htmlFor='confirmPassword'>Şifreyi Onayla</Label>
            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="confirmPassword" 
                defaultValue={signUpDefaultValues.confirmPassword}
            />
            </div>
            <div>
                <SignUpButton />
            </div>

            {data && !data.success && (
                <div className="text-center text-destructive">
                    {data.message}
                </div>
            )}


            <div className="text-sm text-center text-muted-foreground">
                Hesabınız Var mı?{' '}
                <Link href='/sign-up' target='_self' className='link'>
                Giriş Yap
                </Link>
            </div>
        </div>
    </form>;
}
 
export default SignUpForm;