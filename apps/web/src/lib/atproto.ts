import {
  NodeOAuthClient,
  type OAuthClientMetadataInput,
} from "@atproto/oauth-client-node";
import type { PrismaClient } from "@repo/database";
import { SessionStore, StateStore } from "@/lib/storage";

export function blueskyClientMetadata(): OAuthClientMetadataInput {
  const baseUrl: string = process.env.NEXT_PUBLIC_URL as string;

  return {
    client_name: "Bluesky.bot",
    client_id: `${baseUrl}/client-metadata.json`,
    client_uri: `${baseUrl}`,
    redirect_uris: [`${baseUrl}/oauth/callback`],
    scope: "atproto transition:generic transition:email",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    application_type: "web",
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
  };
}

const createBlueskyClient = async (
  prisma: PrismaClient,
): Promise<NodeOAuthClient> =>
  new NodeOAuthClient({
    clientMetadata: blueskyClientMetadata(),
    stateStore: new StateStore(prisma),
    sessionStore: new SessionStore(prisma),
  });

export default createBlueskyClient;
