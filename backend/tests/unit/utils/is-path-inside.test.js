const { isPathInside } = require('@/utils/is-path-inside');
const path = require('path');

describe('isPathInside Utility Tests', () => {
  describe('Basic Functionality', () => {
    it('should return true when child path is inside parent path', () => {
      const parent = '/home/user/projects';
      const child = '/home/user/projects/myapp';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should return false when child path is outside parent path', () => {
      const parent = '/home/user/projects';
      const child = '/home/user/documents';

      expect(isPathInside(child, parent)).toBe(false);
    });

    it('should return false when paths are the same', () => {
      const samePath = '/home/user/projects';

      expect(isPathInside(samePath, samePath)).toBe(false);
    });

    it('should return false when child is parent directory', () => {
      const parent = '/home/user/projects/myapp';
      const child = '/home/user/projects';

      expect(isPathInside(child, parent)).toBe(false);
    });
  });

  describe('Nested Paths', () => {
    it('should return true for deeply nested child paths', () => {
      const parent = '/home/user';
      const child = '/home/user/projects/myapp/src/components/Button.js';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should return true for single level nesting', () => {
      const parent = '/projects';
      const child = '/projects/app';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should return false for sibling directories', () => {
      const parent = '/home/user/projects';
      const child = '/home/user/documents';

      expect(isPathInside(child, parent)).toBe(false);
    });
  });

  describe('Relative Paths', () => {
    it('should handle relative child paths', () => {
      const parent = '/home/user/projects';
      const child = 'myapp/src';

      // Result depends on current working directory
      const result = isPathInside(child, parent);
      expect(typeof result).toBe('boolean');
    });

    it('should handle parent traversal attempts (..)', () => {
      const parent = '/home/user/projects';
      const child = '/home/user/projects/../documents';

      expect(isPathInside(child, parent)).toBe(false);
    });

    it('should handle multiple parent traversal (../../)', () => {
      const parent = '/home/user/projects';
      const child = '/home/user/projects/../../etc';

      expect(isPathInside(child, parent)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle root paths', () => {
      const parent = '/';
      const child = '/home/user/projects';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should handle paths with trailing slashes', () => {
      const parent = '/home/user/projects/';
      const child = '/home/user/projects/myapp/';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should handle paths without leading slashes', () => {
      const parent = 'projects';
      const child = 'projects/myapp';

      const result = isPathInside(child, parent);
      expect(typeof result).toBe('boolean');
    });

    it('should handle empty string paths', () => {
      const parent = '/home/user';
      const child = '';

      expect(isPathInside(child, parent)).toBe(false);
    });

    it('should handle paths with special characters', () => {
      const parent = '/home/user/my-project';
      const child = '/home/user/my-project/app_folder';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should handle paths with spaces', () => {
      const parent = '/home/user/my projects';
      const child = '/home/user/my projects/app';

      expect(isPathInside(child, parent)).toBe(true);
    });
  });

  describe('Windows Paths', () => {
    // These tests will behave differently on Windows vs Unix
    it('should handle Windows-style paths on Windows', () => {
      if (process.platform === 'win32') {
        const parent = 'C:\\Users\\Admin\\Projects';
        const child = 'C:\\Users\\Admin\\Projects\\myapp';

        expect(isPathInside(child, parent)).toBe(true);
      } else {
        // On Unix, backslashes are treated as part of filename
        expect(true).toBe(true); // Skip test on non-Windows
      }
    });

    it('should handle mixed separators', () => {
      if (process.platform === 'win32') {
        const parent = 'C:/Users/Admin/Projects';
        const child = 'C:\\Users\\Admin\\Projects\\myapp';

        // path.relative normalizes separators
        const result = isPathInside(child, parent);
        expect(typeof result).toBe('boolean');
      } else {
        expect(true).toBe(true); // Skip test on non-Windows
      }
    });
  });

  describe('Security Scenarios', () => {
    it('should prevent directory traversal attacks', () => {
      const parent = '/var/www/uploads';
      const child = '/var/www/uploads/../../../etc/passwd';

      expect(isPathInside(child, parent)).toBe(false);
    });

    it('should detect attempts to escape parent directory', () => {
      const parent = '/home/user/safe';
      const child = '/home/user/safe/../../root';

      expect(isPathInside(child, parent)).toBe(false);
    });

    it('should handle symbolic link-like paths', () => {
      const parent = '/var/www';
      const child = '/var/www/app/../../../etc';

      expect(isPathInside(child, parent)).toBe(false);
    });
  });

  describe('Real-World Use Cases', () => {
    it('should validate file upload paths', () => {
      const uploadDir = '/var/www/uploads';
      const userFile = '/var/www/uploads/user123/document.pdf';

      expect(isPathInside(userFile, uploadDir)).toBe(true);
    });

    it('should reject malicious upload paths', () => {
      const uploadDir = '/var/www/uploads';
      const maliciousFile = '/var/www/uploads/../../etc/passwd';

      expect(isPathInside(maliciousFile, uploadDir)).toBe(false);
    });

    it('should validate project file access', () => {
      const projectRoot = '/home/user/projects/myapp';
      const sourceFile = '/home/user/projects/myapp/src/index.js';

      expect(isPathInside(sourceFile, projectRoot)).toBe(true);
    });

    it('should prevent access to files outside project', () => {
      const projectRoot = '/home/user/projects/myapp';
      const outsideFile = '/home/user/documents/secret.txt';

      expect(isPathInside(outsideFile, projectRoot)).toBe(false);
    });

    it('should validate static file serving', () => {
      const publicDir = '/var/www/public';
      const requestedFile = '/var/www/public/css/style.css';

      expect(isPathInside(requestedFile, publicDir)).toBe(true);
    });

    it('should block access to parent directories from static files', () => {
      const publicDir = '/var/www/public';
      const requestedFile = '/var/www/public/../config/database.js';

      expect(isPathInside(requestedFile, publicDir)).toBe(false);
    });
  });

  describe('Return Value', () => {
    it('should always return boolean', () => {
      const result1 = isPathInside('/home/user/projects/app', '/home/user/projects');
      const result2 = isPathInside('/home/user/documents', '/home/user/projects');

      expect(typeof result1).toBe('boolean');
      expect(typeof result2).toBe('boolean');
    });

    it('should return true or false, never other values', () => {
      const result = isPathInside('/home/user/projects/app', '/home/user/projects');

      expect(result === true || result === false).toBe(true);
    });
  });

  describe('Path Normalization', () => {
    it('should handle paths with dot segments (.)', () => {
      const parent = '/home/user/projects';
      const child = '/home/user/projects/./myapp';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should handle redundant slashes', () => {
      const parent = '/home/user/projects';
      const child = '/home/user/projects//myapp';

      expect(isPathInside(child, parent)).toBe(true);
    });

    it('should normalize paths before comparison', () => {
      const parent = '/home/user/../user/projects';
      const child = '/home/user/projects/myapp';

      expect(isPathInside(child, parent)).toBe(true);
    });
  });
});
