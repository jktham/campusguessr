import { useState } from "react";
import styles from "/styles/viewer.module.css"

const IMAGES = 21;
let randImageNum = Math.floor(Math.random() * IMAGES);
let url = "/imgs/pans/"+ randImageNum +".jpg";

export default function Viewer() {
    const [scrollPosition, setScrollPosition] = useState(0);

    const scrollLeft = () => {
        const panorama = document.getElementById("panorama-container");


        // panorama.scrollLeft -= 100;
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                panorama.scrollLeft -= 1;
            }, i * 5);
        }
        setScrollPosition(panorama.scrollLeft);
    };

    const scrollRight = () => {
        const panorama = document.getElementById("panorama-container");
        // panorama.scrollLeft += 100;
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                panorama.scrollLeft += 1;
            }, i * 5);
        }
        setScrollPosition(panorama.scrollLeft);
    };

    
    return (
        <div className={styles.panoramaContainer} id="panorama-container">
            <div className={`${styles.scrollArrow} ${styles.leftArrow}`} onClick={scrollLeft}>
                &lt;
            </div>
            <img className={styles.panorama} src={url} alt="Panorama" />
            <div className={`${styles.scrollArrow} ${styles.rightArrow}`} onClick={scrollRight}>
                &gt;
            </div>
        </div>
    );
}
