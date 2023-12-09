import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import {
  fetchImage,
  fetchImageMetadata,
  addImageToDb,
  putImageToDb,
} from "./ImageApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./Image.css";
import CanvasComponent from "../../components/Canvas";
import { Button } from "react-bootstrap";
import { ColorResult, CompactPicker } from "react-color";
import TwoRadioButtons from "../../components/RadioButton";
import { Popup } from "../../components/SaveImagePopup";
import { InformationPopup } from "../../components/InformationPopup";
import NavBar from "../../components/NavBar";

const ImagesPage: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [imagesMetaData, setImagesMetaData] = useState<ImageMetadata | null>(
    null
  );

  const [imageMeta, setImageMeta] = useState<imageData[]>([]);

  const [currentImageId, setCurrentImageId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [showImage, setShowImage] = useState<boolean>(false);
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [canvasColor, setCanvasColor] = useState<string>("#000000");
  const [selectedOption, setSelectedOption] = useState<boolean>(true);
  const [allowEdit, setAllowEdit] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState<string | null>("");
  const [refreshMetadata, setRefreshMetadata] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [informationPopupText, setInformationPopupText] = useState<string>("");
  const [informationPopupVisible, setInformationPopupVisible] = useState<boolean>(false);
  const [resetImage, setResetImage] = useState<boolean>(false);

  const handleResetPopup = () => {
    setResetImage(!resetImage);
  }
  const handleCloseInformationPopup = () => {
    setInformationPopupText("");
    setInformationPopupVisible(false);
  }



  const handleSubmit = async () => {
    if (!canvasRef.current) return;
    const imageData = canvasRef.current.toDataURL();
    if (!selectedPatient) return;
    if (currentImageId === null) return;

    if (!inputText || inputText.length < 3) {
      setInputError("Please enter atleast 3 characters");
      return;
    } else if (inputText.length > 30) {
      setInputError("Please enter less than 30 characters");
      return;
    }
    let isSuccess = false;
    if (currentImageId.length === 0) {
      // image loaded from file, post
      isSuccess = await addImageToDb(imageData, selectedPatient.id.toString(), inputText);
    } else {
      // image loaded from db, put
      isSuccess = await putImageToDb(
        imageData,
        selectedPatient.id.toString(),
        inputText,
        currentImageId
      );
    }

    if (isSuccess) {
      setInformationPopupText("Uploaded image successfully!")
    } else {
      setInformationPopupText("Could not upload image.")
    }
    
    setInformationPopupVisible(true);
    setInputText("");
    setShowPopup(false);
    setAllowEdit(false);
    setInputError(null);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputText(event.target.value);

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setShowImage(true);
      setImageSrc(URL.createObjectURL(file));
      setAllowEdit(false);
      setShowPopup(true)
      setCurrentImageId("");
    } else {
      console.error("File is not an image.");
    }
  };

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.id);
    setSelectedOption(!selectedOption);
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const handleEditImage = () => {
    setShowPopup(true);
    setAllowEdit(true);
  };

  const handleDropdownItemClick = async (itemId: string) => {
    if (imagesMetaData && imagesMetaData.mongoId) {
      try {
        const imageData = await fetchImage(itemId, imagesMetaData.mongoId);
        if (imageData) {
          const base64Image = imageData.base64Image;
          const contentType = imageData.contentType;
          const fullImageSrc = "data:" + contentType + ";base64," + base64Image;
          setImageSrc(fullImageSrc);
          setShowImage(true);
          setAllowEdit(false);
          setCurrentImageId(itemId);
          setShowPopup(false);
        }
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    }
  };

  const handleChangeComplete = (color: ColorResult) => {
    console.log(color.hex);
    setCanvasColor(color.hex);
  };

  // Setting the patient and privilege from local storage
  useEffect(() => {
    const storedPatient = localStorage.getItem("currentPatient");
    const privilege = localStorage.getItem("privilege");
    if (storedPatient) {
      const patientData: Patient = JSON.parse(storedPatient);
      if (patientData.id !== selectedPatient?.id)
        setSelectedPatient(patientData);
    }
    if (privilege == "DOCTOR") {
      setIsDoctor(true);
    } else {
      setIsDoctor(false);
    }
  }, [selectedPatient]);

  // Fetching information about all images (no images)

  useEffect(() => {
    if (selectedPatient) {
      const loadImages = async () => {
        setLoading(true);
        try {
          const metadata = await fetchImageMetadata(selectedPatient.id);
          if (metadata && metadata.images) {
            setImagesMetaData(metadata);
            setImageMeta(metadata.images);
          } else {
            console.log("Couldn't get metadata");
          }
        } catch (error) {
          console.error("Error", error);
        } finally {
          setLoading(false);
        }
      };
      loadImages().then((r) => r);
    }
  }, [selectedPatient, refreshMetadata]);

  return (
    <>
      <NavBar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png"
          />
          <div className="button-row">
            <Button
              id="refresh-images-button"
              title="Refresh Button"
              onClick={() => setRefreshMetadata(refreshMetadata + 1)}
            >
              Refresh
            </Button>
            <DropdownButton id="dropdown-basic-button" title="Choose image">
              {imageMeta.map((item) => (
                <Dropdown.Item
                  key={item.imageId}
                  onClick={() => handleDropdownItemClick(item.imageId)}
                >
                  {item.description}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <Button
              id="upload-image-button"
              title="Upload image"
              onClick={openFileSelector}
            >
              Upload image
            </Button>

            {showImage && isDoctor && (
              <Button
                id="edit-image-button"
                title="Edit image"
                onClick={handleEditImage}
              >
                Edit image
              </Button>
            )}
          </div>
        </>
      )}

      {showImage && (
        <div className="container">
         <div>
          <div className="information-popup">
         <InformationPopup textValue = {informationPopupText} isVisible={informationPopupVisible} onClose={handleCloseInformationPopup}></InformationPopup>
         </div>
          <CanvasComponent
            canvasRef={canvasRef}
            imageUrl={imageSrc}
            draw={selectedOption}
            hexColor={canvasColor}
            allowEdit={allowEdit}
            resetImage={resetImage}
          >
          </CanvasComponent>
          </div>
          <div className="color-picker">
            <div>
              <Popup
                isVisible={showPopup}
                onReset={handleResetPopup}
                onSubmit={handleSubmit}
                onTextChange={handleTextChange}
                textValue={inputText}
                inputError={inputError}
              ></Popup>
            </div>
            {allowEdit && (
              <>
                <div style={{ margin: "1rem" }}>
                  <CompactPicker
                    color={canvasColor}
                    onChangeComplete={handleChangeComplete}
                  ></CompactPicker>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <TwoRadioButtons
                    firstButtonName="Draw"
                    seconButtonName="Write"
                    handleOptionChange={handleRadioButtonChange}
                    activeButton={selectedOption}
                  ></TwoRadioButtons>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImagesPage;
