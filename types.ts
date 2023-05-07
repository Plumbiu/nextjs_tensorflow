import type { Answer } from "@tensorflow-models/qna/dist/question_and_answer"
import type { ChangeEvent } from "react"

type TQa = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

interface IQnA {
  q?: string
  p?: string
  answer?: Answer[]
  error: boolean
}

interface IIoScore {
  queries: string[]
  responses: string[]
  scores: Float32Array | Int32Array | Uint8Array
}

export type {
  TQa,
  IQnA,
  IIoScore
}