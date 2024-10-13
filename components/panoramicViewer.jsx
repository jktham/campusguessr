import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import styles from "/styles/panoramicViewer.module.css";

export default function PanoramicViewer({url}) {

    const ref = useRef();
    const { events } = useDraggable(ref);

    return (
        <div className={styles.panoramaContainer} {...events} ref={ref}>
            {url && <img className={styles.panorama} src={url} alt="Panorama" />}
        </div>
    );
}
