import express from 'express';
import crypto from 'crypto';
import axios from 'axios';
import Payment from '../models/Payment.js';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

const {
  PHONEPE_MERCHANT_ID,
  PHONEPE_SALT_KEY,
  PHONEPE_SALT_INDEX,
  PHONEPE_PAY_URL,
  PHONEPE_STATUS_URL,
} = process.env;

/* ================= START PAYMENT ================= */
router.post('/pay', async (req, res) => {
  try {
    const { name, email, phone, address, amount } = req.body;
    const transactionId = 'TXN_' + Date.now();

    // Save INITIATED payment
    await Payment.create({
      transactionId,
      name,
      email,
      phone,
      address,
      amount,
      status: 'INITIATED',
    });

    const payload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: phone || 'USER_' + Date.now(),
      amount: amount * 100,
      redirectUrl: `http://localhost:5173/payment-status?txnId=${transactionId}`,
      redirectMode: 'GET',
      callbackUrl: 'http://localhost:5000/api/phonepe/callback',
      paymentInstrument: { type: 'PAY_PAGE' },
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const string = base64Payload + '/pg/v1/pay' + PHONEPE_SALT_KEY;
    const hash = crypto.createHash('sha256').update(string).digest('hex');
    const xVerify = `${hash}###${PHONEPE_SALT_INDEX}`;

    const response = await axios.post(
      PHONEPE_PAY_URL,
      { request: base64Payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify,
        },
      }
    );

    res.json({
      redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
    });
  } catch (err) {
    console.error('❌ PAY ERROR:', err.message);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
});

/* ================= PAYMENT STATUS ================= */
router.get('/status/:txnId', async (req, res) => {
  try {
    const { txnId } = req.params;

    const string = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${txnId}` + PHONEPE_SALT_KEY;

    const hash = crypto.createHash('sha256').update(string).digest('hex');
    const xVerify = `${hash}###${PHONEPE_SALT_INDEX}`;

    const response = await axios.get(
      `${PHONEPE_STATUS_URL}/${PHONEPE_MERCHANT_ID}/${txnId}`,
      {
        headers: {
          'X-VERIFY': xVerify,
          'X-MERCHANT-ID': PHONEPE_MERCHANT_ID,
        },
      }
    );

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: txnId },
      {
        status: response.data.data.state,
        phonepeResponse: response.data,
      },
      { new: true }
    );

    if (updatedPayment) {
      await syncEnquiry(updatedPayment);
    }

    res.json({ status: response.data.data.state });
  } catch {
    res.json({ status: 'FAILED' });
  }
});

/* ================= CALLBACK ================= */
router.post('/callback', async (req, res) => {
  try {
    const { merchantTransactionId, state } = req.body;

    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: merchantTransactionId },
      { status: state, phonepeResponse: req.body },
      { new: true }
    );

    if (updatedPayment) {
      await syncEnquiry(updatedPayment);
    }

    res.sendStatus(200);
  } catch (err) {
    // ensure we always respond 200 to the provider
    res.sendStatus(200);
  }
});

/* ================= HELPER ================= */
async function syncEnquiry(payment) {
  try {
    // Only sync SUCCESS or FAILED as requested
    if (!['SUCCESS', 'FAILED'].includes(payment.status)) return;

    const existing = await Enquiry.findOne({ transactionId: payment.transactionId });
    
    if (existing) {
      // Update existing
      existing.paymentStatus = payment.status;
      existing.subject = `Payment ${payment.status} - ₹${payment.amount}`;
      // Update message to reflect new status if needed, or append
      existing.message = `Transaction ID: ${payment.transactionId}\nPhone: ${payment.phone}\nAddress: ${payment.address}\nAmount: ${payment.amount}\nStatus: ${payment.status}\nUpdated: ${new Date().toISOString()}`;
      await existing.save();
    } else {
      // Create new
      await Enquiry.create({
        companyName: 'Payment',
        contactPerson: payment.name || 'Unknown',
        email: payment.email || 'no-email@provided.com',
        subject: `Payment ${payment.status} - ₹${payment.amount}`,
        message: `Transaction ID: ${payment.transactionId}\nPhone: ${payment.phone}\nAddress: ${payment.address}\nAmount: ${payment.amount}\nStatus: ${payment.status}`,
        transactionId: payment.transactionId,
        paymentStatus: payment.status,
        amount: payment.amount,
        date: new Date()
      });
    }
  } catch (err) {
    console.error('Failed to sync payment to enquiry:', err);
  }
}

export default router;
