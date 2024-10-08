import React, { FC, useEffect, useState } from "react";
type Props = {
    videoUrl: string;
    title: string
};
const CoursePlayer: FC<Props> = ({ title, videoUrl }) => {
    // getVdoChiperOTP

    // const [videoData, setVideoData] = useState({
    //     otp: "",
    //     playbackInfo: ""
    // })
    // // console.log(videoUrl);

    // useEffect(() => {
    //     axios.post(`http://localhost:4000/api/v1/getVdoChiperOTP`, {
    //         videoId: videoUrl
    //     }).then((res) => {

    //         // console.log(res.data, "res.data");
    //         setVideoData(res.data)
    //     })
    // }, [videoUrl])

    return (
        <div style={{ paddingTop: "56.25%", position: "relative", overflow: "hidden" }}>
            <iframe src={videoUrl} style={{
                border: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0
            }}
                allowFullScreen={true}
                allow="encrypted-media"
            ></iframe>
        </div>
    );
};

export default CoursePlayer;
