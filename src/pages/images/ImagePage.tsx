import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import { fetchImages } from "./ImageApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import NavBarDoctor from "../../components/NavBarDoctor";
import '../../App.css'
import './Image.css'


const ImagesPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [images, setImages] = useState<Images | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [displayImage, setDisplayImage] = useState<boolean>(true);
  const [mockImage, setMockImage] = useState<string>("");

  const mockArr: string[] = ["https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png", "https://upload.wikimedia.org/wikipedia/commons/3/3c/Anefo_932-2378_Keke_Rosberg%2C_Zandvoort%2C_03-07-1982_-_Restoration.jpg", "Hej3"];


  const handleDropdownItemClick = (imageUrl: string) => {
    console.log(imageUrl);
    setDisplayImage(true);
    setMockImage(imageUrl);
  };


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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <DropdownButton
        className="horizontalCenterWithTopMargin"
        id="dropdown-basic-button"
        title="Choose image"
      >
        {mockArr.map((item, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleDropdownItemClick(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      )}

{displayImage && (
        <div className="horizontalCenterWithTopMargin">
          <img className="image-size" src={mockImage} alt="Uploaded image"></img>
        </div>
      )}
    </>
  );
};

export default ImagesPage;
