import { loadStripe } from '@stripe/stripe-js';

// ✅ Publishable key এখানে দিন
const stripePromise = loadStripe('pk_test_51TjMjEBSgzjPQ57b3LZbyvl7vbuEQ7GgWlZYQ9s2i75zT2HpKWxxmSY2kzOptJsuaSbp6mBSMEst9JJa1pJfD6d900O8gT83iB');

export default stripePromise;