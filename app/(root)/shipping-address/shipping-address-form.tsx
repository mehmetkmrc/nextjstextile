'use client';


import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from 'zod';
import { shippingAddressDefaultValues } from "@/lib/constants";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";



const ShippingAddressForm = ({address}: {address: ShippingAddress }) => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address || shippingAddressDefaultValues,
    });


    const [isPending, startTransition] = useTransition();

    const onSubmit = (values) =>{
        console.log(values);
        return;
    }

    return <>
        <div className="max-w-md mx-auto space-y-4">
            <h1 className="h2-bold mt-4">
                Shipping Address
            </h1>
            <p className="text-sm text-muted-foreground">
                Please enter and address to ship to
            </p>
            <Form {...form}>
               <form method="post" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
            control={form.control}
            name="fullName"
            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema, 'fullName'>>}) => (
                <FormItem className="w-full">
                <FormLabel>Tam Adı</FormLabel>
                <FormControl>
                    <Input placeholder="Enter full name..." {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema, 'streetAddress'>>}) => (
                <FormItem className="w-full">
                <FormLabel>Adres</FormLabel>
                <FormControl>
                    <Input placeholder="Adresi Giriniz..." {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
            control={form.control}
            name="city"
            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema, 'city'>>}) => (
                <FormItem className="w-full">
                <FormLabel>Şehir</FormLabel>
                <FormControl>
                    <Input placeholder="Şehri Giriniz..." {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
            control={form.control}
            name="postalCode"
            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema, 'postalCode'>>}) => (
                <FormItem className="w-full">
                <FormLabel>Posta Kodu</FormLabel>
                <FormControl>
                    <Input placeholder="Posta kodunu Giriniz..." {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />
                    </div>
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
            control={form.control}
            name="country"
            render={({ field }: {field: ControllerRenderProps<z.infer<typeof shippingAddressSchema, 'country'>>}) => (
                <FormItem className="w-full">
                <FormLabel>Ülke</FormLabel>
                <FormControl>
                    <Input placeholder="Ülkeyi Giriniz..." {...field} />
                </FormControl>
                
                <FormMessage />
                </FormItem>
            )}
            />
                    </div>
                    <div className="flex gap-2">
                        <Button type='submit' disabled={isPending}>
                            {isPending ? (
                                <Loader className='w-4 h-4 animate-spin' />
                            ) : (
                                <ArrowRight className='w-4 h-4' />
                            )}{' '}
                            Continue
                        </Button>
                    </div>
                </form> 
            </Form>
        </div>
    </>;
}
 
export default ShippingAddressForm;