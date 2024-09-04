"use server";

// ---
// title:   actions
// date:    date
// author:  luke king
// desc:    使用Zod验证数据，服务器端的操作
// ---

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ZodStringDef, z } from "zod";
import prisma from "../lib/db";
import { type CategoryTypes } from "@prisma/client";
import { stripe } from "../lib/stripe";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

// MARK: State
export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

// MARK: productSchema
// INFO: 确定数据验证规则
const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name has to be a min charackter length of 5" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, { message: "The Price has to be bigger then 1" }),
  smallSummary: z
    .string()
    .min(10, { message: "Please summerize your product more" }),
  description: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFile: z
    .string()
    .min(1, { message: "Pleaes upload a zip of your product" }),
});

// MARK: SettingsSchema
// INFO: 确定数据验证规则
const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),

  lastName: z
    .string()
    .min(3, { message: "Minimum length of 3 required" })
    .or(z.literal(""))
    .optional(),
});

// MARK: Fn:SellProduct
// INFO: 和useFormState绑定，用来获取表单数据 & 创建数据
export async function SellProduct(prevState: any, formData: FormData): Promise<State> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  // INFO: 使用Zod验证过的有效数据
  const validateFields = productSchema.safeParse({
//  TODO: 要获取对应的数据，需要在原标签上添加name属性
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallSummary: formData.get("smallSummary"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  // INFO: 如果不成功，就返回一个错误状态，携带错误信息
  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  console.log('Create Product ==>');
  try {
    await prisma.product.create({
      data: {
        name: validateFields.data.name,
        category: validateFields.data.category as CategoryTypes,
        smallSummary: validateFields.data.smallSummary,
        price: validateFields.data.price,
        images: validateFields.data.images,
        productFile: validateFields.data.productFile,
        userId: user.id,
        description: JSON.parse(validateFields.data.description),
      },
    });

    const state: State = {
      status: "success",
      message: "Your product has been created.",
    };

    return state;
  } catch (error) {
    // Handle the database or other unexpected errors
    console.log("error ==> :",error);
    
    const state: State = {
      status: "error",
      message: "There was an error while creating your product. Please try again later.",
    };

    return state;
  }
}


// MARK: Fn:UpdateUserSettings
// export async function UpdateUserSettings(prevState: any, formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   if (!user) {
//     throw new Error("something went wrong");
//   }

//   const validateFields = userSettingsSchema.safeParse({
//     firstName: formData.get("firstName"),
//     lastName: formData.get("lastName"),
//   });

//   if (!validateFields.success) {
//     const state: State = {
//       status: "error",
//       errors: validateFields.error.flatten().fieldErrors,
//       message: "Oops, I think there is a mistake with your inputs.",
//     };

//     return state;
//   }

//   const data = await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       firstName: validateFields.data.firstName,
//       lastName: validateFields.data.lastName,
//     },
//   });

//   const state: State = {
//     status: "success",
//     message: "Your Settings have been updated",
//   };

//   return state;
// }

// MARK: Fn:BuyProduct
// export async function BuyProduct(formData: FormData) {
//   const id = formData.get("id") as string;
//   const data = await prisma.product.findUnique({
//     where: {
//       id: id,
//     },
//     select: {
//       name: true,
//       smallSummary: true,
//       price: true,
//       images: true,
//       productFile: true,
//       User: {
//         select: {
//           connectedAccountId: true,
//         },
//       },
//     },
//   });

//   const session = await stripe.checkout.sessions.create({
//     mode: "payment",
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           unit_amount: Math.round((data?.price as number) * 100),
//           product_data: {
//             name: data?.name as string,
//             description: data?.smallSummary,
//             images: data?.images,
//           },
//         },
//         quantity: 1,
//       },
//     ],
//     metadata: {
//       link: data?.productFile as string,
//     },

//     payment_intent_data: {
//       application_fee_amount: Math.round((data?.price as number) * 100) * 0.1,
//       transfer_data: {
//         destination: data?.User?.connectedAccountId as string,
//       },
//     },
//     success_url:
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000/payment/success"
//         : "https://marshal-ui-yt.vercel.app/payment/success",
//     cancel_url:
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000/payment/cancel"
//         : "https://marshal-ui-yt.vercel.app/payment/cancel",
//   });

//   return redirect(session.url as string);
// }

// // MARK:Fn:CreateAccu
// export async function CreateStripeAccoutnLink() {
//   const { getUser } = getKindeServerSession();

//   const user = await getUser();

//   if (!user) {
//     throw new Error();
//   }

//   const data = await prisma.user.findUnique({
//     where: {
//       id: user.id,
//     },
//     select: {
//       connectedAccountId: true,
//     },
//   });

//   const accountLink = await stripe.accountLinks.create({
//     account: data?.connectedAccountId as string,
//     refresh_url:
//       process.env.NODE_ENV === "development"
//         ? `http://localhost:3000/billing`
//         : `https://marshal-ui-yt.vercel.app/billing`,
//     return_url:
//       process.env.NODE_ENV === "development"
//         ? `http://localhost:3000/return/${data?.connectedAccountId}`
//         : `https://marshal-ui-yt.vercel.app/return/${data?.connectedAccountId}`,
//     type: "account_onboarding",
//   });

//   return redirect(accountLink.url);
// }

// // MARK: Fn:GetStripeDash
// export async function GetStripeDashboardLink() {
//   const { getUser } = getKindeServerSession();

//   const user = await getUser();

//   if (!user) {
//     throw new Error();
//   }

//   const data = await prisma.user.findUnique({
//     where: {
//       id: user.id,
//     },
//     select: {
//       connectedAccountId: true,
//     },
//   });

//   const loginLink = await stripe.accounts.createLoginLink(
//     data?.connectedAccountId as string
//   );

//   return redirect(loginLink.url);
// }
