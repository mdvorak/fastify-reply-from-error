import type {FastifyPluginAsync, FastifyServerOptions} from "fastify"
import fastifyReplyFrom, {type FastifyReplyFromOptions} from "@fastify/reply-from";

export const app: FastifyPluginAsync<FastifyServerOptions> = async (fastify, {}): Promise<void> => {
    await fastify.register(fastifyReplyFrom, {
        base: "http://localhost:1234",
    } satisfies FastifyReplyFromOptions)

    fastify.get("/", async (request, reply) => {
        return await reply.from('/', {
            onError: async (reply, {error}: { error: Error }) => {
                // This always produces
                // {"statusCode":500,"code":"FST_REPLY_FROM_INTERNAL_SERVER_ERROR","error":"Internal Server Error","message":""}
                fastify.log.error(error)
                reply.status(500).send(error)
            }
        })
    });
}

export default app
