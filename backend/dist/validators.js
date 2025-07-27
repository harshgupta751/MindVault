"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagZod = exports.createSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Enter valid email!" }),
    name: zod_1.z.string().min(3, { message: "Name must be atleast 3 characters!" }).max(50, { message: "Name must be not exceed 50 characters!" }),
    password: zod_1.z.string().min(6, { message: "Password should be atleast 6 characters!" }).max(8, { message: "Password must not exceed 20 characters!" })
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Enter valid email!" }),
    password: zod_1.z.string().min(1, "Password should not be empty!")
});
exports.createSchema = zod_1.z.object({
    content: zod_1.z.string(),
    type: zod_1.z.string(),
    title: zod_1.z.string(),
    subtitle: zod_1.z.string().optional()
});
exports.TagZod = zod_1.z.object({
    tag: zod_1.z.string(),
});
