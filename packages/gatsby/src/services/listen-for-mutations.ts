import { emitter } from "../redux"
import { InvokeCallback, Sender } from "xstate"

export const listenForMutations: InvokeCallback = (callback: Sender<any>) => {
  const emitMutation = (event: unknown): void => {
    callback({ type: `ADD_NODE_MUTATION`, payload: event })
  }

  const emitFileChange = (event: unknown): void => {
    callback({ type: `SOURCE_FILE_CHANGED`, payload: event })
  }

  const emitQueryChange = (event: unknown): void => {
    callback({ type: `QUERY_FILE_CHANGED`, payload: event })
  }

  const emitWebhook = (event: unknown): void => {
    callback({ type: `WEBHOOK_RECEIVED`, payload: event })
  }

  emitter.on(`ENQUEUE_NODE_MUTATION`, emitMutation)
  emitter.on(`WEBHOOK_RECEIVED`, emitWebhook)
  emitter.on(`SOURCE_FILE_CHANGED`, emitFileChange)
  emitter.on(`QUERY_FILE_CHANGED`, emitQueryChange)

  return (): void => {
    emitter.off(`ENQUEUE_NODE_MUTATION`, emitMutation)
    emitter.off(`SOURCE_FILE_CHANGED`, emitFileChange)
    emitter.off(`WEBHOOK_RECEIVED`, emitWebhook)
    emitter.off(`QUERY_FILE_CHANGED`, emitQueryChange)
  }
}
