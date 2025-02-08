import prisma from "@/lib/prisma/prismaClient";
import bcrypt from "bcrypt";

import { SignJWT } from "jose";

import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  
  
  SubscriptionError,
} from "@/lib/error-handler/customeErrors";
import {
  SignInData,
  SignInResult,
  User,
  Admin,
  Manager,

} from "@/app/api/auth/signin/types";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
import {  PrismaClient } from "@prisma/client";

//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);



export async function signIn(data: SignInData): Promise<SignInResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const { existingUser } = await validateSignInData(data, prisma);
      await validatePassword(data.userPassword, existingUser);
      

      if (data.userRole === "admin") {
        return await handleAdminSignIn(existingUser as Admin);
      } else if (data.userRole === "manager") {
        return await handleManagerSignIn(existingUser as Manager);
      }

      throw new ValidationError("Le rôle sélectionné n'est pas valide");
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}

async function validateSignInData(
  data: SignInData,
  prisma: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">
): Promise<{ existingUser: User }> {
  let existingUser: User | null = null;

  if (data.userRole === "admin") {
    existingUser = await prisma.admin.findUnique({
      where: { adminEmail: data.userEmail },
      include: {
        managedCompany: {
          include: {
            companySubscription: {
              include: {
                subscriptionPlan: true,
              },
            },
          },
        },
      },
    });
  } else if (data.userRole === "manager") {
    existingUser = await prisma.manager.findUnique({
      where: { managerEmail: data.userEmail },
      include: {
        employingCompany: {
          include: {
            companySubscription: {
              include: {
                subscriptionPlan: true,
              },
            },
          },
        },
      },
    });
  } else {
    throw new ValidationError("Le rôle donné n'est pas valide");
  }

  if (!existingUser) {
    throw new NotFoundError("Utilisateur non trouvé");
  }

  return { existingUser };
}

async function validatePassword(
  inputPassword: string,
  user: User
): Promise<void> {
  const storedPassword = 'adminPassword' in user ? user.adminPassword : user.managerPassword;
  const isPasswordValid = await bcrypt.compare(inputPassword, storedPassword);
  
  if (!isPasswordValid) {
    throw new UnauthorizedError("Mot de passe non valide");
  }
}







async function generateToken(
  userId: string,
  companyId: string,
  role: string,
  endDate: Date,
  planName: string
): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_COMPANY_SECRET);
  return await new SignJWT({
    id: userId,
    companyId,
    role,
    endDate,
    planName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}



async function handleAdminSignIn(admin: Admin): Promise<SignInResult> {
  if (!admin.managedCompany?.companySubscription) {
    throw new ValidationError("Informations d'abonnement non trouvées");
  }

  const { subscriptionEndDate, subscriptionPlan } = admin.managedCompany.companySubscription;
  
  if (subscriptionEndDate < new Date()) {
    
    throw new SubscriptionError("L'abonnement a expiré");
  }

  const token = await generateToken(
    admin.adminId,
    admin.managedCompany.companyId,
    "admin",
    subscriptionEndDate,
    subscriptionPlan.planName
  );

  return { user: admin, token };
}

async function handleManagerSignIn(manager: Manager): Promise<SignInResult> {
  if (!manager.employingCompany?.companySubscription) {
    throw new ValidationError("Informations d'abonnement de l'entreprise non trouvées");
  }

  const { subscriptionEndDate, subscriptionPlan } = manager.employingCompany.companySubscription;

  if (subscriptionEndDate < new Date()) {
    throw new SubscriptionError(
      "Votre limite d'abonnement est déja atteinte, votre administrateur doit renouveler l'abonnement pour que vous devez continuer"
    );
  }

  const token = await generateToken(
    manager.managerId,
    manager.employingCompany.companyId,
    "manager",
    subscriptionEndDate,
    subscriptionPlan.planName
  );

  return { user: manager, token };
}

/*async function createStripeCheckoutSession(
  plan: Plan,
  companyId: string
): Promise<string> {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${plan.planName} Plan` },
            unit_amount: 2000, // You might want to store this in the Plan model
          },
          quantity: 1,
        },
      ],
      metadata: { companyId },
      mode: "payment",
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    return session.url as string;
  } catch (error) {
    console.log(error)
    throw new PaymentError("Échec de la création de la session de paiement",);  
  }
}*/