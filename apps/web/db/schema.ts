import { z } from "zod";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { 
    text, 
    pgTable, 
    integer, 
    timestamp 
} from "drizzle-orm/pg-core";


export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
    transactions: many(transactions),
}));

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    transactions: many(transactions),
}));

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    payee: text("payee").notNull(),
    amount: integer("amount").notNull(),
    notes: text("notes"),
    userId: text("user_id").notNull(),
    date: timestamp("date", { mode: "date" }).notNull(),

    accountId: text("account_id").references(() => accounts.id, {
        onDelete: "cascade",
    }).notNull(),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null",
    }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
    accounts: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id],
    }),
    categories: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}))


export const insertAccountSchema = createInsertSchema(accounts);
export const insertCategorySchema = createInsertSchema(categories);
export const insertTransactionSchema = createInsertSchema(transactions, {
    date: z.coerce.date()
});
