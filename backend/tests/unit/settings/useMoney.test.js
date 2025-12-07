const useMoney = require('@/settings/useMoney');

describe('useMoney Settings Tests', () => {
  describe('Basic Functionality', () => {
    it('should return money formatting functions', () => {
      const settings = {
        currency_symbol: '$',
        currency_position: 'before',
        decimal_sep: '.',
        thousand_sep: ',',
        cent_precision: 2,
        zero_format: false
      };

      const result = useMoney({ settings });

      expect(result).toHaveProperty('moneyFormatter');
      expect(result).toHaveProperty('amountFormatter');
      expect(typeof result.moneyFormatter).toBe('function');
      expect(typeof result.amountFormatter).toBe('function');
    });

    it('should return settings values', () => {
      const settings = {
        currency_symbol: '€',
        currency_position: 'after',
        decimal_sep: ',',
        thousand_sep: '.',
        cent_precision: 2,
        zero_format: true
      };

      const result = useMoney({ settings });

      expect(result.currency_symbol).toBe('€');
      expect(result.currency_position).toBe('after');
      expect(result.decimal_sep).toBe(',');
      expect(result.thousand_sep).toBe('.');
      expect(result.cent_precision).toBe(2);
      expect(result.zero_format).toBe(true);
    });
  });

  describe('moneyFormatter Function', () => {
    describe('Currency Position - Before', () => {
      it('should format money with symbol before (USD style)', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 1234.56 });

        expect(result).toBe('$ 1,234.56');
      });

      it('should format zero with symbol before', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 0 });

        expect(result).toBe('$ 0.00');
      });

      it('should format negative amount with symbol before', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: -500.25 });

        expect(result).toBe('$ -500.25');
      });
    });

    describe('Currency Position - After', () => {
      it('should format money with symbol after (EUR style)', () => {
        const settings = {
          currency_symbol: '€',
          currency_position: 'after',
          decimal_sep: ',',
          thousand_sep: '.',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 1234.56 });

        expect(result).toBe('1.234,56 €');
      });

      it('should format zero with symbol after', () => {
        const settings = {
          currency_symbol: '€',
          currency_position: 'after',
          decimal_sep: ',',
          thousand_sep: '.',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 0 });

        expect(result).toBe('0,00 €');
      });

      it('should format negative amount with symbol after', () => {
        const settings = {
          currency_symbol: '€',
          currency_position: 'after',
          decimal_sep: ',',
          thousand_sep: '.',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: -750.99 });

        expect(result).toBe('-750,99 €');
      });
    });

    describe('Different Separators', () => {
      it('should use comma as thousand separator', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 1000000 });

        expect(result).toBe('$ 1,000,000.00');
      });

      it('should use dot as thousand separator (European style)', () => {
        const settings = {
          currency_symbol: '€',
          currency_position: 'after',
          decimal_sep: ',',
          thousand_sep: '.',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 1000000 });

        expect(result).toBe('1.000.000,00 €');
      });

      it('should use space as thousand separator', () => {
        const settings = {
          currency_symbol: 'CHF',
          currency_position: 'after',
          decimal_sep: '.',
          thousand_sep: ' ',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 1234567.89 });

        expect(result).toBe('1 234 567.89 CHF');
      });
    });

    describe('Precision Handling', () => {
      it('should format with 2 decimal places', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 100.5 });

        expect(result).toBe('$ 100.50');
      });

      it('should format with 0 decimal places (no cents)', () => {
        const settings = {
          currency_symbol: '¥',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 0,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 1234.56 });

        expect(result).toBe('¥ 1,235'); // Rounded
      });

      it('should format with 3 decimal places', () => {
        const settings = {
          currency_symbol: 'KWD',
          currency_position: 'after',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 3,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 100.256 });

        expect(result).toBe('100.256 KWD');
      });
    });

    describe('Zero Format Handling', () => {
      it('should format zero normally when zero_format=false', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 0 });

        expect(result).toBe('$ 0.00');
      });

      it('should format zero with leading zero when zero_format=true', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: true
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 0 });

        expect(result).toContain('0');
      });
    });

    describe('Default Amount', () => {
      it('should handle missing amount parameter (default to 0)', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({});

        expect(result).toBe('$ 0.00');
      });

      it('should handle undefined amount', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: undefined });

        expect(result).toBe('$ 0.00');
      });
    });

    describe('Real-World Currencies', () => {
      it('should format USD correctly', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 12345.67 });

        expect(result).toBe('$ 12,345.67');
      });

      it('should format EUR correctly', () => {
        const settings = {
          currency_symbol: '€',
          currency_position: 'after',
          decimal_sep: ',',
          thousand_sep: '.',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 12345.67 });

        expect(result).toBe('12.345,67 €');
      });

      it('should format GBP correctly', () => {
        const settings = {
          currency_symbol: '£',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 9876.54 });

        expect(result).toBe('£ 9,876.54');
      });

      it('should format JPY correctly (no decimal)', () => {
        const settings = {
          currency_symbol: '¥',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 0,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 123456 });

        expect(result).toBe('¥ 123,456');
      });

      it('should format INR correctly', () => {
        const settings = {
          currency_symbol: '₹',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 50000.75 });

        expect(result).toBe('₹ 50,000.75');
      });
    });

    describe('Edge Cases', () => {
      it('should handle very large amounts', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 999999999.99 });

        expect(result).toBe('$ 999,999,999.99');
      });

      it('should handle very small amounts', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 0.01 });

        expect(result).toBe('$ 0.01');
      });

      it('should handle decimal amounts correctly', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { moneyFormatter } = useMoney({ settings });
        const result = moneyFormatter({ amount: 99.99 });

        expect(result).toBe('$ 99.99');
      });
    });
  });

  describe('amountFormatter Function', () => {
    describe('Basic Formatting', () => {
      it('should format amount without currency symbol', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({ amount: 1234.56 });

        expect(result).toBe('1,234.56');
      });

      it('should format zero without currency symbol', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({ amount: 0 });

        expect(result).toBe('0.00');
      });

      it('should format negative amount without currency symbol', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({ amount: -500.25 });

        expect(result).toBe('-500.25');
      });
    });

    describe('Separators', () => {
      it('should use specified decimal separator', () => {
        const settings = {
          currency_symbol: '€',
          currency_position: 'after',
          decimal_sep: ',',
          thousand_sep: '.',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({ amount: 1234.56 });

        expect(result).toBe('1.234,56');
      });

      it('should use specified thousand separator', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ' ',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({ amount: 1000000 });

        expect(result).toBe('1 000 000.00');
      });
    });

    describe('Precision', () => {
      it('should respect cent_precision setting', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 3,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({ amount: 100.123 });

        expect(result).toBe('100.123');
      });

      it('should handle zero precision', () => {
        const settings = {
          currency_symbol: '¥',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 0,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({ amount: 1234.56 });

        expect(result).toBe('1,235');
      });
    });

    describe('Default Amount', () => {
      it('should default to 0 when amount not provided', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const result = amountFormatter({});

        expect(result).toBe('0.00');
      });
    });

    describe('Use Cases', () => {
      it('should format subtotal in invoice', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const subtotal = amountFormatter({ amount: 5000 });

        expect(subtotal).toBe('5,000.00');
      });

      it('should format tax amount', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const tax = amountFormatter({ amount: 750.50 });

        expect(tax).toBe('750.50');
      });

      it('should format total amount', () => {
        const settings = {
          currency_symbol: '$',
          currency_position: 'before',
          decimal_sep: '.',
          thousand_sep: ',',
          cent_precision: 2,
          zero_format: false
        };

        const { amountFormatter } = useMoney({ settings });
        const total = amountFormatter({ amount: 5750.50 });

        expect(total).toBe('5,750.50');
      });
    });
  });

  describe('moneyFormatter vs amountFormatter', () => {
    it('moneyFormatter includes currency symbol, amountFormatter does not', () => {
      const settings = {
        currency_symbol: '$',
        currency_position: 'before',
        decimal_sep: '.',
        thousand_sep: ',',
        cent_precision: 2,
        zero_format: false
      };

      const { moneyFormatter, amountFormatter } = useMoney({ settings });

      const withSymbol = moneyFormatter({ amount: 100 });
      const withoutSymbol = amountFormatter({ amount: 100 });

      expect(withSymbol).toContain('$');
      expect(withoutSymbol).not.toContain('$');
    });

    it('both use same formatting rules for numbers', () => {
      const settings = {
        currency_symbol: '$',
        currency_position: 'before',
        decimal_sep: '.',
        thousand_sep: ',',
        cent_precision: 2,
        zero_format: false
      };

      const { moneyFormatter, amountFormatter } = useMoney({ settings });

      const withSymbol = moneyFormatter({ amount: 1234.56 });
      const withoutSymbol = amountFormatter({ amount: 1234.56 });

      expect(withSymbol).toBe('$ 1,234.56');
      expect(withoutSymbol).toBe('1,234.56');
    });
  });

  describe('Real-World Invoice Scenarios', () => {
    it('should format complete invoice with USD', () => {
      const settings = {
        currency_symbol: '$',
        currency_position: 'before',
        decimal_sep: '.',
        thousand_sep: ',',
        cent_precision: 2,
        zero_format: false
      };

      const { moneyFormatter, amountFormatter } = useMoney({ settings });

      const subtotal = amountFormatter({ amount: 10000 });
      const tax = amountFormatter({ amount: 1500 });
      const total = moneyFormatter({ amount: 11500 });

      expect(subtotal).toBe('10,000.00');
      expect(tax).toBe('1,500.00');
      expect(total).toBe('$ 11,500.00');
    });

    it('should format complete invoice with EUR', () => {
      const settings = {
        currency_symbol: '€',
        currency_position: 'after',
        decimal_sep: ',',
        thousand_sep: '.',
        cent_precision: 2,
        zero_format: false
      };

      const { moneyFormatter, amountFormatter } = useMoney({ settings });

      const subtotal = amountFormatter({ amount: 8500.50 });
      const tax = amountFormatter({ amount: 1275.08 });
      const total = moneyFormatter({ amount: 9775.58 });

      expect(subtotal).toBe('8.500,50');
      expect(tax).toBe('1.275,08');
      expect(total).toBe('9.775,58 €');
    });

    it('should format payment receipt', () => {
      const settings = {
        currency_symbol: '$',
        currency_position: 'before',
        decimal_sep: '.',
        thousand_sep: ',',
        cent_precision: 2,
        zero_format: false
      };

      const { moneyFormatter } = useMoney({ settings });

      const amountPaid = moneyFormatter({ amount: 5000 });
      const balance = moneyFormatter({ amount: 6500 });

      expect(amountPaid).toBe('$ 5,000.00');
      expect(balance).toBe('$ 6,500.00');
    });
  });
});
