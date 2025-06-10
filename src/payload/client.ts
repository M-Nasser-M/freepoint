import configPromise from '@payload-config'
import { getPayload, type InitOptions, type Payload } from 'payload'

// Prevent webpack from bundling this file on the client
import 'server-only'

declare global {
  // We need to use `var` here because we are augmenting the global scope
  // eslint-disable-next-line no-var
  var payload: {
    client: Payload | null
    promise: Promise<Payload> | null
  }
}

let cached = global.payload

if (!cached) {
  cached = global.payload = {
    client: null,
    promise: null,
  }
}

interface Args {
  initOptions?: Partial<InitOptions>
}

export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({
      config: configPromise,
      ...initOptions,
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: unknown) {
    cached.promise = null
    throw e
  }

  return cached.client
}
