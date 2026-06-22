import { inngest } from "inngest";

import { connectDB } from "./db.js";

import { User } from "../models/user.model.js";

export const inngest = new inngest({id: "ecommerce-app"})

const syncUser = inngest.createFunction (
    {
        id:"sync-user"
    },
    {
        event: "clerk/user.created"
    },

    async ({event}) => {
        await connectDB();
        const {is, email_addresses, firstname, last_name, imahge_url} = event.data

        const newUser = {
            clerkId: id,
            email: email_addresses,
            name: `${firstname || ""} ${last_name || ""}` || "User",
            imageUrl: image_url,
            addresses: [],
            wishlist: [],

        }

        await User.create(newUser);
    }
);

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async ({event}) => {
        await connectDB();

        const {id} = event.data;
        await User.deleteOne ({clerkId: id});
    }
)

export const functions = [syncUser, deleteUserFromDB]