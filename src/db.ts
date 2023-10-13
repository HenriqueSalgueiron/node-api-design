import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

//It's being done and exported here so we don't hasve to do it again every time we want to use it
