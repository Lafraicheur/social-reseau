"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import streamServerClient from "@/lib/stream";

export async function signUp(
    credentials: SignUpValues,
): Promise<{ error: string }> {
    try {
        const { username, email, password } = signUpSchema.parse(credentials);
    
        const userId = generateIdFromEntropySize(10);
    
        const existingUsername = await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive",
                },
            },
        });
    
        if (existingUsername) {
            return {
                error: "Nom d'utilisateur déjà pris",
            };
        }
    
        const existingEmail = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive",
                },
            },
        });
    
        if (existingEmail) {
            return {
                error: "Adresse e-mail déjà prise",
            };
        }

        await prisma.$transaction(async (tx) => {
            await tx.user.create({
                data: {
                    id: userId,
                    username,
                    displayName: username,
                    email,
                    passwordHash: password, // Enregistrer le mot de passe en clair
                },
            });
            await streamServerClient.upsertUser({
                id: userId,
                username,
                name: username,
            });
        });
    
        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
    
        return redirect("/");
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.error(error);
        return {
            error: "Quelque chose s'est mal passé. Veuillez réessayer.",
        };
    }
}
