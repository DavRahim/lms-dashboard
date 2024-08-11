"use client"
import React, { useState } from "react";
import Steps from "@/components/Steps";
import CourseInformation from "@/components/course-create/CourseInformation";
import CourseData from "@/components/course-create/CourseData";
import CourseContent from "@/components/course-create/CourseContent";
import CoursePreview from "@/components/course-create/CoursePreview";

type Props = {};
const Page = (props: Props) => {
    const [active, setActive] = useState(3);

    // course info data
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatePrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thumbnail: ''
    });

    // benefits & prerequisites data
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);


    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: ""
        }
    ])

    const [courseData, setCourseData] = useState({})

    const handleSubmit = async () => {
        // format benefits array
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
        // format prerequisite array
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))

        // format course content array;
        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoLength: courseContent.videoLength,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url
            })),
            suggestion: courseContent.suggestion
        }))

        // prepare our data object;
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            categories: courseInfo.categories,
            estimatePrice: courseInfo.estimatePrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData
        }

        setCourseData(data)

    }

    const handleCourseCreate = async (e: any) => {
        const data = courseData
        // if (!isLoading) {

        //     await createCourse(data)
        // }
    }

    return (
        <div className="col-span-10">
            <Steps />
            {
                active === 0 && (
                    <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )
            }
            {
                active === 1 && (
                    <CourseData
                        benefits={benefits} 
                        prerequisites={prerequisites} 
                        setBenefits={setBenefits} 
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                )
            }
            {
                active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )
            }
            {
                active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={false}
                    />
                )
            }
        </div>
    );
};

export default Page;
