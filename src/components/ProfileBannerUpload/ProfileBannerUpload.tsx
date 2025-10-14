import React, { useState } from 'react';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { CameraIcon } from 'lucide-react';

interface ProfileBannerUploadProps {
  currentImage?: string;
  onImageUpload: (file: File) => Promise<string>;
}

export const ProfileBannerUpload: React.FC<ProfileBannerUploadProps> = ({
  currentImage,
  onImageUpload
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="relative h-32 w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img 
        src={currentImage || "/image copy copy.png"} 
        alt="Banner" 
        className="w-full h-full object-cover"
      />
      
      <div className="absolute inset-0">
        <ImageUploader
          type="banner"
          currentImage={currentImage || "/image copy copy.png"}
          onImageUpload={onImageUpload}
          maxSizeMB={5}
          aspectRatio={3.5}
          minWidth={800}
          minHeight={200}
        />
      </div>
      
      {isHovering && (
        <div className="absolute bottom-2 right-2 bg-white/90 rounded-full p-2 shadow-lg">
          <CameraIcon className="w-5 h-5 text-blue-600" />
        </div>
      )}
    </div>
  );
};