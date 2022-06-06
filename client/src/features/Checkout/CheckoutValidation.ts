import * as yup from "yup";

// has 3 object because it is 3 step checkout
// second object dosent validate anything, but it need to be there
export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full name is required"),
        address1: yup.string().required("Address line 1 is required"),
        address2: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        country: yup.string().required(),

    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required("Card owne name is required"),

    }),
]