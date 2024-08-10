"use client"
import React, { useState} from "react";
import Steps from "@/components/Steps";
import CourseInformation from "@/components/course-create/CourseInformation";

type Props = {};
const Page = (props: Props) => {
    const [active, setActive] = useState(0);

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
                    <section className="mt-5">
                        <h3>gello</h3>
                    </section>
                )
            }
        </div>
    );
};

export default Page;
