const mongoose = require('mongoose');
const Upload = require('@/models/coreModels/Upload');

describe('Upload Model Tests', () => {
  describe('Upload Creation', () => {
    it('should create a valid upload with required fields', async () => {
      const uploadData = {
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      };

      const upload = await Upload.create(uploadData);

      expect(upload).toBeDefined();
      expect(upload.fieldId).toBe('field_123');
      expect(upload.fileName).toBe('document.pdf');
      expect(upload.fileType).toBe('pdf');
      expect(upload.isPublic).toBe(true);
      expect(upload.isSecure).toBe(false);
      expect(upload.path).toBe('/uploads/documents/document.pdf');
    });

    it('should fail to create upload without fieldId', async () => {
      const invalidUpload = {
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });

    it('should fail to create upload without fileName', async () => {
      const invalidUpload = {
        fieldId: 'field_123',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });

    it('should fail to create upload without fileType', async () => {
      const invalidUpload = {
        fieldId: 'field_123',
        fileName: 'document.pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });

    it('should fail to create upload without isPublic', async () => {
      const invalidUpload = {
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });

    it('should fail to create upload without userID', async () => {
      const invalidUpload = {
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });

    it('should fail to create upload without isSecure', async () => {
      const invalidUpload = {
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        path: '/uploads/documents/document.pdf',
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });

    it('should fail to create upload without path', async () => {
      const invalidUpload = {
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });
  });

  describe('Upload Default Values', () => {
    it('should set default removed to false', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      });

      expect(upload.removed).toBe(false);
    });

    it('should set default enabled to true', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      });

      expect(upload.enabled).toBe(true);
    });

    it('should set created timestamp', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      });

      expect(upload.created).toBeInstanceOf(Date);
    });
  });

  describe('Upload File Type Enum', () => {
    it('should accept valid image file types', async () => {
      const imageTypes = ['jpeg', 'jpg', 'png', 'gif', 'webp'];

      for (const fileType of imageTypes) {
        const upload = await Upload.create({
          fieldId: `field_${fileType}`,
          fileName: `image.${fileType}`,
          fileType,
          isPublic: true,
          userID: new mongoose.Types.ObjectId(),
          isSecure: false,
          path: `/uploads/images/image.${fileType}`,
        });

        expect(upload.fileType).toBe(fileType);
      }
    });

    it('should accept valid document file types', async () => {
      const docTypes = ['doc', 'txt', 'csv', 'docx', 'xls', 'xlsx', 'pdf'];

      for (const fileType of docTypes) {
        const upload = await Upload.create({
          fieldId: `field_${fileType}`,
          fileName: `document.${fileType}`,
          fileType,
          isPublic: true,
          userID: new mongoose.Types.ObjectId(),
          isSecure: false,
          path: `/uploads/docs/document.${fileType}`,
        });

        expect(upload.fileType).toBe(fileType);
      }
    });

    it('should accept valid archive file types', async () => {
      const archiveTypes = ['zip', 'rar'];

      for (const fileType of archiveTypes) {
        const upload = await Upload.create({
          fieldId: `field_${fileType}`,
          fileName: `archive.${fileType}`,
          fileType,
          isPublic: true,
          userID: new mongoose.Types.ObjectId(),
          isSecure: false,
          path: `/uploads/archives/archive.${fileType}`,
        });

        expect(upload.fileType).toBe(fileType);
      }
    });

    it('should accept valid video file types', async () => {
      const videoTypes = ['mp4', 'mov', 'avi', 'webm'];

      for (const fileType of videoTypes) {
        const upload = await Upload.create({
          fieldId: `field_${fileType}`,
          fileName: `video.${fileType}`,
          fileType,
          isPublic: true,
          userID: new mongoose.Types.ObjectId(),
          isSecure: false,
          path: `/uploads/videos/video.${fileType}`,
        });

        expect(upload.fileType).toBe(fileType);
      }
    });

    it('should accept valid audio file types', async () => {
      const audioTypes = ['mp3', 'm4a'];

      for (const fileType of audioTypes) {
        const upload = await Upload.create({
          fieldId: `field_${fileType}`,
          fileName: `audio.${fileType}`,
          fileType,
          isPublic: true,
          userID: new mongoose.Types.ObjectId(),
          isSecure: false,
          path: `/uploads/audio/audio.${fileType}`,
        });

        expect(upload.fileType).toBe(fileType);
      }
    });

    it('should reject invalid file type', async () => {
      const invalidUpload = {
        fieldId: 'field_123',
        fileName: 'file.exe',
        fileType: 'exe',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/file.exe',
      };

      await expect(Upload.create(invalidUpload)).rejects.toThrow();
    });
  });

  describe('Upload Optional Fields', () => {
    it('should create upload with modelName', async () => {
      const upload = await Upload.create({
        modelName: 'Client',
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      });

      expect(upload.modelName).toBe('Client');
    });

    it('should create upload without modelName (optional field)', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      });

      expect(upload.modelName).toBeUndefined();
    });

    it('should trim modelName whitespace', async () => {
      const upload = await Upload.create({
        modelName: '  Client  ',
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/documents/document.pdf',
      });

      expect(upload.modelName).toBe('Client');
    });
  });

  describe('Upload Public and Secure Flags', () => {
    it('should create public upload', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'public_document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/public/document.pdf',
      });

      expect(upload.isPublic).toBe(true);
    });

    it('should create private upload', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'private_document.pdf',
        fileType: 'pdf',
        isPublic: false,
        userID: new mongoose.Types.ObjectId(),
        isSecure: true,
        path: '/uploads/private/document.pdf',
      });

      expect(upload.isPublic).toBe(false);
    });

    it('should create secure upload', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'secure_document.pdf',
        fileType: 'pdf',
        isPublic: false,
        userID: new mongoose.Types.ObjectId(),
        isSecure: true,
        path: '/uploads/secure/document.pdf',
      });

      expect(upload.isSecure).toBe(true);
    });

    it('should create non-secure upload', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/document.pdf',
      });

      expect(upload.isSecure).toBe(false);
    });
  });

  describe('Upload CRUD Operations', () => {
    it('should find upload by id', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/document.pdf',
      });

      const foundUpload = await Upload.findById(upload._id);
      expect(foundUpload).toBeDefined();
      expect(foundUpload._id.toString()).toBe(upload._id.toString());
    });

    it('should find uploads by userID', async () => {
      const userID = new mongoose.Types.ObjectId();

      await Upload.create({
        fieldId: 'field_1',
        fileName: 'document1.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID,
        isSecure: false,
        path: '/uploads/document1.pdf',
      });

      await Upload.create({
        fieldId: 'field_2',
        fileName: 'document2.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID,
        isSecure: false,
        path: '/uploads/document2.pdf',
      });

      const uploads = await Upload.find({ userID, removed: false });
      expect(uploads).toHaveLength(2);
    });

    it('should update upload path', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/document.pdf',
      });

      upload.path = '/uploads/moved/document.pdf';
      await upload.save();

      const updatedUpload = await Upload.findById(upload._id);
      expect(updatedUpload.path).toBe('/uploads/moved/document.pdf');
    });

    it('should soft delete upload by setting removed flag', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/document.pdf',
      });

      upload.removed = true;
      await upload.save();

      const deletedUpload = await Upload.findById(upload._id);
      expect(deletedUpload.removed).toBe(true);
    });

    it('should disable upload by setting enabled flag', async () => {
      const upload = await Upload.create({
        fieldId: 'field_123',
        fileName: 'document.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID: new mongoose.Types.ObjectId(),
        isSecure: false,
        path: '/uploads/document.pdf',
      });

      upload.enabled = false;
      await upload.save();

      const disabledUpload = await Upload.findById(upload._id);
      expect(disabledUpload.enabled).toBe(false);
    });

    it('should count uploads by file type', async () => {
      const userID = new mongoose.Types.ObjectId();

      await Upload.create({
        fieldId: 'field_1',
        fileName: 'doc1.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID,
        isSecure: false,
        path: '/uploads/doc1.pdf',
      });

      await Upload.create({
        fieldId: 'field_2',
        fileName: 'doc2.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID,
        isSecure: false,
        path: '/uploads/doc2.pdf',
      });

      await Upload.create({
        fieldId: 'field_3',
        fileName: 'image.jpg',
        fileType: 'jpg',
        isPublic: true,
        userID,
        isSecure: false,
        path: '/uploads/image.jpg',
      });

      const pdfCount = await Upload.countDocuments({ fileType: 'pdf', removed: false });
      expect(pdfCount).toBe(2);
    });

    it('should find public uploads only', async () => {
      const userID = new mongoose.Types.ObjectId();

      await Upload.create({
        fieldId: 'field_1',
        fileName: 'public.pdf',
        fileType: 'pdf',
        isPublic: true,
        userID,
        isSecure: false,
        path: '/uploads/public.pdf',
      });

      await Upload.create({
        fieldId: 'field_2',
        fileName: 'private.pdf',
        fileType: 'pdf',
        isPublic: false,
        userID,
        isSecure: true,
        path: '/uploads/private.pdf',
      });

      const publicUploads = await Upload.find({ isPublic: true, removed: false });
      expect(publicUploads).toHaveLength(1);
      expect(publicUploads[0].fileName).toBe('public.pdf');
    });
  });
});
