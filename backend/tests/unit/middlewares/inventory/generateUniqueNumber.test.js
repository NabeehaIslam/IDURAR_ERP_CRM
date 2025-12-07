const generateUniqueNumber = require('@/middlewares/inventory/generateUniqueNumber');

describe('generateUniqueNumber Middleware Tests', () => {
  describe('Basic Functionality', () => {
    it('should generate a unique number with default length of 13', () => {
      const uniqueId = 1;
      const result = generateUniqueNumber(uniqueId);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(13);
    });

    it('should generate a unique number with custom length', () => {
      const uniqueId = 1;
      const customLength = 15;
      const result = generateUniqueNumber(uniqueId, customLength);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(customLength);
    });

    it('should generate different numbers for different uniqueIds', () => {
      const result1 = generateUniqueNumber(1);
      const result2 = generateUniqueNumber(2);

      expect(result1).not.toBe(result2);
    });

    it('should handle uniqueId of 0', () => {
      const result = generateUniqueNumber(0);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(13);
    });

    it('should handle large uniqueId values', () => {
      const largeId = 999999;
      const result = generateUniqueNumber(largeId);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('Date Components', () => {
    it('should contain day component (2 digits)', () => {
      const result = generateUniqueNumber(1);
      const day = result.substring(0, 2);

      expect(day).toMatch(/^\d{2}$/);
      expect(parseInt(day)).toBeGreaterThanOrEqual(1);
      expect(parseInt(day)).toBeLessThanOrEqual(31);
    });

    it('should contain month component (2 digits)', () => {
      const result = generateUniqueNumber(1);
      const month = result.substring(2, 4);

      expect(month).toMatch(/^\d{2}$/);
      expect(parseInt(month)).toBeGreaterThanOrEqual(1);
      expect(parseInt(month)).toBeLessThanOrEqual(12);
    });

    it('should contain year component (2 digits)', () => {
      const result = generateUniqueNumber(1);
      const year = result.substring(4, 6);

      expect(year).toMatch(/^\d{2}$/);
      
      // Should be current year's last 2 digits
      const currentYear = new Date().getFullYear() % 100;
      expect(parseInt(year)).toBe(currentYear);
    });

    it('should generate number with current date', () => {
      const currentDate = new Date();
      const expectedDay = currentDate.getDate().toString().padStart(2, '0');
      const expectedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const expectedYear = (currentDate.getFullYear() % 100).toString().padStart(2, '0');

      const result = generateUniqueNumber(1);

      expect(result.substring(0, 2)).toBe(expectedDay);
      expect(result.substring(2, 4)).toBe(expectedMonth);
      expect(result.substring(4, 6)).toBe(expectedYear);
    });
  });

  describe('Random Number Component', () => {
    it('should contain random number component (3 digits)', () => {
      const result = generateUniqueNumber(1);
      const randomPart = result.substring(6, 9);

      expect(randomPart).toMatch(/^\d{3}$/);
      expect(parseInt(randomPart)).toBeGreaterThanOrEqual(100);
      expect(parseInt(randomPart)).toBeLessThanOrEqual(999);
    });

    it('should generate different random numbers on multiple calls', () => {
      const results = new Set();
      
      // Generate 50 numbers and check that randomness exists
      for (let i = 0; i < 50; i++) {
        const result = generateUniqueNumber(1);
        const randomPart = result.substring(6, 9);
        results.add(randomPart);
      }

      // Should have at least some variation (not all identical)
      expect(results.size).toBeGreaterThan(1);
    });
  });

  describe('UniqueId Component', () => {
    it('should pad uniqueId with leading zeros', () => {
      const result = generateUniqueNumber(1, 13); // Default length
      const uniqueIdPart = result.substring(9);

      // For length 13, uniqueId part should be 4 digits (13 - 9)
      // Function adds 1 to uniqueId, so 1 becomes 2
      expect(uniqueIdPart.length).toBe(4);
      expect(uniqueIdPart).toBe('0002');
    });

    it('should increment uniqueId correctly', () => {
      const result1 = generateUniqueNumber(1, 13);
      const result2 = generateUniqueNumber(2, 13);
      const result3 = generateUniqueNumber(100, 13);

      const id1 = result1.substring(9);
      const id2 = result2.substring(9);
      const id3 = result3.substring(9);

      // Function adds 1 to uniqueId
      expect(id1).toBe('0002'); // 1 + 1 = 2
      expect(id2).toBe('0003'); // 2 + 1 = 3
      expect(id3).toBe('0101'); // 100 + 1 = 101
    });

    it('should handle uniqueId larger than padding space', () => {
      const largeId = 99999;
      const result = generateUniqueNumber(largeId, 13);

      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(13);
    });
  });

  describe('Format Consistency', () => {
    it('should always return string format', () => {
      const result1 = generateUniqueNumber(0);
      const result2 = generateUniqueNumber(999);
      const result3 = generateUniqueNumber(1, 20);

      expect(typeof result1).toBe('string');
      expect(typeof result2).toBe('string');
      expect(typeof result3).toBe('string');
    });

    it('should only contain numeric characters', () => {
      const result = generateUniqueNumber(123);

      expect(result).toMatch(/^\d+$/);
    });

    it('should maintain format: DDMMYY + RRR + UniqueId', () => {
      const result = generateUniqueNumber(42, 13);

      // Day (2) + Month (2) + Year (2) + Random (3) + UniqueId (4) = 13
      expect(result.length).toBe(13);
      
      const day = result.substring(0, 2);
      const month = result.substring(2, 4);
      const year = result.substring(4, 6);
      const random = result.substring(6, 9);
      const uniqueId = result.substring(9, 13);

      expect(day).toMatch(/^\d{2}$/);
      expect(month).toMatch(/^\d{2}$/);
      expect(year).toMatch(/^\d{2}$/);
      expect(random).toMatch(/^\d{3}$/);
      expect(uniqueId).toMatch(/^\d{4}$/);
    });
  });

  describe('Different Number Lengths', () => {
    it('should handle length of 10', () => {
      const result = generateUniqueNumber(1, 10);

      expect(result.length).toBe(10);
      
      // DD MM YY RRR + 1 digit for uniqueId
      const uniqueIdPart = result.substring(9);
      expect(uniqueIdPart.length).toBe(1);
    });

    it('should handle length of 15', () => {
      const result = generateUniqueNumber(1, 15);

      expect(result.length).toBe(15);
      
      // DD MM YY RRR + 6 digits for uniqueId
      const uniqueIdPart = result.substring(9);
      expect(uniqueIdPart.length).toBe(6);
    });

    it('should handle length of 20', () => {
      const result = generateUniqueNumber(123, 20);

      expect(result.length).toBe(20);
      
      // DD MM YY RRR + 11 digits for uniqueId
      const uniqueIdPart = result.substring(9);
      expect(uniqueIdPart.length).toBe(11);
    });

    it('should handle minimum length greater than 9', () => {
      // Length must be at least 10 (9 for date+random + at least 1 for uniqueId)
      const result = generateUniqueNumber(1, 10);

      expect(result.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('Edge Cases', () => {
    it('should handle negative uniqueId gracefully', () => {
      // Even though negative IDs are unusual, function should handle it
      const result = generateUniqueNumber(-1);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle very small number length', () => {
      const result = generateUniqueNumber(1, 9);

      // Even with length 9, should still generate something
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should handle zero as uniqueId', () => {
      const result = generateUniqueNumber(0, 13);
      const uniqueIdPart = result.substring(9);

      // Function adds 1 to uniqueId, so 0 becomes 1
      expect(uniqueIdPart).toBe('0001');
    });

    it('should be consistent for same inputs on immediate consecutive calls', () => {
      const uniqueId = 42;
      const length = 13;
      
      // Note: Due to random component, full numbers will differ,
      // but the date and uniqueId parts should be same
      const result1 = generateUniqueNumber(uniqueId, length);
      const result2 = generateUniqueNumber(uniqueId, length);

      const date1 = result1.substring(0, 6);
      const date2 = result2.substring(0, 6);
      const id1 = result1.substring(9);
      const id2 = result2.substring(9);

      expect(date1).toBe(date2); // Same date
      expect(id1).toBe(id2); // Same uniqueId
    });
  });

  describe('Uniqueness Guarantee', () => {
    it('should generate unique numbers for sequential IDs', () => {
      const results = [];
      
      for (let i = 1; i <= 100; i++) {
        results.push(generateUniqueNumber(i));
      }

      const uniqueResults = new Set(results);
      
      // Due to random component, all should be unique
      expect(uniqueResults.size).toBe(100);
    });

    it('should maintain uniqueness even with same uniqueId', () => {
      const results = [];
      
      // Generate 20 numbers with same uniqueId
      for (let i = 0; i < 20; i++) {
        results.push(generateUniqueNumber(1));
      }

      const uniqueResults = new Set(results);
      
      // Random component should make them different
      expect(uniqueResults.size).toBeGreaterThan(1);
    });
  });

  describe('Practical Use Cases', () => {
    it('should generate invoice numbers', () => {
      const invoiceId = 1234;
      const invoiceNumber = generateUniqueNumber(invoiceId);

      expect(invoiceNumber).toBeDefined();
      expect(invoiceNumber.length).toBe(13);
      expect(invoiceNumber).toMatch(/^\d+$/);
    });

    it('should generate order numbers', () => {
      const orderId = 5678;
      const orderNumber = generateUniqueNumber(orderId);

      expect(orderNumber).toBeDefined();
      expect(orderNumber.length).toBe(13);
    });

    it('should generate payment reference numbers', () => {
      const paymentId = 9999;
      const referenceNumber = generateUniqueNumber(paymentId, 15);

      expect(referenceNumber).toBeDefined();
      expect(referenceNumber.length).toBe(15);
    });

    it('should generate unique numbers for batch processing', () => {
      const batchSize = 50;
      const numbers = [];

      for (let i = 1; i <= batchSize; i++) {
        numbers.push(generateUniqueNumber(i));
      }

      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(batchSize);
    });
  });
});
