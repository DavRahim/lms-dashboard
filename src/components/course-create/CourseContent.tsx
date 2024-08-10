import React, { FC, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { ArrowBigDown, CirclePlus, Link, Pencil, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any
};

const FormSchema = z.object({
    videoSection: z.any(),
    title: z.any(),
    videoUrl: z.any(),
    videoLength: z.any(),
    description: z.any(),
    linkTitle: z.any(),
    linkUrl: z.any(),
    demoUrl: z.string().min(3, {
        message: "demoUrl must be at least 6 characters."
    }),
    thumbnail: z
        .any(),
})

const CourseContent: FC<Props> = ({ active, courseContentData, handleSubmit: handleCourseSubmit, setActive, setCourseContentData }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            videoSection: "",
            title: "",
            videoUrl: "",
            videoLength: "",
            description: "",
            linkTitle: "",
            linkUrl: "",
            demoUrl: "",
            thumbnail: new File([""], "thumbnail"),
        },
    });

    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)

    );
    const handleCollapseToggle = (index: number) => {
        const updateCollapse = [...isCollapsed];
        updateCollapse[index] = !updateCollapse[index];
        setIsCollapsed(updateCollapse)
    };
    const handleRemoveLink = (index: number, LinkIndex: number) => {
        const updateData = [...courseContentData];
        updateData[index].links.splice(LinkIndex, 1)
        setCourseContentData(updateData)
    };
    const handleLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData)
    };
    const newContentHandler = (item: any) => {
        if (item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
            console.log("Please fill all the fields first")
        } else {
            let newVideoSection = "";
            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

                // use the last videoSection if available , else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection
                }
            }
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [{ title: "", url: "" }]
            }

            setCourseContentData([...courseContentData, newContent])
        }
    }

    const prevButton = () => {
        setActive(active - 1)
    }

    const handleOption = () => {
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {

            console.log("section can't be empty!")
        } else {
            setActive(active + 1)
            handleCourseSubmit()
        }

    }

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data)
    }
    return (
        <section className="mt-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    {
                        courseContentData && courseContentData?.map((item: any, index: number) => {
                            const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection
                            return (
                                <>
                                    <div key={index} className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                        {
                                            showSectionInput && (
                                                <>
                                                    <FormField
                                                        name="videoSection"
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-0 mb-4">
                                                                <FormLabel>Enter Your videoSection</FormLabel>
                                                                <FormDescription>
                                                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                                                </FormDescription>
                                                                <FormControl>
                                                                    <div className="flex w-full items-center">
                                                                        <Input
                                                                            className={`text-[20px] ${item.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none `}
                                                                            {...field}
                                                                            value={item?.videoSection}
                                                                            placeholder="MERN stack LMS platform with next 13"
                                                                            onChange={(event) => {
                                                                                const updateData = [...courseContentData];
                                                                                updateData[index].videoSection = event.target.value;
                                                                                setCourseContentData(updateData)
                                                                            }}
                                                                        />
                                                                        <Pencil className="w-5 h-5" />
                                                                    </div>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </>
                                            )
                                        }
                                        <div className="flex w-full items-center justify-between my-0">
                                            {
                                                isCollapsed[index] ? (
                                                    <>
                                                        {
                                                            item.title ? (
                                                                <p className="font-Poppins dark:text-white text-black">
                                                                    {index + 1}. {item.title}
                                                                </p>
                                                            ) : ""
                                                        }
                                                    </>

                                                ) : ""
                                            }
                                            {/* arrow button for collapsed video content */}
                                            <div className="flex justify-between items-center">
                                                <Trash2
                                                    className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"} w-5 h-5`}
                                                    onClick={() => {
                                                        if (index > 0) {
                                                            const updateData = [...courseContentData];
                                                            updateData.splice(index, 1);
                                                            setCourseContentData(updateData)
                                                        }
                                                    }}
                                                />
                                                <ArrowBigDown
                                                    className="dark:text-white text-black w-6 h-6"
                                                    style={{
                                                        transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                                                    }}
                                                    onClick={() => handleCollapseToggle(index)}
                                                />
                                            </div>
                                        </div>
                                        {
                                            !isCollapsed[index] && (
                                                <>
                                                    <FormField
                                                        name="title"
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-0 my-4">
                                                                <FormLabel>Video Title</FormLabel>
                                                                <FormDescription>
                                                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                                                </FormDescription>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Project plan..."
                                                                        {...field}
                                                                        value={item.title}
                                                                        onChange={(e) => {
                                                                            const updateData = [...courseContentData];
                                                                            updateData[index].title = e.target.value;
                                                                            setCourseContentData(updateData)
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        name="videoUrl"
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-0 my-4">
                                                                <FormLabel>Video Url</FormLabel>
                                                                <FormDescription>
                                                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                                                </FormDescription>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Video url..."
                                                                        {...field}
                                                                        value={item.videoUrl}
                                                                        onChange={(e) => {
                                                                            const updateData = [...courseContentData];
                                                                            updateData[index].videoUrl = e.target.value;
                                                                            setCourseContentData(updateData)
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        name="videoLength"
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-0 my-4">
                                                                <FormLabel>Video Length</FormLabel>
                                                                <FormDescription>
                                                                    This name will be used in all communications. So provide correct name. Please do not use any pseudonyms.
                                                                </FormDescription>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Video Length 70:00..."
                                                                        {...field}
                                                                        value={item.videoLength}
                                                                        onChange={(e) => {
                                                                            const updateData = [...courseContentData];
                                                                            updateData[index].videoLength = e.target.value;
                                                                            setCourseContentData(updateData)
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        name="description"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <Label htmlFor="address">Video Description</Label>
                                                                <FormDescription>
                                                                    Necessary documents can be sent to this address through courier service. So provide correct address.
                                                                </FormDescription>
                                                                <FormControl>
                                                                    <Textarea
                                                                        className="resize-none"
                                                                        cols={30}
                                                                        rows={8}
                                                                        placeholder="Write something amazing" {...field}
                                                                        value={item.description}
                                                                        onChange={(e) => {
                                                                            const updateData = [...courseContentData];
                                                                            updateData[index].description = e.target.value;
                                                                            setCourseContentData(updateData)
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {
                                                        item?.links.map((link: any, LinkIndex: number) => (
                                                            <div key={index} className="mb-3 block">
                                                                <div className="w-full flex items-center justify-between">
                                                                    <Label>Link {LinkIndex + 1}</Label>
                                                                    <Trash2 className={`${LinkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"} text-black dark:text-white text-[20px] w-5 h-5`}
                                                                        onClick={() => LinkIndex === 0 ? null : handleRemoveLink(index, LinkIndex)}
                                                                    />
                                                                </div>
                                                                <FormField
                                                                    name="linkTitle"
                                                                    render={({ field }) => (
                                                                        <FormItem className="space-y-0 my-4">
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="Source code ... [Link title]"
                                                                                    {...field}
                                                                                    value={link.title}
                                                                                    onChange={(e) => {
                                                                                        const updateData = [...courseContentData];
                                                                                        updateData[index].links[LinkIndex].title = e.target.value;
                                                                                        setCourseContentData(updateData)
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    name="linkUrl"
                                                                    render={({ field }) => (
                                                                        <FormItem className="space-y-0 my-4">
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="Source code ... [Link title]"
                                                                                    {...field}
                                                                                    value={link.url}
                                                                                    onChange={(e) => {
                                                                                        const updateData = [...courseContentData];
                                                                                        updateData[index].links[LinkIndex].url = e.target.value;
                                                                                        setCourseContentData(updateData)
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                    {/* add link button */}
                                                    <div className="inline-block mb-4">
                                                        <p className="flex items-center tex-[18px] dark:text-white text-black cursor-pointer" onClick={() => handleLink(index)}>
                                                            <Link className="w-5 h-5" />Add Link
                                                        </p>
                                                    </div>

                                                </>
                                            )
                                        }
                                        {/* add new content */}
                                        {
                                            index === courseContentData.length - 1 && (
                                                <div>
                                                    <p
                                                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer" onClick={() => newContentHandler(item)}>
                                                        <CirclePlus className="w-5 h-5" /> Add New Content
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                            )
                        })
                    }
                </form>
            </Form>
            <div className="w-full flex items-center justify-between">
                <div className="w-full 800px:w-[100px] flex justify-center items-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer" onClick={() => prevButton()}>
                    prev
                </div>
                <div className="w-full 800px:w-[100px] flex justify-center items-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer" onClick={() => handleOption()}>
                    Next
                </div>
            </div>
        </section>
    );
};

export default CourseContent;
