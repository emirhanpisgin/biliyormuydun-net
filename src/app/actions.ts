"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { updateUserUseCase } from "@/use-cases/users";
import { z } from "zod";
import { usernameExists } from "@/helpers/users";

export const changeNameAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.handler(async ({ ctx, input }) => {
		try {
			const oneHourAgo = Date.now() - 60 * 60 * 1000;
			if (ctx.nameChangedAt && new Date(ctx.nameChangedAt).getTime() > oneHourAgo)
				return { success: false, message: "İsminizi saatte bir değiştirebilirsiniz." };

			if (!input.match(/^[a-zA-Z0-9_ğüşöçıİĞÜŞÖÇ ]{4,32}$/))
				return { success: false, message: "Lütfen geçerli bir isim giriniz." };

			await updateUserUseCase(ctx.id, {
				name: input,
				nameChangedAt: new Date(),
			});

			return { success: true, message: `İsminiz başarıyla \"${input}\" olarak değiştirildi.` };
		} catch (error) {
			return { success: false, message: "Bir hata oluştu, lütfen daha sonra tekrar deneyin." };
		}
	});

export const changeUsernameAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.handler(async ({ ctx, input }) => {
		try {
			const sixHoursAgo = Date.now() - 6 * 60 * 60 * 1000;
			if (ctx.usernameChangedAt && new Date(ctx.usernameChangedAt).getTime() > sixHoursAgo)
				return { success: false, message: "Kullanıcı adınızı 6 saatte bir değiştirebilirsiniz." };

			if (!input.match(/^[a-zA-Z0-9_]{3,16}$/))
				return { success: false, message: "Lütfen geçerli bir kullanıcı adı giriniz." };

			if (await usernameExists(input)) return { success: false, message: "Bu kullanıcı adı zaten alınmış." };

			await updateUserUseCase(ctx.id, {
				username: input,
				usernameChangedAt: new Date(),
			});

			return { success: true, message: `Kullanıcı adınız başarıyla \"${input}\" olarak değiştirildi.` };
		} catch (error) {
			return { success: false, message: "Bir hata oluştu, lütfen daha sonra tekrar deneyin." };
		}
	});
