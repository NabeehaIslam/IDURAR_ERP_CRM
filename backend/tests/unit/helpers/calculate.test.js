const { calculate } = require('@/helpers');

describe('Calculate Helper Tests', () => {
  describe('Addition (add)', () => {
    it('should add two positive numbers', () => {
      expect(calculate.add(10, 5)).toBe(15);
      expect(calculate.add(100, 50)).toBe(150);
      expect(calculate.add(1.5, 2.5)).toBe(4);
    });

    it('should add negative numbers', () => {
      expect(calculate.add(-10, -5)).toBe(-15);
      expect(calculate.add(-10, 5)).toBe(-5);
      expect(calculate.add(10, -5)).toBe(5);
    });

    it('should add decimal numbers precisely', () => {
      expect(calculate.add(0.1, 0.2)).toBe(0.3);
      expect(calculate.add(1.23, 4.56)).toBe(5.79);
      expect(calculate.add(10.5, 20.75)).toBe(31.25);
    });

    it('should handle zero addition', () => {
      expect(calculate.add(0, 0)).toBe(0);
      expect(calculate.add(10, 0)).toBe(10);
      expect(calculate.add(0, 10)).toBe(10);
    });

    it('should handle large numbers', () => {
      expect(calculate.add(999999, 1)).toBe(1000000);
      expect(calculate.add(1000000, 2000000)).toBe(3000000);
    });

    it('should handle very small decimal numbers', () => {
      // currency.js defaults to 2 decimal precision, so 0.001 + 0.002 = 0.00 (rounded)
      expect(calculate.add(0.001, 0.002)).toBe(0);
      expect(calculate.add(0.0001, 0.0002)).toBe(0);
    });

    it('should handle string numbers (if currency.js converts them)', () => {
      expect(calculate.add('10', '5')).toBe(15);
      expect(calculate.add('10.5', '20.75')).toBe(31.25);
    });
  });

  describe('Subtraction (sub)', () => {
    it('should subtract two positive numbers', () => {
      expect(calculate.sub(10, 5)).toBe(5);
      expect(calculate.sub(100, 50)).toBe(50);
      expect(calculate.sub(5.5, 2.5)).toBe(3);
    });

    it('should subtract negative numbers', () => {
      expect(calculate.sub(-10, -5)).toBe(-5);
      expect(calculate.sub(-10, 5)).toBe(-15);
      expect(calculate.sub(10, -5)).toBe(15);
    });

    it('should handle zero subtraction', () => {
      expect(calculate.sub(0, 0)).toBe(0);
      expect(calculate.sub(10, 0)).toBe(10);
      expect(calculate.sub(0, 10)).toBe(-10);
    });

    it('should handle negative results', () => {
      expect(calculate.sub(5, 10)).toBe(-5);
      expect(calculate.sub(1, 100)).toBe(-99);
    });

    it('should handle decimal subtraction precisely', () => {
      expect(calculate.sub(10.5, 5.25)).toBe(5.25);
      expect(calculate.sub(0.3, 0.1)).toBe(0.2);
      expect(calculate.sub(100.99, 50.50)).toBe(50.49);
    });

    it('should handle string numbers', () => {
      expect(calculate.sub('10', '5')).toBe(5);
      expect(calculate.sub('10.5', '5.25')).toBe(5.25);
    });
  });

  describe('Multiplication (multiply)', () => {
    it('should multiply two positive numbers', () => {
      expect(calculate.multiply(10, 5)).toBe(50);
      expect(calculate.multiply(2, 3)).toBe(6);
      expect(calculate.multiply(7, 8)).toBe(56);
    });

    it('should multiply negative numbers', () => {
      expect(calculate.multiply(-10, 5)).toBe(-50);
      expect(calculate.multiply(10, -5)).toBe(-50);
      expect(calculate.multiply(-10, -5)).toBe(50);
    });

    it('should handle zero multiplication', () => {
      expect(calculate.multiply(0, 0)).toBe(0);
      expect(calculate.multiply(10, 0)).toBe(0);
      expect(calculate.multiply(0, 10)).toBe(0);
    });

    it('should multiply decimal numbers precisely', () => {
      expect(calculate.multiply(2.5, 4)).toBe(10);
      expect(calculate.multiply(1.5, 2)).toBe(3);
      expect(calculate.multiply(0.1, 10)).toBe(1);
    });

    it('should handle multiplication by one', () => {
      expect(calculate.multiply(10, 1)).toBe(10);
      expect(calculate.multiply(1, 10)).toBe(10);
      expect(calculate.multiply(1, 1)).toBe(1);
    });

    it('should handle small decimal multiplication', () => {
      expect(calculate.multiply(0.1, 0.1)).toBe(0.01);
      expect(calculate.multiply(0.2, 0.3)).toBeCloseTo(0.06, 2);
    });

    it('should handle string numbers', () => {
      expect(calculate.multiply('10', '5')).toBe(50);
      expect(calculate.multiply('2.5', '4')).toBe(10);
    });

    it('should handle large number multiplication', () => {
      expect(calculate.multiply(1000, 1000)).toBe(1000000);
      expect(calculate.multiply(999, 999)).toBe(998001);
    });
  });

  describe('Division (divide)', () => {
    it('should divide two positive numbers', () => {
      expect(calculate.divide(10, 5)).toBe(2);
      expect(calculate.divide(100, 4)).toBe(25);
      expect(calculate.divide(50, 2)).toBe(25);
    });

    it('should divide negative numbers', () => {
      expect(calculate.divide(-10, 5)).toBe(-2);
      expect(calculate.divide(10, -5)).toBe(-2);
      expect(calculate.divide(-10, -5)).toBe(2);
    });

    it('should handle division by one', () => {
      expect(calculate.divide(10, 1)).toBe(10);
      expect(calculate.divide(100, 1)).toBe(100);
      expect(calculate.divide(-10, 1)).toBe(-10);
    });

    it('should handle division resulting in decimals', () => {
      expect(calculate.divide(10, 3)).toBeCloseTo(3.33, 2);
      expect(calculate.divide(1, 3)).toBeCloseTo(0.33, 2);
      expect(calculate.divide(5, 2)).toBe(2.5);
    });

    it('should handle decimal division', () => {
      expect(calculate.divide(10.5, 2)).toBe(5.25);
      expect(calculate.divide(100.5, 3)).toBe(33.5);
      expect(calculate.divide(7.5, 1.5)).toBe(5);
    });

    it('should handle zero dividend', () => {
      expect(calculate.divide(0, 10)).toBe(0);
      expect(calculate.divide(0, 5)).toBe(0);
    });

    it('should handle division by zero (currency.js behavior)', () => {
      // Division by zero typically returns Infinity
      const result = calculate.divide(10, 0);
      expect(result === Infinity || isNaN(result)).toBe(true);
    });

    it('should handle string numbers', () => {
      expect(calculate.divide('10', '5')).toBe(2);
      expect(calculate.divide('100', '4')).toBe(25);
    });

    it('should handle very small numbers', () => {
      // currency.js rounds to 2 decimal places: 1/1000 = 0.001 → 0.00
      expect(calculate.divide(1, 1000)).toBe(0);
      expect(calculate.divide(0.5, 10)).toBe(0.05); // This is within 2 decimal precision
    });
  });

  describe('Real-World Financial Calculations', () => {
    it('should calculate invoice total (quantity × price)', () => {
      const quantity = 5;
      const price = 19.99;
      const total = calculate.multiply(quantity, price);

      expect(total).toBe(99.95);
    });

    it('should calculate tax amount (subtotal × tax rate)', () => {
      const subtotal = 100;
      const taxRate = 0.15; // 15%
      const taxAmount = calculate.multiply(subtotal, taxRate);

      expect(taxAmount).toBe(15);
    });

    it('should calculate discount amount (price × discount percentage)', () => {
      const price = 200;
      const discountPercent = 0.20; // 20% off
      const discountAmount = calculate.multiply(price, discountPercent);

      expect(discountAmount).toBe(40);
    });

    it('should calculate final price after discount', () => {
      const originalPrice = 200;
      const discount = 40;
      const finalPrice = calculate.sub(originalPrice, discount);

      expect(finalPrice).toBe(160);
    });

    it('should calculate grand total (subtotal + tax + shipping)', () => {
      const subtotal = 100;
      const tax = 15;
      const shipping = 10;

      const total = calculate.add(calculate.add(subtotal, tax), shipping);

      expect(total).toBe(125);
    });

    it('should calculate payment balance (total - paid)', () => {
      const total = 1000;
      const paid = 750;
      const balance = calculate.sub(total, paid);

      expect(balance).toBe(250);
    });

    it('should calculate split payment (total / number of people)', () => {
      const total = 150;
      const people = 3;
      const perPerson = calculate.divide(total, people);

      expect(perPerson).toBe(50);
    });

    it('should calculate commission (sales × commission rate)', () => {
      const sales = 5000;
      const commissionRate = 0.05; // 5%
      const commission = calculate.multiply(sales, commissionRate);

      expect(commission).toBe(250);
    });
  });

  describe('Chained Operations', () => {
    it('should chain multiple operations correctly', () => {
      // (10 + 5) × 2 - 3 = 27
      const step1 = calculate.add(10, 5); // 15
      const step2 = calculate.multiply(step1, 2); // 30
      const step3 = calculate.sub(step2, 3); // 27

      expect(step3).toBe(27);
    });

    it('should calculate complex invoice (quantity × price + tax - discount)', () => {
      const quantity = 10;
      const price = 50;
      const taxRate = 0.10;
      const discount = 50;

      const subtotal = calculate.multiply(quantity, price); // 500
      const tax = calculate.multiply(subtotal, taxRate); // 50
      const totalWithTax = calculate.add(subtotal, tax); // 550
      const finalTotal = calculate.sub(totalWithTax, discount); // 500

      expect(finalTotal).toBe(500);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large numbers', () => {
      expect(calculate.add(999999999, 1)).toBe(1000000000);
      expect(calculate.multiply(1000000, 1000)).toBe(1000000000);
    });

    it('should handle very small decimal precision', () => {
      // currency.js uses 2 decimal precision by default, so very small numbers round to 0
      const result = calculate.add(0.0001, 0.0002);
      expect(result).toBe(0);
    });

    it('should avoid floating point precision errors', () => {
      // Classic floating point issue: 0.1 + 0.2 !== 0.3
      // currency.js should handle this correctly
      expect(calculate.add(0.1, 0.2)).toBe(0.3);
    });

    it('should handle null or undefined gracefully', () => {
      // currency.js may treat null/undefined as 0
      const result1 = calculate.add(10, null);
      const result2 = calculate.add(10, undefined);

      expect(typeof result1).toBe('number');
      expect(typeof result2).toBe('number');
    });
  });

  describe('Return Values', () => {
    it('should always return numeric values', () => {
      expect(typeof calculate.add(10, 5)).toBe('number');
      expect(typeof calculate.sub(10, 5)).toBe('number');
      expect(typeof calculate.multiply(10, 5)).toBe('number');
      expect(typeof calculate.divide(10, 5)).toBe('number');
    });

    it('should return finite numbers for normal operations', () => {
      expect(isFinite(calculate.add(10, 5))).toBe(true);
      expect(isFinite(calculate.sub(10, 5))).toBe(true);
      expect(isFinite(calculate.multiply(10, 5))).toBe(true);
      expect(isFinite(calculate.divide(10, 5))).toBe(true);
    });
  });

  describe('Currency Formatting Use Cases', () => {
    it('should calculate correct amounts for currency display', () => {
      // Price per item × quantity
      const pricePerItem = 9.99;
      const quantity = 3;
      const total = calculate.multiply(pricePerItem, quantity);

      expect(total).toBe(29.97);
    });

    it('should calculate tip amount correctly', () => {
      const billAmount = 50;
      const tipPercent = 0.20; // 20%
      const tipAmount = calculate.multiply(billAmount, tipPercent);

      expect(tipAmount).toBe(10);
    });

    it('should calculate percentage of total', () => {
      const part = 25;
      const total = 100;
      const percentage = calculate.divide(part, total);

      expect(percentage).toBe(0.25); // 25%
    });
  });
});
