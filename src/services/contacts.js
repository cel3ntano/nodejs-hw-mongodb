import { Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: string,
      required: true,
    },
    phoneNumber: {
      type: string,
      required: true,
    },
    email: {
      type: string,
    },
    isFavourite: {
      type: boolean,
      default: false,
    },
    contactType: {
      type: string,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true, versionkey: false },
);
