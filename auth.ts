import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import { authConfig } from './auth.config';
import { cookies } from 'next/headers';



export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
        strategy: 'jwt' as const,
        maxAge: 30*24*60*60 //30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
                credentials: {
                    email: {type: 'email'},
                    password :{type: 'password'},
                },
                async authorize( credentials ){
                    if( credentials == null) return null;

                    //Find user in database
                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email as string
                        }
                    });

                    //Check if user exist and if the password matches
                    if(user && user.password) {
                        const isMatch = compareSync(credentials.password as string, user.password);

                        //If password is correct, return user
                        if (isMatch) {
                            return {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role
                            }
                        }
                    }
                    //If user does not exist or password does not match return null
                    return null;
                },
            }),
    ],
    ...authConfig.callbacks,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);