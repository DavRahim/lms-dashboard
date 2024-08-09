"use client"
import React, { useState } from "react";
import Steps from "@/components/Steps";
import CourseInformation from "@/components/course-create/CourseInformation";

type Props = {};

const Page = (props: Props) => {
    const [active, setActive] = useState(0);
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
        </div>
    );
};

export default Page;
