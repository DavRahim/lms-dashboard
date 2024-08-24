"use client"
import CourseContent from "@/components/course-create/CourseContent";
import CourseData from "@/components/course-create/CourseData";
import CourseInformation from "@/components/course-create/CourseInformation";
import CoursePreview from "@/components/course-create/CoursePreview";
import Steps from "@/components/Steps";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = ({ params }: any) => {
    const id = params.id;
    console.log(id);
    const [active, setActive] = useState(0);
    const { data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

    const editCourseData = data && data.data.find((i: any) => i._id === id);
    console.log(editCourseData);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatePrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: ''
    })

    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",

            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: ""
        }
    ]);

    const [courseData, setCourseData] = useState({});

    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatePrice: editCourseData?.estimatePrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData.thumbnail?.url,
            })
            setBenefits(editCourseData.benefits)
            setPrerequisites(editCourseData.prerequisites);
            setCourseContentData(editCourseData.courseData)
        }
    }, [editCourseData]);
    const handleSubmit = async () => { }
    const handleCourseCreate = async (e: any) => { }
    return (
        <section className="col-span-10">
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
                        benefits={benefits} prerequisites={prerequisites} setBenefits={setBenefits} setPrerequisites={setPrerequisites}
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
                        isEdit={true}
                    />
                )
            }
        </section>
    );
};

export default Page;
