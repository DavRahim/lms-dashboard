import React, { FC, useEffect, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const FormSchema = z.object({
    name: z.string().min(3, {
        message: "Password must be at least 6 characters."
    }),
    description: z.string().min(3, {
        message: "description must be at least 6 characters."
    }),
    price: z.coerce.number(),
    estimatePrice: z.coerce.number(),
    tags: z.string().min(3, {
        message: "tags must be at least 6 characters."
    }),
    categories: z
        .string({
            required_error: "Please select an categories to display.",
        }),
    level: z
        .string({
            required_error: "Please select an level to display.",
        }),
    demoUrl: z.string().min(3, {
        message: "demoUrl must be at least 6 characters."
    }),
    thumbnail: z
        .any(),
})

const CourseInformation: FC<Props> = ({ active, courseInfo, setActive, setCourseInfo }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            estimatePrice: 0,
            tags: "",
            categories: "",
            level: "",
            demoUrl: "",
            thumbnail: new File([""], "thumbnail"),
        },
    });
    const [dragging, setDragging] = useState(false);
    const [imageShow, setImageShow] = useState<any>("");
    const [baseImage, setBaseImage] = useState<any>("");
    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const thumbnail = fileReader.result
            if (fileReader.readyState === 2) {
                setBaseImage(thumbnail)
            }
        }
        if (imageShow) {
            fileReader.readAsDataURL(imageShow.target.files[0]);
        }
    }, [imageShow, baseImage])
    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true)
    }
    const handleDragLeave = (e: any) => {
        e.preventDefault()
        setDragging(false)
    }
    const handleDrop = (e: any) => {
        setBaseImage("")
        e.preventDefault()
        setDragging(false);
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const thumbnail = reader.result
                if (reader.readyState === 2) {
                    setBaseImage(thumbnail)
                }
            }
            reader.readAsDataURL(file)
        }
    }
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
    }
    return (
        <section className="mt-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-0 mb-4">
                                <FormLabel>Enter Your Course Name</FormLabel>
                                <FormDescription>
                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                </FormDescription>
                                <FormControl>
                                    <Input placeholder="MERN stack LMS platform with next 13" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="address">Your full address </Label>
                                <FormDescription>
                                    Necessary documents can be sent to this address through courier service. So provide correct address.
                                </FormDescription>
                                <FormControl>
                                    <Textarea className="resize-none" cols={30} rows={8} placeholder="Write something amazing" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-between">
                        <FormField
                            name="price"
                            render={({ field }) => (
                                <FormItem className="w-[45%] space-y-0 mb-4">
                                    <FormLabel> Course Price</FormLabel>
                                    <FormDescription>
                                        This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                    </FormDescription>
                                    <FormControl>
                                        <Input type="number" placeholder="course price $99" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="estimatePrice"
                            render={({ field }) => (
                                <FormItem className="w-[50%] space-y-0 mb-4">
                                    <FormLabel>  Estimated Price(optional)</FormLabel>
                                    <FormDescription>
                                        This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                    </FormDescription>
                                    <FormControl>
                                        <Input type="number" placeholder="course price $99" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex justify-between">
                        <FormField
                            name="tags"
                            render={({ field }) => (
                                <FormItem className="w-[45%] space-y-0 mb-4">
                                    <FormLabel>  Course Categories</FormLabel>
                                    <FormDescription>
                                        This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                    </FormDescription>
                                    <FormControl>
                                        <Input placeholder="MERN, stack, LMS, platform, next 13" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="categories"
                            render={({ field }) => (
                                <FormItem className="w-[50%] space-y-0 mb-4">
                                    <FormLabel> Course Tags</FormLabel>
                                    <FormDescription>
                                        This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                    </FormDescription>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Categories" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="mern-stack">mern-stack</SelectItem>
                                            <SelectItem value="javascript">javascript</SelectItem>
                                            <SelectItem value="nextjs">nextjs</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="w-full flex justify-between">
                        <FormField
                            name="demoUrl"
                            render={({ field }) => (
                                <FormItem className="w-[45%] space-y-0 mb-4">
                                    <FormLabel>  Demo  Url</FormLabel>
                                    <FormDescription>
                                        This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                    </FormDescription>
                                    <FormControl>
                                        <Input placeholder="Eromfao5435" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="level"
                            render={({ field }) => (
                                <FormItem className="w-[50%] space-y-0 mb-4">
                                    <FormLabel> Course Level</FormLabel>
                                    <FormDescription>
                                        This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                    </FormDescription>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                                            <SelectItem value="Expert">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem className="space-y-0 mb-4">
                                <FormLabel>Add Your course thumbnail</FormLabel>
                                <FormDescription>
                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                </FormDescription>
                                <Input className="hidden" accept="image/*" type="file" id="file" name="thumbnail" onChange={(event) => {
                                    if (!event.target.files) return
                                    field.onChange(event.target.files[0])
                                    setImageShow(event)
                                }} />
                                <Label
                                    htmlFor="file"
                                    className={`w-full min-h-[10vh] dark:border-white border-[#00000020] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    {
                                        baseImage ? (
                                            <Image
                                                alt="thumbnail"
                                                src={baseImage}
                                                className="max-h-full w-full object-cover"
                                                width={500}
                                                height={500}
                                            />

                                        ) : (
                                            <span className="text-black dark:text-white">
                                                Drag and Drop your thumbnail or click to browse
                                            </span>
                                        )
                                    }
                                </Label>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        Submit information
                        <ArrowRight className="h-4 w-6 text-white fill-white" />
                    </Button>
                </form>
            </Form>
        </section>
    );
};

export default CourseInformation;
