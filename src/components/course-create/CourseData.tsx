import React, { FC } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { CirclePlus } from "lucide-react";

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void
};

const FormSchema = z.object({
    benefit: z.string().min(3, {
        message: "benefit must be at least 6 characters."
    }),
})

const CourseData: FC<Props> = ({ active, benefits, prerequisites, setActive, setBenefits, setPrerequisites }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            benefit: "",
        },
    });

    const handleBenefitChange = (index: number, value: any) => {
        const updateBenefits = [...benefits];
        updateBenefits[index].title = value
        setBenefits(updateBenefits)
    }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
    }
    return (
        <section className="mt-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                        name="benefit"
                        render={({ field }) => (
                            <FormItem className="space-y-0 mb-4">
                                <FormLabel> What are the benefits for the students in this course?</FormLabel>
                                <FormDescription>
                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                </FormDescription>
                                <FormControl>
                                    {
                                        benefits.map((benefit: any, index: number) => (
                                            <Input
                                                key={index}
                                                placeholder="You will be able to build a full  stack LMS platform..."
                                                {...field}
                                                value={benefit.title}
                                                onChange={(event) => {
                                                    handleBenefitChange(index, event.target.value)
                                                }}
                                            />
                                        ))
                                    }
                                    <CirclePlus className="w-5 h-5 fill-slate-900" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </section>
    );
};

export default CourseData;
