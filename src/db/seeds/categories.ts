import { Database } from "..";
import { categories, NewCategory } from "../schema/categories";

const mock: NewCategory[] = [
	{ name: "Teknoloji" },
	{ name: "Bilim" },
	{ name: "Sağlık" },
	{ name: "Eğitim" },
	{ name: "Spor" },
	{ name: "Eğlence" },
	{ name: "Seyahat" },
	{ name: "Yemek" },
	{ name: "Moda" },
	{ name: "Finans" },
    { name: "Sanat" },
    { name: "Tarih" },
    { name: "Müzik" },
    { name: "Sinema" },
    { name: "Kitaplar" },
    { name: "Doğa" },
    { name: "Otomotiv" },
    { name: "Oyun" },
    { name: "Hukuk" },
    { name: "Psikoloji" }
];

export async function seed(db: Database) {
	await db.insert(categories).values(mock);
}
