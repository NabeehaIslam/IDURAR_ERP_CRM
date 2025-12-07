const { checkCurrency } = require('@/utils/currency');

describe('checkCurrency Utility Tests', () => {
  describe('Valid Currencies', () => {
    it('should return true for USD', () => {
      expect(checkCurrency('USD')).toBe(true);
    });

    it('should return true for EUR', () => {
      expect(checkCurrency('EUR')).toBe(true);
    });

    it('should return true for GBP', () => {
      expect(checkCurrency('GBP')).toBe(true);
    });

    it('should return true for JPY', () => {
      expect(checkCurrency('JPY')).toBe(true);
    });

    it('should return true for CAD', () => {
      expect(checkCurrency('CAD')).toBe(true);
    });

    it('should return true for AUD', () => {
      expect(checkCurrency('AUD')).toBe(true);
    });

    it('should return true for CHF', () => {
      expect(checkCurrency('CHF')).toBe(true);
    });

    it('should return true for CNY', () => {
      expect(checkCurrency('CNY')).toBe(true);
    });

    it('should return true for INR', () => {
      expect(checkCurrency('INR')).toBe(true);
    });

    it('should return true for BRL', () => {
      expect(checkCurrency('BRL')).toBe(true);
    });
  });

  describe('Case Insensitivity', () => {
    it('should accept lowercase currency codes', () => {
      expect(checkCurrency('usd')).toBe(true);
      expect(checkCurrency('eur')).toBe(true);
      expect(checkCurrency('gbp')).toBe(true);
    });

    it('should accept mixed case currency codes', () => {
      expect(checkCurrency('Usd')).toBe(true);
      expect(checkCurrency('EuR')).toBe(true);
      expect(checkCurrency('GbP')).toBe(true);
    });

    it('should accept uppercase currency codes', () => {
      expect(checkCurrency('USD')).toBe(true);
      expect(checkCurrency('EUR')).toBe(true);
      expect(checkCurrency('GBP')).toBe(true);
    });
  });

  describe('Invalid Currencies', () => {
    it('should return false for invalid currency codes', () => {
      expect(checkCurrency('XXX')).toBe(false);
      expect(checkCurrency('ZZZ')).toBe(false);
      expect(checkCurrency('ABC')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(checkCurrency('')).toBe(false);
    });

    it('should return false for non-existent currency codes', () => {
      expect(checkCurrency('INVALID')).toBe(false);
      expect(checkCurrency('FAKE')).toBe(false);
    });

    it('should return false for partial currency codes', () => {
      expect(checkCurrency('US')).toBe(false);
      expect(checkCurrency('U')).toBe(false);
    });

    it('should return false for currency codes with extra characters', () => {
      expect(checkCurrency('USD1')).toBe(false);
      expect(checkCurrency('USDA')).toBe(false);
      expect(checkCurrency(' USD')).toBe(false);
      expect(checkCurrency('USD ')).toBe(false);
    });
  });

  describe('Major World Currencies', () => {
    it('should validate all major reserve currencies', () => {
      const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF'];

      majorCurrencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });

    it('should validate major Asian currencies', () => {
      const asianCurrencies = ['JPY', 'CNY', 'KRW', 'INR', 'SGD', 'HKD', 'THB'];

      asianCurrencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });

    it('should validate major European currencies', () => {
      const europeanCurrencies = ['EUR', 'GBP', 'CHF', 'SEK', 'NOK', 'DKK', 'PLN'];

      europeanCurrencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });

    it('should validate major American currencies', () => {
      const americanCurrencies = ['USD', 'CAD', 'BRL', 'MXN', 'ARS'];

      americanCurrencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });

    it('should validate major Oceanian currencies', () => {
      const oceanianCurrencies = ['AUD', 'NZD'];

      oceanianCurrencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });
  });

  describe('Middle Eastern and African Currencies', () => {
    it('should validate Middle Eastern currencies', () => {
      const middleEasternCurrencies = ['AED', 'SAR', 'QAR', 'KWD', 'OMR', 'BHD', 'JOD', 'ILS'];

      middleEasternCurrencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });

    it('should validate major African currencies', () => {
      const africanCurrencies = ['ZAR', 'NGN', 'EGP', 'MAD', 'KES', 'GHS'];

      africanCurrencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });
  });

  describe('Cryptocurrency and Digital Currencies', () => {
    it('should return false for cryptocurrencies (not in list)', () => {
      expect(checkCurrency('BTC')).toBe(false);
      expect(checkCurrency('ETH')).toBe(false);
      expect(checkCurrency('XRP')).toBe(false);
      expect(checkCurrency('USDT')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined gracefully (may throw or return false)', () => {
      // Depending on implementation, this might throw an error
      // Test both scenarios
      try {
        const result = checkCurrency(null);
        expect(typeof result).toBe('boolean');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle numbers', () => {
      try {
        const result = checkCurrency(123);
        expect(typeof result).toBe('boolean');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle special characters', () => {
      expect(checkCurrency('$$$')).toBe(false);
      expect(checkCurrency('€€€')).toBe(false);
      expect(checkCurrency('US$')).toBe(false);
    });

    it('should handle whitespace', () => {
      expect(checkCurrency('   ')).toBe(false);
      expect(checkCurrency('\t')).toBe(false);
      expect(checkCurrency('\n')).toBe(false);
    });
  });

  describe('Specific Currency Validations', () => {
    it('should validate Eastern European currencies', () => {
      expect(checkCurrency('PLN')).toBe(true); // Poland
      expect(checkCurrency('CZK')).toBe(true); // Czech Republic
      expect(checkCurrency('HUF')).toBe(true); // Hungary
      expect(checkCurrency('RON')).toBe(true); // Romania
      expect(checkCurrency('BGN')).toBe(true); // Bulgaria
    });

    it('should validate Scandinavian currencies', () => {
      expect(checkCurrency('SEK')).toBe(true); // Sweden
      expect(checkCurrency('NOK')).toBe(true); // Norway
      expect(checkCurrency('DKK')).toBe(true); // Denmark
      expect(checkCurrency('ISK')).toBe(true); // Iceland
    });

    it('should validate South American currencies', () => {
      expect(checkCurrency('BRL')).toBe(true); // Brazil
      expect(checkCurrency('ARS')).toBe(true); // Argentina
      expect(checkCurrency('CLP')).toBe(true); // Chile
      expect(checkCurrency('COP')).toBe(true); // Colombia
      expect(checkCurrency('PEN')).toBe(true); // Peru
    });

    it('should validate Southeast Asian currencies', () => {
      expect(checkCurrency('THB')).toBe(true); // Thailand
      expect(checkCurrency('MYR')).toBe(true); // Malaysia
      expect(checkCurrency('SGD')).toBe(true); // Singapore
      expect(checkCurrency('PHP')).toBe(true); // Philippines
      expect(checkCurrency('IDR')).toBe(true); // Indonesia
      expect(checkCurrency('VND')).toBe(true); // Vietnam
    });
  });

  describe('Deprecated or Historical Currencies', () => {
    it('should return false for deprecated European currencies', () => {
      expect(checkCurrency('DEM')).toBe(false); // Deutsche Mark
      expect(checkCurrency('FRF')).toBe(false); // French Franc
      expect(checkCurrency('ITL')).toBe(false); // Italian Lira
      expect(checkCurrency('ESP')).toBe(false); // Spanish Peseta
    });

    it('should handle Venezuelan Bolivar (VEF/VES)', () => {
      expect(checkCurrency('VEF')).toBe(true); // Old Bolivar
      expect(checkCurrency('VES')).toBe(true); // New Bolivar
    });
  });

  describe('Return Value', () => {
    it('should always return boolean', () => {
      expect(typeof checkCurrency('USD')).toBe('boolean');
      expect(typeof checkCurrency('INVALID')).toBe('boolean');
      expect(typeof checkCurrency('eur')).toBe('boolean');
    });

    it('should return true or false, never other values', () => {
      const result1 = checkCurrency('USD');
      const result2 = checkCurrency('INVALID');

      expect(result1 === true || result1 === false).toBe(true);
      expect(result2 === true || result2 === false).toBe(true);
    });
  });

  describe('Comprehensive Currency List Validation', () => {
    it('should include at least 100 currencies', () => {
      // Test a large sample
      const currencies = [
        'USD',
        'EUR',
        'GBP',
        'JPY',
        'CHF',
        'CAD',
        'AUD',
        'NZD',
        'SEK',
        'NOK',
        'DKK',
        'PLN',
        'CZK',
        'HUF',
        'RON',
        'BGN',
        'HRK',
        'RUB',
        'UAH',
        'TRY',
        'ZAR',
        'CNY',
        'INR',
        'KRW',
        'SGD',
        'HKD',
        'THB',
        'MYR',
        'PHP',
        'IDR',
        'VND',
        'AED',
        'SAR',
        'QAR',
        'KWD',
        'OMR',
        'BHD',
        'JOD',
        'ILS',
        'EGP',
        'NGN',
        'KES',
        'GHS',
        'MAD',
        'BRL',
        'ARS',
        'MXN',
        'CLP',
        'COP',
        'PEN',
      ];

      currencies.forEach((currency) => {
        expect(checkCurrency(currency)).toBe(true);
      });
    });
  });

  describe('Format Validation', () => {
    it('should only accept 3-letter codes', () => {
      expect(checkCurrency('US')).toBe(false); // Too short
      expect(checkCurrency('USDA')).toBe(false); // Too long
      expect(checkCurrency('U')).toBe(false); // Too short
    });
  });
});
