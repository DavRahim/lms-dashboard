import React, { FC } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { ArrowLeft, ArrowRight, CirclePlus } from "lucide-react";
import { Button } from "../ui/button";

const FormSchema = z.object({
    benefit: z.any(),
    prerequisite: z.any()
})

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void
};

const CourseData: FC<Props> = ({ active, benefits, prerequisites, setActive, setBenefits, setPrerequisites }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            benefit: "",
            prerequisite: ""
        },
    });

    const handleBenefitChange = (index: number, value: any) => {
        const updateBenefits = [...benefits];
        updateBenefits[index].title = value
        setBenefits(updateBenefits)
    }
    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }])
    }

    const handlePrerequisiteChange = (index: number, value: any) => {
        const updatePrerequisite = [...prerequisites];
        updatePrerequisite[index].title = value
        setPrerequisites(updatePrerequisite)
    }

    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: "" }])
    }
    const prevButton = () => {
        setActive(active - 1)
    }
    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(1)
            console.log(benefits, prerequisites)
        } else {
          console.log("error");
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
                        name="benefit"
                        render={({ field }) => (
                            <FormItem className="space-y-0 mb-4">
                                <FormLabel> What are the benefits for the students in this course?</FormLabel>
                                <FormDescription>
                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                </FormDescription>
                                <FormControl>
                                    <div>
                                        {
                                            benefits && benefits.map((benefit: any, index: number) => (
                                                <Input
                                                    key={index}
                                                    placeholder="You will be able to build a full  stack LMS platform..."
                                                    {...field}
                                                    value={benefit.title}
                                                    onChange={(event) => {
                                                        handleBenefitChange(index, event.target.value)
                                                    }}
                                                    className="my-3"
                                                />
                                            ))
                                        }
                                        <CirclePlus onClick={handleAddBenefit} className="w-5 h-5 mt-3" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="prerequisite"
                        render={({ field }) => (
                            <FormItem className="space-y-0 mb-4">
                                <FormLabel>  What are the Prerequisites for  starting this course?</FormLabel>
                                <FormDescription>
                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                </FormDescription>
                                <FormControl>
                                    <div>
                                        {
                                            prerequisites && prerequisites.map((prerequisite: any, index: number) => (
                                                <Input
                                                    key={index}
                                                    placeholder="You will be able to build a full  stack LMS platform..."
                                                    {...field}
                                                    value={prerequisite.title}
                                                    onChange={(event) => {
                                                        handlePrerequisiteChange(index, event.target.value)
                                                    }}
                                                    className="my-3"
                                                />
                                            ))
                                        }
                                        <CirclePlus onClick={handleAddPrerequisite} className="w-5 h-5 mt-3" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex items-center justify-between">
                        <Button onClick={() => prevButton()}>
                            Prev
                            <ArrowLeft className="h-4 w-6 text-white fill-white" />
                        </Button>
                        <Button onClick={() => handleOptions()} type="submit">
                            Next
                            <ArrowRight className="h-4 w-6 text-white fill-white" />
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    );
};

export default CourseData;
