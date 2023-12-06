import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import "../../App.css";
import "./Image.css"

const ImagesMock: React.FC = () => {
  const stringArr: string[] = ["https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png", "https://upload.wikimedia.org/wikipedia/commons/3/3c/Anefo_932-2378_Keke_Rosberg%2C_Zandvoort%2C_03-07-1982_-_Restoration.jpg", "Hej3"];
  const [displayImage, setDisplayImage] = useState<boolean>(true);
  const [mockImage, setMockImage] = useState<string>("");

  const handleDropdownItemClick = (imageUrl: string) => {
    console.log(imageUrl);
    setDisplayImage(true);
    setMockImage(imageUrl);
  };

  return (
    <>
      <NavBar></NavBar>
      <DropdownButton
        className="horizontalCenterWithTopMargin"
        id="dropdown-basic-button"
        title="Choose image"
      >
        {stringArr.map((item, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleDropdownItemClick(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      {displayImage && (
        <div className="horizontalCenterWithTopMargin">
          <img className="image-size" src={mockImage} alt="Uploaded image"></img>
        </div>
      )}
    </>
  );
};

export default ImagesMock;