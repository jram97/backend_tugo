import admin from 'firebase-admin';

export const sendNotification = async (tokens, payload) => await admin.messaging().sendToDevice(tokens, payload);