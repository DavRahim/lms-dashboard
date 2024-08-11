import React, { FC } from "react";
import CoursePlayer from "./CoursePlayer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Ratings from "@/lib/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";


type Props = {
    active: number;
    setActive: (active: number) => void;
    courseData: any;
    handleCourseCreate: any;
    isEdit: boolean
};

const CoursePreview: FC<Props> = ({ active, courseData, handleCourseCreate, setActive, isEdit }) => {
    const discountPercentage = ((courseData?.estimatePrice - courseData?.price) / courseData?.estimatePrice) * 100;
    const discountPercentagePrice = discountPercentage.toFixed(0)
    const prevButton = () => {
        setActive(active - 1)
    }
    const createCourse = () => {
        handleCourseCreate()
    }

    return (
        <section className="mt-5">
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl || "https://www.youtube.com/embed/TEobabW0Y5Y?si=-IwSylN_MrY7srPd"}
                        title={courseData?.title || "hello"}
                    />
                </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px]">
                        {/* {courseData?.price === 0 ? "free" : courseData?.price + "$"} */}
                        Free
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-3 line-through opacity-85">
                        {/* {courseData?.estimatePrice} */}
                        88
                    </h5>
                    <h4 className="pl-5 pt-4 text-[22px]">
                        {/* {discountPercentagePrice}% Off */}
                        77%
                    </h4>
                </div>
                <div className="flex items-center">
                    <Button>
                        Buy Now 55
                        {/* Buy Now {courseData?.price} */}
                    </Button>
                </div>
                <div className="w-[60%] mt-4 flex items-center  gap-4">
                    <Input type="text" name="" id="" placeholder="Discount code ...." />
                    <Button>
                        Apply
                    </Button>
                </div>
                <br />
                <div>
                    <p className="pb-1">Source Code included</p>
                    <p className="pb-1">Source Code included</p>
                    <p className="pb-1">Source Code included</p>
                    <p className="pb-1">Source Code included</p>
                </div>
            </div>
            <br />
            <div className="w-full">
                <div className="w-full md:pr-5">
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        {/* {courseData?.name} */}
                        4 Tips To Succeed As A Self Taught Developer
                    </h1>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                            <Ratings rating={0} />
                            <h5>0 Review</h5>
                        </div>
                        <h5> 0 Students</h5>
                    </div>
                    <br />
                    {/* course */}
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        What you will learn from this course ?
                    </h1>
                </div>
                {
                    [1, 2, 34, 5, 6]?.map((item: any, index: number) => (
                        <div className="w-full flex md:items-center py-2" key={index}>
                            <div className="w-[15px] mr-1">
                                <IoCheckmarkDoneOutline size={20} />
                            </div>
                            <p className="pl-2">{"4 Tips To Succeed As A Self Taught Developer"}</p>
                        </div>
                    ))
                }
                <br />
                <br />
                {/*  prerequisite*/}
                <h1 className="text-[25px] font-Poppins font-[600]">
                    What are the prerequisite for stating this course?
                </h1>
                {
                    [1, 2, 34, 5, 6]?.map((item: any, index: number) => (
                        <div className="w-full flex md:items-center py-2" key={index}>
                            <div className="w-[15px] mr-1">
                                <IoCheckmarkDoneOutline size={20} />
                            </div>
                            <p className="pl-2">{"4 Tips To Succeed As A Self Taught Developer"}</p>
                        </div>
                    ))
                }
                <br />
                <br />
                {/* course description */}
                <div className="w-full">
                    <h1 className="text-[25px] font-Poppins font-[600]"> Course Details</h1>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, numquam hic magnam facilis distinctio nulla omnis delectus nihil debitis?
                        {/* {courseData?.description} */}
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="w-full md:w-[100px] flex justify-center items-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer" onClick={() => prevButton()}>
                    prev
                </div>
                <div className="w-full md:w-[100px] flex justify-center items-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded cursor-pointer" onClick={() => createCourse()}>
                    {
                        isEdit ? "Update" : "Create"
                    }
                </div>
            </div>
        </section>
    );
};

export default CoursePreview;
