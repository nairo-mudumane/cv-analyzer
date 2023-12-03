import "dotenv/config";
import * as admin from "firebase-admin";
import serviceAccount from "./service-account.json";

export const config = {
  apiKey: process.env.GOOGLE_API_KE,
  authDomain: process.env.GOOGLE_AUTH_DOMAIN,
  projectId: process.env.GOOGLE_PROJECT_ID,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.GOOGLE_APP_ID,
};

admin.initializeApp({
  ...config,
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const mediaStorage = admin.storage().bucket();
