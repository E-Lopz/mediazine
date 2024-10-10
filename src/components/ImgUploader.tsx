import React from 'react';
import './ImgUploader.css'

interface ImgUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImgUploader: React.FC<ImgUploaderProps> = ({ onImageUpload }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string); // Call the onImageUpload function with the new image URL
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div>
      <form id="form" encType="multipart/form-data">
        {/* File input to upload an image */}
        <input type="file" id="file" accept="image/*" onChange={handleImageChange} />
      </form>
    </div>
  );
};

export default ImgUploader;



