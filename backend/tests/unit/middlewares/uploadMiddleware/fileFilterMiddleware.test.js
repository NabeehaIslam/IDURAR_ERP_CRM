const fileFilterMiddleware = require('@/middlewares/uploadMiddleware/utils/fileFilterMiddleware');

describe('fileFilterMiddleware Tests', () => {
  describe('Default Type', () => {
    it('should return true for any mimetype when type is "default"', () => {
      expect(fileFilterMiddleware({ type: 'default', mimetype: 'image/jpeg' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'default', mimetype: 'application/pdf' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'default', mimetype: 'video/mp4' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'default', mimetype: 'audio/mpeg' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'default', mimetype: 'text/plain' })).toBe(true);
    });

    it('should return true even for unsupported mimetypes when type is "default"', () => {
      expect(fileFilterMiddleware({ type: 'default', mimetype: 'application/x-executable' })).toBe(
        true
      );
      expect(fileFilterMiddleware({ type: 'default', mimetype: 'unknown/type' })).toBe(true);
    });

    it('should return true when type is undefined (defaults to "default")', () => {
      expect(fileFilterMiddleware({ mimetype: 'image/jpeg' })).toBe(true);
    });
  });

  describe('Image Type', () => {
    it('should accept valid image mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/jpeg' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/png' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/gif' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/webp' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/svg+xml' })).toBe(true);
    });

    it('should reject non-image mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'application/pdf' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'video/mp4' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'audio/mpeg' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'text/plain' })).toBe(false);
    });

    it('should reject image mimetype not in allowed list', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/bmp' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/tiff' })).toBe(false);
    });

    it('should reject invalid/unknown mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'invalid/mimetype' })).toBe(false);
    });
  });

  describe('PDF Type', () => {
    it('should accept PDF mimetype', () => {
      expect(fileFilterMiddleware({ type: 'pdf', mimetype: 'application/pdf' })).toBe(true);
    });

    it('should reject non-PDF mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'pdf', mimetype: 'image/jpeg' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'pdf', mimetype: 'video/mp4' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'pdf', mimetype: 'application/msword' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'pdf', mimetype: 'text/plain' })).toBe(false);
    });
  });

  describe('Video Type', () => {
    it('should accept valid video mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'video/mp4' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'video/x-msvideo' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'video/webm' })).toBe(true);
    });

    it('should reject non-video mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'image/jpeg' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'audio/mpeg' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'application/pdf' })).toBe(false);
    });

    it('should reject video mimetype not in allowed list', () => {
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'video/quicktime' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'video/x-matroska' })).toBe(false);
    });
  });

  describe('Audio Type', () => {
    it('should accept valid audio mimetype', () => {
      expect(fileFilterMiddleware({ type: 'audio', mimetype: 'audio/mpeg' })).toBe(true);
    });

    it('should reject non-audio mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'audio', mimetype: 'video/mp4' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'audio', mimetype: 'image/jpeg' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'audio', mimetype: 'application/pdf' })).toBe(false);
    });

    it('should reject audio mimetype not in allowed list', () => {
      expect(fileFilterMiddleware({ type: 'audio', mimetype: 'audio/wav' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'audio', mimetype: 'audio/ogg' })).toBe(false);
    });
  });

  describe('Text Type', () => {
    it('should accept text mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'text/plain' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'text/csv' })).toBe(true);
    });

    it('should accept Word document mimetypes', () => {
      // application/msword is in allowed list AND starts with 'application/msword'
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'application/msword' })).toBe(true);
      // .docx mimetype is NOT in the allowed list, so returns false even though it starts correctly
      expect(
        fileFilterMiddleware({
          type: 'text',
          mimetype:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        })
      ).toBe(false);
    });

    it('should accept Excel mimetypes', () => {
      // application/vnd.ms-excel is in allowed list AND starts correctly
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'application/vnd.ms-excel' })).toBe(
        true
      );
      // spreadsheetml.sheet IS in allowed list but NOT in text type startsWith checks, so returns false
      expect(
        fileFilterMiddleware({
          type: 'text',
          mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
      ).toBe(false);
    });

    it('should reject non-text mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'image/jpeg' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'video/mp4' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'application/pdf' })).toBe(false);
    });

    it('should reject text mimetype not in allowed list', () => {
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'text/html' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'text/xml' })).toBe(false);
    });
  });

  describe('Excel Type', () => {
    it('should accept Excel mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'excel', mimetype: 'application/vnd.ms-excel' })).toBe(
        true
      );
      expect(
        fileFilterMiddleware({
          type: 'excel',
          mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
      ).toBe(true);
    });

    it('should reject non-Excel mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'excel', mimetype: 'text/csv' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'excel', mimetype: 'application/msword' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'excel', mimetype: 'application/pdf' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'excel', mimetype: 'image/jpeg' })).toBe(false);
    });
  });

  describe('Compressed Type', () => {
    it('should accept ZIP mimetypes', () => {
      // application/zip is in allowed list AND starts correctly
      expect(fileFilterMiddleware({ type: 'compressed', mimetype: 'application/zip' })).toBe(true);
      // x-zip-compressed is NOT in the allowed list, so returns false even though startsWith passes
      expect(
        fileFilterMiddleware({ type: 'compressed', mimetype: 'application/x-zip-compressed' })
      ).toBe(false);
    });

    it('should accept RAR mimetype', () => {
      expect(fileFilterMiddleware({ type: 'compressed', mimetype: 'application/vnd.rar' })).toBe(
        true
      );
    });

    it('should reject non-compressed mimetypes', () => {
      expect(fileFilterMiddleware({ type: 'compressed', mimetype: 'application/pdf' })).toBe(
        false
      );
      expect(fileFilterMiddleware({ type: 'compressed', mimetype: 'image/jpeg' })).toBe(false);
      expect(fileFilterMiddleware({ type: 'compressed', mimetype: 'text/plain' })).toBe(false);
    });

    it('should reject compressed format not in allowed list', () => {
      expect(
        fileFilterMiddleware({ type: 'compressed', mimetype: 'application/x-7z-compressed' })
      ).toBe(false);
      expect(
        fileFilterMiddleware({ type: 'compressed', mimetype: 'application/x-tar' })
      ).toBe(false);
    });
  });

  describe('Supported File Types List', () => {
    it('should validate all supported image types', () => {
      const supportedImages = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
      ];

      supportedImages.forEach((mimetype) => {
        expect(fileFilterMiddleware({ type: 'image', mimetype })).toBe(true);
      });
    });

    it('should validate all supported document types', () => {
      const supportedDocs = [
        'application/msword',
        'text/plain',
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/pdf',
      ];

      supportedDocs.forEach((mimetype) => {
        expect(fileFilterMiddleware({ type: 'default', mimetype })).toBe(true);
      });
    });

    it('should validate all supported video types', () => {
      const supportedVideos = ['video/mp4', 'video/x-msvideo', 'video/webm'];

      supportedVideos.forEach((mimetype) => {
        expect(fileFilterMiddleware({ type: 'video', mimetype })).toBe(true);
      });
    });

    it('should validate all supported compressed types', () => {
      const supportedCompressed = ['application/zip', 'application/vnd.rar'];

      supportedCompressed.forEach((mimetype) => {
        expect(fileFilterMiddleware({ type: 'compressed', mimetype })).toBe(true);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty mimetype', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: '' })).toBe(false);
    });

    it('should throw error for null mimetype', () => {
      // Middleware doesn't handle null mimetype gracefully - it will throw
      expect(() => fileFilterMiddleware({ type: 'image', mimetype: null })).toThrow();
    });

    it('should throw error for undefined mimetype', () => {
      // Middleware doesn't handle undefined mimetype gracefully - it will throw
      expect(() => fileFilterMiddleware({ type: 'image', mimetype: undefined })).toThrow();
    });

    it('should handle mimetype with different casing', () => {
      // Mimetypes are case-sensitive, uppercase should fail
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'IMAGE/JPEG' })).toBe(false);
    });

    it('should handle mimetype with extra whitespace', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: ' image/jpeg ' })).toBe(false);
    });

    it('should handle unknown type with valid mimetype', () => {
      // Unknown type should still check against allowed list
      expect(fileFilterMiddleware({ type: 'unknown', mimetype: 'image/jpeg' })).toBe(true);
      expect(fileFilterMiddleware({ type: 'unknown', mimetype: 'invalid/type' })).toBe(false);
    });
  });

  describe('Complex Scenarios', () => {
    it('should correctly filter mixed file uploads', () => {
      const files = [
        { type: 'image', mimetype: 'image/jpeg', expected: true },
        { type: 'image', mimetype: 'application/pdf', expected: false },
        { type: 'pdf', mimetype: 'application/pdf', expected: true },
        { type: 'video', mimetype: 'video/mp4', expected: true },
        { type: 'audio', mimetype: 'audio/mpeg', expected: true },
        { type: 'text', mimetype: 'text/plain', expected: true },
        { type: 'excel', mimetype: 'application/vnd.ms-excel', expected: true },
        { type: 'compressed', mimetype: 'application/zip', expected: true },
      ];

      files.forEach(({ type, mimetype, expected }) => {
        expect(fileFilterMiddleware({ type, mimetype })).toBe(expected);
      });
    });

    it('should handle all rejected file types', () => {
      const rejectedFiles = [
        { type: 'image', mimetype: 'application/x-executable' },
        { type: 'pdf', mimetype: 'image/jpeg' },
        { type: 'video', mimetype: 'audio/mpeg' },
        { type: 'audio', mimetype: 'video/mp4' },
        { type: 'text', mimetype: 'image/png' },
        { type: 'excel', mimetype: 'text/csv' },
        { type: 'compressed', mimetype: 'application/pdf' },
      ];

      rejectedFiles.forEach(({ type, mimetype }) => {
        expect(fileFilterMiddleware({ type, mimetype })).toBe(false);
      });
    });
  });

  describe('Security Cases', () => {
    it('should reject executable files', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'application/x-executable' })).toBe(
        false
      );
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'application/x-sh' })).toBe(false);
    });

    it('should reject script files', () => {
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'application/javascript' })).toBe(
        false
      );
      expect(fileFilterMiddleware({ type: 'text', mimetype: 'text/javascript' })).toBe(false);
    });

    it('should reject potentially dangerous file types', () => {
      const dangerousMimetypes = [
        'application/x-msdownload',
        'application/x-dosexec',
        'application/x-sharedlib',
      ];

      dangerousMimetypes.forEach((mimetype) => {
        expect(fileFilterMiddleware({ type: 'default', mimetype })).toBe(true); // Default allows all
        expect(fileFilterMiddleware({ type: 'image', mimetype })).toBe(false);
        expect(fileFilterMiddleware({ type: 'text', mimetype })).toBe(false);
      });
    });
  });

  describe('Type-Specific Validations', () => {
    it('should validate that images must start with "image/"', () => {
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'image/custom' })).toBe(false); // Not in allowed list
      expect(fileFilterMiddleware({ type: 'image', mimetype: 'images/jpeg' })).toBe(false); // Wrong prefix
    });

    it('should validate that PDFs must start with "application/pdf"', () => {
      expect(fileFilterMiddleware({ type: 'pdf', mimetype: 'application/x-pdf' })).toBe(false);
    });

    it('should validate that videos must start with "video/"', () => {
      expect(fileFilterMiddleware({ type: 'video', mimetype: 'video/custom' })).toBe(false); // Not in allowed list
    });

    it('should validate that audio must start with "audio/"', () => {
      expect(fileFilterMiddleware({ type: 'audio', mimetype: 'audio/custom' })).toBe(false); // Not in allowed list
    });
  });

  describe('Return Value', () => {
    it('should always return boolean', () => {
      expect(typeof fileFilterMiddleware({ type: 'default', mimetype: 'image/jpeg' })).toBe(
        'boolean'
      );
      expect(typeof fileFilterMiddleware({ type: 'image', mimetype: 'image/jpeg' })).toBe(
        'boolean'
      );
      expect(typeof fileFilterMiddleware({ type: 'pdf', mimetype: 'application/pdf' })).toBe(
        'boolean'
      );
    });

    it('should return true or false, never other values', () => {
      const result1 = fileFilterMiddleware({ type: 'image', mimetype: 'image/jpeg' });
      const result2 = fileFilterMiddleware({ type: 'image', mimetype: 'application/pdf' });

      expect(result1 === true || result1 === false).toBe(true);
      expect(result2 === true || result2 === false).toBe(true);
    });
  });
});
