import { useEffect, useState } from "react";
import { fetchImages } from "./ImageApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import NavBarDoctor from "../../components/NavBarDoctor";
import '../../App.css'

const ImagesPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [images, setImages] = useState<Images | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient");
    if (storedPatient) {
      const patientData: Patient = JSON.parse(storedPatient);
      setSelectedPatient(patientData);
    }
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      const loadImages = async () => {
        setLoading(true);
        try {
          const imageData = await fetchImages(selectedPatient.id);
          if (imageData) {
            console.log("Images fetched");
            setImages(imageData);
          } else {
            console.log("Couldn't get images");
          }
        } catch (error) {
          console.error("Error", error);
        } finally {
          setLoading(false);
        }
      };
      loadImages();
    }
  }, [selectedPatient]); // Depend on selectedPatient

  const imageUrls: string[] = images?.imageUrls ?? [];
  return (
    <>
      <NavBarDoctor />
      {loading || !imageUrls.length ? (
        <LoadingSpinner />
      ) : (
        <div>
          {imageUrls.map((imageUrl, index) => (
            <img className="image-size" key={index} src={imageUrl} alt={`Image ${index}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default ImagesPage;
