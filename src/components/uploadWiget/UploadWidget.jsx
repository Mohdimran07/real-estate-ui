import { useEffect, useRef } from "react";

const UploadWidget = ({ uwConfig, setPublicId, setState }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      console.log("started!!!!!!")
      console.log('window.cloudinary', window.cloudinary)
      console.log('uploadButtonRef', uploadButtonRef)
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Upload successful:", result.info);
              setState(prev => [...prev, result.info.secure_url]);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          console.log("uploadWidgetRef.current", uploadWidgetRef.current);
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        console.log(buttonElement);
        buttonElement.addEventListener("click", handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener("click", handleUploadClick);
        };
      }
    };

    initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
       className="cloudinary-button"
    >
      Upload
    </button>
  );
};

export default UploadWidget;
