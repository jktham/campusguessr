import ImageZoom from '../components/ImageZoom';
import Viewer from '../components/viewer';

export default function Home() {
  return (
    <div>
      <h1>Floorplan Viewer</h1>
      <ImageZoom />
      <Viewer/>
    </div>
  );
}
