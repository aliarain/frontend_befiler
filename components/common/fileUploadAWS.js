import { uploadToVercelStorage, uploadMultipleToVercelStorage } from "../../helpers/vercelStorage";

const fileUpload = (setFileLoading, e, cb, setIsPhotoUploaded, arrayData = false) => {
    setFileLoading(true);
    const data = new FormData();
    const files = e.target.files;
    
    if (arrayData) {
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
    } else {
        data.append('file', files[0]);
    }

    try {
        if (arrayData) {
            uploadMultipleToVercelStorage(files).then(urls => {
                setFileLoading(false);
                setIsPhotoUploaded(true);
                cb(urls);
            }).catch(error => {
                setFileLoading(false);
                setIsPhotoUploaded(false);
                console.error('Upload error:', error);
            });
        } else {
            uploadToVercelStorage(files[0]).then(url => {
                setFileLoading(false);
                setIsPhotoUploaded(true);
                cb(url);
            }).catch(error => {
                setFileLoading(false);
                setIsPhotoUploaded(false);
                console.error('Upload error:', error);
            });
        }
    } catch (error) {
        setFileLoading(false);
        setIsPhotoUploaded(false);
        console.error('Upload error:', error);
    }
};

export default fileUpload;