import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;




// 这段代码的目的是为了实现 Prisma Client 的单例模式，以避免在开发环境中多次实例化 Prisma Client。下面我将详细解析代码的每个部分，并解释相对于直接声明一个 `prisma` 实例的优势。

// ### 代码解析

// ```typescript
// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// };
// ```
// - **`PrismaClient` 导入**：从 `@prisma/client` 包中导入 PrismaClient 类，这是 Prisma 提供的用于与数据库交互的核心类。

// - **`prismaClientSingleton` 函数**：这是一个工厂函数，每次调用都会返回一个新的 PrismaClient 实例。

// ```typescript
// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;
// ```
// - **`globalThis` 声明**：这是对 `globalThis` 对象的扩展声明，特别是为 `globalThis` 添加了一个 `prismaGlobal` 属性。`globalThis` 是一个标准的 JavaScript 对象，代表全局对象，类似于浏览器中的 `window` 或 Node.js 中的 `global`。

// - **`ReturnType` 泛型**：它被用来推断 `prismaClientSingleton` 函数的返回类型，即 `PrismaClient` 实例。

// ```typescript
// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
// ```
// - **`prisma` 实例化**：如果 `globalThis.prismaGlobal` 已经存在，就使用现有的 `PrismaClient` 实例；如果不存在，则调用 `prismaClientSingleton()` 创建一个新的 `PrismaClient` 实例。

// ```typescript
// export default prisma;
// ```
// - **导出 `prisma`**：将 `prisma` 实例导出，供项目的其他模块使用。

// ```typescript
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
// ```
// - **缓存 `prisma` 实例**：如果当前环境不是生产环境，则将 `prisma` 实例存储到 `globalThis.prismaGlobal`，以确保在开发环境中不会重复创建 `PrismaClient` 实例。

// ### 这样的实现相比直接声明一个 `prisma` 实例的好处

// 1. **避免多次实例化 PrismaClient**：
//    - **直接声明 `prisma`**：每次模块被导入时，都会创建一个新的 `PrismaClient` 实例。在开发环境中，由于热重载的频繁发生，这可能导致大量 PrismaClient 实例被创建，最终可能会导致 "PrismaClient has already been instantiated" 错误，或达到数据库连接限制。
//    - **单例模式**：通过这种实现方式，确保了在开发环境中，`PrismaClient` 实例只会被创建一次，无论模块被重新加载多少次。这可以避免上述问题，保证资源的高效使用。

// 2. **更好的开发体验**：
//    - 在开发环境中，每次修改代码并保存后，模块可能会被多次重新加载。如果每次重新加载时都重新创建 PrismaClient 实例，不仅浪费资源，还可能引发连接过多的问题。使用单例模式可以大大减轻这些问题，提升开发体验。

// 3. **在生产环境中行为一致**：
//    - 在生产环境中，这段代码不会缓存 PrismaClient 实例，而是每次都创建新的实例。这在某些情况下是有必要的，比如在需要确保线程安全的多实例部署场景下。

// 总之，这段代码通过实现 PrismaClient 的单例模式，避免了在开发环境中多次实例化的开销，提供了更稳定的数据库连接管理，同时在生产环境中保持了实例化的灵活性。