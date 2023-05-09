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

interface IRouterMap {
  [props: string]: string
}

type TLocale = 'en-US' | 'zh-CN'

interface IQuestion {
  type: 'question'
  question: string
}

interface IAnswer {
  type: 'answer'
  answer: Answer | string
  score?: number
}

export type {
  TQa,
  IQnA,
  IIoScore,
  IRouterMap,
  TLocale,
  IQuestion,
  IAnswer
}