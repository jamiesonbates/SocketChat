import cloudinary from 'cloudinary';

import { cloudinary_config } from './secrets';
console.log(cloudinary_config);

cloudinary.config(cloudinary_config);

export default cloudinary;
