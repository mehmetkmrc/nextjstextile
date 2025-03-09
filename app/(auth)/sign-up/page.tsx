import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
    title: 'Sign-up'
}


const SignUpPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string
    }>
}) => {
    const { callbackUrl } = await props.searchParams;

    const session = await auth();

    if (session) {
        return redirect( callbackUrl || '/');
    }


    return ( <div className="w-full max-w-md mx-auto">
        <Card>
            <CardHeader className='space-y-4'>
                <Link href='/' className='flex-center'>
                    <Image 
                    src='/images/logo.svg'
                    width={100}
                    height={100}
                    alt={`${APP_NAME} logo`}
                    priority={true}
                    />
                </Link>
                <CardTitle className='text-center' >
                        Yeni Hesap
                </CardTitle>
                <CardDescription className="text-center">
                    Yeni Hesap Oluşturun
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {/* FORM HERE */}
                <SignUpForm/>
            </CardContent>
        </Card>
    </div> );
}
 
export default SignUpPage;