"use client"

import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { styles } from "@/lib/styles";


const FormSchema = z.object({
    email: z.string().min(2, {
        message: "email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    })
})

const Page = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });
    const [login, { data: loginData, isSuccess, error }] = useLoginMutation();
    const { toast } = useToast();
    const router = useRouter()
    const { user } = useSelector((state: any) => state.auth)
    useEffect(() => {
        if (isSuccess && loginData) {
            toast({
                title: "Uh oh! YOU LOGIN SUCCESSFULLY.",
                description: "You are login success. Access your course.!",
            })
            router.push('/');
        } else if (error) {
            if ("data" in error) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        }
    }, [isSuccess, error, loginData, toast, router])

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await login({ email: data.email, password: data.password })
    }
    const [passwordShow, setPasswordShow] = useState("password");
    if (user) return router.push('/account');
    return (
        <section className={`dark:${styles.darkTheme} min-h-screen`}>
            <MaxWidthWrapper className="flex flex-col gap-6 lg:flex-row lg:gap-20 py-10">
                <div className="w-full space-y-8">
                    <div>
                        <h1 className="text-center text-gray-900 dark:text-white text-4xl font-semibold">
                            <span className="text-green-600">Login</span> RsLms
                        </h1>
                        <p className="subtitle mx-auto w-full text-center">Do not share your login information with anyone</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Your Email</FormLabel>
                                        <FormDescription>
                                            The email address you registered with.
                                        </FormDescription>
                                        <FormControl>
                                            <Input placeholder="Jhno@gamil.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Your Password</FormLabel>
                                        <FormDescription>
                                            Password must be at least 8 characters long and contain at least 1 letter and 1 number.
                                        </FormDescription>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type={passwordShow} placeholder="anyPassword1971" {...field} />
                                                {passwordShow === "text" ? <EyeOff onClick={() => setPasswordShow("password")} className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2" /> : <Eye onClick={() => setPasswordShow("text")} className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2" />}
                                            </div>
                                            {/* <Input type="password" placeholder="anyPassword1971" {...field} /> */}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between items-center">
                                <Button type="submit">Submit</Button>
                                <p className=" hover:underline">Forgot password? </p>
                            </div>
                        </form>
                    </Form>

                </div>
                <div className="w-full">
                    <div className="flex h-full w-full items-center justify-center">
                        <Image
                            src={'/login.png'}
                            className="w-full h-full"
                            alt="login"
                            width={500}
                            height={700}
                        />
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
};

export default Page;
