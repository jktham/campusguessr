import { useState, useEffect } from "react";
import styles from "/styles/viewer.module.css";

const IMAGES = 21;

export default function Viewer() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [url, setUrl] = useState("");

    // Randomize the image URL on component load
    useEffect(() => {
        let randImageNum = Math.floor(Math.random() * IMAGES);
        let randomUrl = `/imgs/pans/${randImageNum}.jpg`;
        setUrl(randomUrl);
    }, []);

    const scrollLeft = () => {
        const panorama = document.getElementById("panorama-container");

        // Scroll left with animation
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                panorama.scrollLeft -= 1;
            }, i * 5);
        }
        setScrollPosition(panorama.scrollLeft);
    };

    const scrollRight = () => {
        const panorama = document.getElementById("panorama-container");

        // Scroll right with animation
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
            {url && <img className={styles.panorama} src={url} alt="Panorama" />}
            <div className={`${styles.scrollArrow} ${styles.rightArrow}`} onClick={scrollRight}>
                &gt;
            </div>
        </div>
    );
}
