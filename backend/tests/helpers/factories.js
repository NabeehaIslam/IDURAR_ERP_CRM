const Admin = require('@/models/coreModels/Admin');
const Client = require('@/models/appModels/Client');
const Invoice = require('@/models/appModels/Invoice');
const Payment = require('@/models/appModels/Payment');
const Quote = require('@/models/appModels/Quote');
const { generateObjectId } = require('./dbHelper');

/**
 * Factory for creating test admins
 */
const AdminFactory = {
  build: (overrides = {}) => ({
    email: `admin${Date.now()}@test.com`,
    name: 'Test',
    surname: 'Admin',
    enabled: true,
    role: 'owner',
    ...overrides,
  }),

  create: async (overrides = {}) => {
    const data = AdminFactory.build(overrides);
    return await Admin.create(data);
  },

  createMany: async (count, overrides = {}) => {
    const admins = [];
    for (let i = 0; i < count; i++) {
      admins.push(await AdminFactory.create({ ...overrides, email: `admin${i}${Date.now()}@test.com` }));
    }
    return admins;
  },
};

/**
 * Factory for creating test clients
 */
const ClientFactory = {
  build: (overrides = {}) => ({
    name: `Test Client ${Date.now()}`,
    phone: '+1234567890',
    country: 'USA',
    address: '123 Test Street',
    email: `client${Date.now()}@test.com`,
    enabled: true,
    ...overrides,
  }),

  create: async (overrides = {}) => {
    const data = ClientFactory.build(overrides);
    return await Client.create(data);
  },

  createMany: async (count, overrides = {}) => {
    const clients = [];
    for (let i = 0; i < count; i++) {
      clients.push(await ClientFactory.create({ ...overrides, email: `client${i}${Date.now()}@test.com` }));
    }
    return clients;
  },
};

/**
 * Factory for creating test invoices
 */
const InvoiceFactory = {
  build: (overrides = {}) => ({
    number: Math.floor(Math.random() * 100000),
    year: new Date().getFullYear(),
    client: overrides.client || generateObjectId(),
    items: [
      {
        itemName: 'Test Item',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        total: 100,
      },
    ],
    taxRate: 0,
    subTotal: 100,
    taxTotal: 0,
    total: 100,
    credit: 0,
    discount: 0,
    status: 'draft',
    ...overrides,
  }),

  create: async (overrides = {}) => {
    const data = InvoiceFactory.build(overrides);
    return await Invoice.create(data);
  },

  createMany: async (count, overrides = {}) => {
    const invoices = [];
    for (let i = 0; i < count; i++) {
      invoices.push(await InvoiceFactory.create(overrides));
    }
    return invoices;
  },
};

/**
 * Factory for creating test payments
 */
const PaymentFactory = {
  build: (overrides = {}) => ({
    number: Math.floor(Math.random() * 100000),
    client: overrides.client || generateObjectId(),
    invoice: overrides.invoice || generateObjectId(),
    amount: 100,
    paymentMode: 'cash',
    description: 'Test payment',
    status: 'paid',
    ...overrides,
  }),

  create: async (overrides = {}) => {
    const data = PaymentFactory.build(overrides);
    return await Payment.create(data);
  },

  createMany: async (count, overrides = {}) => {
    const payments = [];
    for (let i = 0; i < count; i++) {
      payments.push(await PaymentFactory.create(overrides));
    }
    return payments;
  },
};

/**
 * Factory for creating test quotes
 */
const QuoteFactory = {
  build: (overrides = {}) => ({
    number: Math.floor(Math.random() * 100000),
    year: new Date().getFullYear(),
    client: overrides.client || generateObjectId(),
    items: [
      {
        itemName: 'Test Item',
        description: 'Test Description',
        quantity: 1,
        price: 100,
        total: 100,
      },
    ],
    taxRate: 0,
    subTotal: 100,
    taxTotal: 0,
    total: 100,
    discount: 0,
    status: 'draft',
    ...overrides,
  }),

  create: async (overrides = {}) => {
    const data = QuoteFactory.build(overrides);
    return await Quote.create(data);
  },

  createMany: async (count, overrides = {}) => {
    const quotes = [];
    for (let i = 0; i < count; i++) {
      quotes.push(await QuoteFactory.create(overrides));
    }
    return quotes;
  },
};

module.exports = {
  AdminFactory,
  ClientFactory,
  InvoiceFactory,
  PaymentFactory,
  QuoteFactory,
};
